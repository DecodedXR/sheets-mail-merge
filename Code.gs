/**
 * Mail Merge for Google Sheets — YAMM-style, no add-on install needed.
 *
 * Setup: Sheet needs a header row. One column must be "Email".
 * An "Email Status" column is created automatically to track sends.
 * Compose a Gmail DRAFT with {{Column Name}} placeholders in the
 * subject and/or body (formatting, images, attachments all work).
 * Optional "Attachments" column: Google Drive links (comma-separated) to attach
 * different files to each person's email.
 */

const EMAIL_COL = 'Email';
const STATUS_COL = 'Email Status';
const ATTACH_COL = 'Attachments';

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
  let emailIdx = headers.indexOf(EMAIL_COL);
  if (emailIdx === -1) emailIdx = headers.indexOf('Email Address'); // Google Forms response sheets
  const attachIdx = headers.indexOf(ATTACH_COL);
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
    const status = String(row[statusIdx] || '');
    // Skip blanks and rows already sent; rows marked ERROR are retried.
    if (!email || (status && !status.startsWith('ERROR'))) { skipped++; continue; }
    if (sent >= quota) {
      ui.alert('Daily Gmail quota reached after ' + sent + ' emails. Run again tomorrow — already-sent rows are skipped.');
      break;
    }

    const fill = (s, escape) => s.replace(/{{\s*([^}]+?)\s*}}/g, (_, name) => {
      const i = headers.indexOf(name.trim());
      const v = i === -1 ? '' : String(row[i]);
      return escape ? escapeHtml_(v) : v;
    });

    try {
      GmailApp.sendEmail(testMode ? Session.getActiveUser().getEmail() : email, fill(template.subject), '', {
        htmlBody: fill(template.html, true),
        attachments: template.attachments.concat(attachIdx === -1 ? [] : driveFiles_(row[attachIdx])),
        inlineImages: template.inlineImages,
      });
      if (testMode) {
        ui.alert('Test sent to your own inbox using row ' + (r + 1) + ' (the first unsent row). Check it, then run "Send Emails".');
        return;
      }
      sheet.getRange(r + 1, statusIdx + 1).setValue('Sent ' + new Date().toLocaleString());
      sent++;
    } catch (e) {
      if (testMode) {
        ui.alert('Test send failed: ' + e.message);
        return;
      }
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

/** Re-attach inline images so they render instead of showing as broken.
 *  Gmail tags each inline <img> with its cid and file name (alt); match by name. */
function inlineImageMap_(msg) {
  const imgs = msg.getAttachments({ includeInlineImages: true, includeAttachments: false });
  const map = {};
  for (const m of msg.getBody().matchAll(/<img[^>]*?src="cid:([^"]+)"[^>]*?alt="([^"]*)"[^>]*>/g)) {
    const img = imgs.find(a => a.getName() === m[2]);
    if (img) map[m[1]] = img;
  }
  return map;
}

/** Blobs for every Google Drive file link or ID in a cell. */
function driveFiles_(cell) {
  return driveIds_(cell).map(id => DriveApp.getFileById(id).getBlob());
}

function driveIds_(cell) {
  return String(cell).match(/[-\w]{25,}/g) || [];
}

function escapeHtml_(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
