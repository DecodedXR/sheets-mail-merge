---
title: How to mail merge in Google Sheets for free (no add-on)
description: Send personalized Gmail to everyone in a Google Sheet using a Gmail draft as the template. Free, no add-on, no subscription, with a test send and no double-sends.
image: https://decodedxr.github.io/sheets-mail-merge/assets/cover.png
---
{% raw %}

# How to mail merge in Google Sheets for free (no add-on)

A mail merge sends the same email to a list of people, each copy personalized with their own name, company or any other column from your sheet. Google Sheets and Gmail can do this on their own with one short Apps Script file. You don't need an add-on or a subscription.

This guide uses [Sheets Mail Merge](https://github.com/DecodedXR/sheets-mail-merge), a free, MIT-licensed script. Setup takes about 5 minutes.

## What you need

- A Google account (personal Gmail or Google Workspace)
- A Google Sheet with one row per recipient
- The email you want to send, written as a Gmail draft

## Step 1: Set up your sheet

Put headers in **row 1**. One column must be named exactly **Email**. Add any other columns you want to use in the message, for example:

| First Name | Email | Company |
|---|---|---|
| Ana | ana@example.com | Northwind |
| Ben | ben@example.com | Contoso |

The script adds an **Email Status** column the first time it runs, and records each send there.

## Step 2: Add the script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete the placeholder code.
3. Paste in the contents of [`Code.gs`](https://github.com/DecodedXR/sheets-mail-merge/blob/main/Code.gs) and click **Save**.
4. Go back to the sheet and reload it. A **📧 Mail Merge** menu appears.

The first time you use the menu, Google asks for permission. Because it's your own unpublished script, Google shows "Google hasn't verified this app". Click **Advanced → Go to (your project name) → Allow**. The script only reads your sheet and sends from your Gmail. Nothing goes to any outside server.

## Step 3: Write the email as a Gmail draft

In Gmail, compose a new message and leave it in **Drafts**. Use `{{Column Name}}` wherever you want a value from the sheet:

> **Subject:** `{{First Name}}, quick question about {{Company}}`
>
> Hi {{First Name}},
>
> ...

Formatting, links, inline images and attachments in the draft all carry over to every email. Placeholders must match the column headers exactly, though spaces inside the braces are ignored.

## Step 4: Send a test to yourself

In the sheet, choose **📧 Mail Merge → Send Test to Myself** and type the draft's subject line when asked. The script fills in the first unsent row and sends that version to your own inbox only. Check the names, the formatting and the images.

## Step 5: Send the mail merge

Choose **📧 Mail Merge → Send Emails** and pick the same draft. Each row gets its own personalized email, and the **Email Status** column records the time it was sent.

## Running it again is safe

- **No double sends:** any row with a status is skipped. To resend to someone, clear their status cell.
- **Errors are retried:** a row marked `ERROR: ...` (for example, a mistyped address) is retried on the next run, so fix the address and run it again.
- **Daily limits:** Gmail caps how many recipients a script can email per day: about 100 for personal accounts and 1,500 for Google Workspace (see [Google's Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas)). The script stops cleanly at the limit. Run it again the next day and it picks up where it left off.

## FAQ

**Is it really free?** Yes. The script is MIT licensed and runs on your own Google account. The only limit is Gmail's daily quota.

**How is it different from YAMM?** Same Gmail-draft workflow, without YAMM's 20-a-day free limit. See [the comparison](free-yamm-alternative.html).

**Do I need to install an add-on?** No. It's one script file inside your own sheet, so no third-party add-on gets access to your data.

**Can I mail merge with attachments?** Yes. Attach files to the Gmail draft, and every email includes them. To send a **different file to each person**, add an Attachments column with Google Drive links: see [mail merge with personalized attachments](mail-merge-with-attachments-google-sheets.html).

**Do images in the email work?** Yes. Images pasted into the draft body are re-attached inline so they display instead of showing as broken.

**Can I send each person their own pre-filled Google Form?** Yes. Build a link per row with [Form Prefill Links](https://decodedxr.github.io/form-prefill-links/prefill-google-form-from-spreadsheet.html), then put `{{Prefilled Link}}` in the draft.

**Can I personalize the subject line?** Yes. Placeholders work in both the subject and the body.

**What happens if a cell is empty?** The placeholder is replaced with nothing. Rows with an empty **Email** cell are skipped.

**Does it work with Google Workspace accounts?** Yes, and the daily limit is higher there.

Want it to send at a set time, or follow up with everyone who didn't reply? See [how to schedule a mail merge](schedule-mail-merge-google-sheets.html) and [automatic follow-ups](mail-merge-follow-up-emails-google-sheets.html).

---

[Get the script on GitHub](https://github.com/DecodedXR/sheets-mail-merge) · If it saves you time, you can [pay what you want on Gumroad](https://decodedpc.gumroad.com/l/hokvda). · Also free: [automatic deadline reminders from Google Sheets](https://decodedxr.github.io/sheets-deadline-reminders/automatic-email-reminders-google-sheets.html)
{% endraw %}
