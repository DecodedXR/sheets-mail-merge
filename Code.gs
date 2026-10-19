/**
 * Mail Merge for Google Sheets — YAMM-style, no add-on install needed.
 *
 * Setup: Sheet needs a header row. One column must be "Email".
 * An "Email Status" column is created automatically to track sends.
 * Compose a Gmail DRAFT with {{Column Name}} placeholders in the
 * subject and/or body (formatting, images, attachments all work).
 */

const EMAIL_COL = 'Email';
const STATUS_COL = 'Email Status';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📧 Mail Merge')
    .addItem('Send Emails', 'sendEmails')
    .addItem('Send Test to Myself', 'sendTest')
    .addToUi();
}

function sendTest() {
  sendEmails(true);
}

function sendEmails(testMode) {
  const ui = SpreadsheetApp.getUi();
  const draft = pickDraft_(ui);
  if (!draft) return;

  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getDisplayValues();
  const headers = data[0];
  const emailIdx = headers.indexOf(EMAIL_COL);
  if (emailIdx === -1) {
    ui.alert('No "' + EMAIL_COL + '" column found in row 1.');
    return;
  }

  let statusIdx = headers.indexOf(STATUS_COL);
  if (statusIdx === -1) {
    statusIdx = headers.length;
    sheet.getRange(1, statusIdx + 1).setValue(STATUS_COL);
  }

  const msg = draft.getMessage();
  const template = {
    subject: msg.getSubject(),
    html: msg.getBody(),
    attachments: msg.getAttachments({ includeInlineImages: false }),
    inlineImages: inlineImageMap_(msg),
  };

  const quota = MailApp.getRemainingDailyQuota();
  let sent = 0, skipped = 0;

  for (let r = 1; r < data.length; r++) {
    const row = data[r];
    const email = (row[emailIdx] || '').trim();
    const status = row[statusIdx];
    if (!email || status) { skipped++; continue; }
    if (sent >= quota) {
      ui.alert('Daily Gmail quota reached after ' + sent + ' emails. Run again tomorrow — already-sent rows are skipped.');
      break;
    }

    const fill = s => s.replace(/{{\s*([^}]+?)\s*}}/g, (_, name) => {
      const i = headers.indexOf(name.trim());
      return i === -1 ? '' : row[i];
    });

    try {
      GmailApp.sendEmail(testMode ? Session.getActiveUser().getEmail() : email, fill(template.subject), '', {
        htmlBody: fill(template.html),
        attachments: template.attachments,
        inlineImages: template.inlineImages,
      });
      if (testMode) {
        ui.alert('Test sent to your own inbox (using row 2 data). Check it, then run "Send Emails".');
        return;
      }
      sheet.getRange(r + 1, statusIdx + 1).setValue('Sent ' + new Date().toLocaleString());
      sent++;
    } catch (e) {
      sheet.getRange(r + 1, statusIdx + 1).setValue('ERROR: ' + e.message);
    }
  }

  if (!testMode) ui.alert('Done. Sent: ' + sent + ', skipped (blank/already sent): ' + skipped);
}

/** Let the user pick which Gmail draft is the template, by subject line. */
function pickDraft_(ui) {
  const drafts = GmailApp.getDrafts();
  if (!drafts.length) {
    ui.alert('No Gmail drafts found. Compose your template as a draft in Gmail first.');
    return null;
  }
  const resp = ui.prompt('Mail Merge',
    'Type the subject line of the Gmail draft to use as the template:\n\n' +
    drafts.slice(0, 15).map(d => '• ' + d.getMessage().getSubject()).join('\n'),
    ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return null;
  const wanted = resp.getResponseText().trim().toLowerCase();
  const match = drafts.find(d => d.getMessage().getSubject().trim().toLowerCase() === wanted);
  if (!match) ui.alert('No draft with that subject found.');
  return match;
}

/** Re-attach inline images so they render instead of showing as broken. */
function inlineImageMap_(msg) {
  const map = {};
  msg.getAttachments({ includeInlineImages: true, includeAttachments: false })
    .forEach((img, i) => {
      const cid = (msg.getBody().match(/img[^>]*src="cid:([^"]+)"/gi) || [])[i];
      const m = cid && cid.match(/cid:([^"]+)/);
      if (m) map[m[1]] = img;
    });
  return map;
}
