---
title: A free YAMM alternative for Google Sheets (no add-on, no 20-a-day cap)
description: Yet Another Mail Merge's free plan sends 20 emails a day. This free, open-source Apps Script sends up to Gmail's own limit, with the same Gmail-draft workflow.
image: https://decodedxr.github.io/sheets-mail-merge/assets/cover.png
---
{% raw %}

# A free YAMM alternative for Google Sheets (no add-on, no 20-a-day cap)

[Yet Another Mail Merge](https://yamm.com/) (YAMM) is the best-known mail merge for Gmail and Google Sheets, and its workflow is a good one: write a Gmail draft with `{{placeholders}}`, point it at a sheet, and send. Its free plan, though, is limited to **20 recipients per day**, and the paid plans are a yearly subscription ([Mailmeteor's YAMM pricing summary](https://mailmeteor.com/blog/yamm-pricing), checked October 2026).

If you only need the core job, a personalized email to each row, you can do it for free with one Apps Script file and the same Gmail-draft workflow: [Sheets Mail Merge](https://github.com/DecodedXR/sheets-mail-merge).

## What's the same

- You write the email as a **Gmail draft** with `{{Column Name}}` placeholders in the subject and body
- Formatting, links, **inline images** and **attachments** in the draft carry over
- A **status column** records each send, so running it again never double-sends
- **Send a test** to yourself first

## What's different

| | YAMM free plan | Sheets Mail Merge |
|---|---|---|
| Emails per day | 20 | Gmail's own script limit: about 100 on a personal account, 1,500 on Google Workspace ([Google's quotas](https://developers.google.com/apps-script/guides/services/quotas)) |
| Cost | Free, with paid yearly plans above | Free (MIT license) |
| Install | Workspace add-on with access to your account | One script you paste into your own sheet; nothing third-party gets access |
| Different attachment per person | — | Yes, from an Attachments column of Drive links ([guide](mail-merge-with-attachments-google-sheets.html)) |
| Open and click tracking | Yes | No |
| Scheduled sending | Paid plans | Not in the free script ([Mail Merge Pro](https://decodedpc.gumroad.com/l/tcfsse), $12 one-time) |

Be honest with yourself about the last two rows. If you need open tracking or a polished interface, YAMM's paid plans are a reasonable buy. If you need more than 20 sends a day and nothing else, the free script is enough.

## Switching takes 5 minutes

1. Keep your existing Gmail draft. Placeholders use the same `{{Column Name}}` format.
2. In your sheet, make sure the address column is named **Email**.
3. **Extensions → Apps Script**, paste in [`Code.gs`](https://github.com/DecodedXR/sheets-mail-merge/blob/main/Code.gs), save, and reload the sheet.
4. **📧 Mail Merge → Send Test to Myself**, then **Send Emails**.

The full walkthrough is in the [step-by-step guide](free-mail-merge-google-sheets.html).

## When the daily limit is reached

Gmail limits how many recipients a script can email per day. When the limit is reached, the script stops cleanly and tells you. Run it again the next day: rows already marked as sent are skipped, so it picks up where it left off.

Want it to send at a set time, or follow up with everyone who didn't reply? See [how to schedule a mail merge](schedule-mail-merge-google-sheets.html) and [one-click follow-ups](mail-merge-follow-up-emails-google-sheets.html).

---

[Get the script on GitHub](https://github.com/DecodedXR/sheets-mail-merge) · [Setup guide](free-mail-merge-google-sheets.html) · [More free Google Sheets scripts](https://decodedxr.github.io/free-google-sheets-scripts/)
{% endraw %}
