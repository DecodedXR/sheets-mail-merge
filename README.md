# Free Mail Merge for Google Sheets (YAMM alternative)

![Free Mail Merge for Google Sheets](assets/cover.png)

Send personalized Gmail from a Google Sheet, using a normal Gmail draft as the template. One Apps Script file: no add-on, no subscription, no per-email limits beyond Gmail's own. Your data never leaves your Google account.

- `{{Column Name}}` placeholders in the subject and body
- Formatting, inline images and attachments carry over from the draft
- **Different attachment for each person:** add an **Attachments** column with Google Drive links ([how](https://decodedxr.github.io/sheets-mail-merge/mail-merge-with-attachments-google-sheets.html))
- **Send Test to Myself** before the real send
- An **Email Status** column means re-running never double-sends, and it resumes after Gmail's daily limit

New to mail merge? Read the [step-by-step guide](https://decodedxr.github.io/sheets-mail-merge/free-mail-merge-google-sheets.html).

## One-time setup (5 minutes)

1. Open the Google Sheet with your recipient list.
2. Make sure **row 1 has headers** and one column is named exactly **Email** (a Google Forms response sheet's **Email Address** column works too).
3. **Extensions → Apps Script**, delete the placeholder code, paste in `Code.gs`, save.
4. Reload the Sheet — a **📧 Mail Merge** menu appears.
5. The first run asks for Google permissions. Because it's your own unpublished script, Google shows "Google hasn't verified this app": click **Advanced → Go to (your project name)** → **Allow**. It only needs Sheets and Gmail access.

## Sending a mailing

1. In **Gmail**, compose a draft. Use placeholders matching column headers:
   > Subject: `{{First Name}}, our next meeting`
   >
   > Hi {{First Name}}, ...
   Formatting, images, and attachments all carry over. Leave it as a draft.
2. In the Sheet: **📧 Mail Merge → Send Test to Myself** — sends the first unsent row's version to your own inbox.
3. Looks good? **📧 Mail Merge → Send Emails**.

## Notes

- The **Email Status** column records each send. Rows with any status are skipped, so re-running never double-sends — clear the cell to resend someone.
- Free Gmail allows ~**100 recipients/day** (Google Workspace: 1,500). The script stops at the quota; run it again the next day and it picks up where it left off.
- **Attachments** column (optional): one or more Google Drive links per row, separated by commas. Each file is attached to that row's email only; Google Docs, Sheets and Slides are attached as PDFs. Gmail's 25 MB limit per email applies. Using it adds a Google Drive permission the first time.
- Blank email cells are skipped; bad addresses get `ERROR: ...` in the status column and are retried on the next run (fix the address first).

## More free Sheets tools

- [Sheets Deadline Reminders](https://github.com/DecodedXR/sheets-deadline-reminders): email people automatically before a due date in your sheet.
- [Sheets Doc Merge](https://github.com/DecodedXR/sheets-doc-merge): one PDF per row from a Google Docs template (certificates, invoices, letters).

## Support

Free forever (MIT). If it saved you a YAMM subscription, you can [pay what you want on Gumroad](https://decodedpc.gumroad.com/l/hokvda).

## License

MIT. See `LICENSE`.
