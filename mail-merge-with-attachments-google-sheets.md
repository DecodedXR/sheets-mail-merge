---
title: Mail merge with a different attachment for each person (Google Sheets, free)
description: Send personalized Gmail from Google Sheets where every recipient gets their own file, such as an invoice, certificate or report. Free Apps Script, no add-on.
image: https://decodedxr.github.io/sheets-mail-merge/assets/cover.png
---
{% raw %}

# Mail merge with a different attachment for each person (Google Sheets, free)

Gmail's built-in mail merge personalizes the text but sends the **same** attachment to everyone. If each person needs their own file (an invoice, a certificate, a contract, a report card), you need a merge that reads the attachment from the sheet. This guide does that for free with one Apps Script file and no add-on.

It uses [Sheets Mail Merge](https://github.com/DecodedXR/sheets-mail-merge), a free, MIT-licensed script. If you haven't set it up yet, follow the [5-minute setup guide](free-mail-merge-google-sheets.html) first, then come back here.

## Step 1: Put each person's file in Google Drive

Upload the files to Google Drive, one (or more) per recipient. They can stay private: the script runs as you, so it can attach any file you can open. Recipients get a real attachment, not a link, so they don't need Drive access.

Google Docs, Sheets and Slides files work too. They're attached as PDFs.

## Step 2: Add an Attachments column

In your sheet, add a column named exactly **Attachments**. In each row, paste the Drive link to that person's file (**Share → Copy link**, or the address bar of the open file):

| First Name | Email | Attachments |
|---|---|---|
| Ana | ana@example.com | https://drive.google.com/file/d/1AbC…/view |
| Ben | ben@example.com | https://drive.google.com/file/d/1XyZ…/view, https://docs.google.com/document/d/1QrS…/edit |

To send more than one file to a person, separate the links with commas. Leave the cell empty to send no extra file to that row.

## Step 3: Write the email and send a test

Write the email as a Gmail draft with `{{First Name}}`-style placeholders, as in the setup guide. Anything attached to the draft itself still goes to everyone, in addition to each row's own files.

Choose **📧 Mail Merge → Send Test to Myself**. The test email includes the first unsent row's attachments, so you can check the right file arrives. The first time, Google asks for an extra permission to read your Drive files.

## Step 4: Send

Choose **📧 Mail Merge → Send Emails**. Each row's **Email Status** cell records the send. If a file can't be opened (a wrong link, or a file you don't have access to), that row is marked `ERROR: ...` and the rest still go out. Fix the link and run it again, and only the failed rows are retried.

## Limits

- Gmail allows up to **25 MB** of attachments per email.
- Scripts can email about **100 recipients a day** on a personal Gmail account and 1,500 on Google Workspace. The script stops at the limit, and the next run picks up where it left off.

## Need the files generated too?

If each person's file is something like a certificate or invoice that you'd otherwise make by hand, [Sheets Doc Merge](https://decodedxr.github.io/sheets-doc-merge/generate-pdfs-certificates-from-google-sheets.html) builds one PDF per row from a Google Docs template and can email each one, all in one step.

Want it to send at a set time, or follow up with everyone who didn't reply? See [how to schedule a mail merge](schedule-mail-merge-google-sheets.html) and [automatic follow-ups](mail-merge-follow-up-emails-google-sheets.html).

---

[Get the script on GitHub](https://github.com/DecodedXR/sheets-mail-merge) · [Setup guide](free-mail-merge-google-sheets.html) · If it saves you time, you can [pay what you want on Gumroad](https://decodedpc.gumroad.com/l/hokvda).
{% endraw %}
