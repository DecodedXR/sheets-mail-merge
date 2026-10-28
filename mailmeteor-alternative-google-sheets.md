---
title: "Mailmeteor alternative: Sheets mail merge with follow-ups, no subscription"
description: Mail merge from Google Sheets with follow-ups to non-repliers and scheduled sends for a one-time $12, compared honestly with Mailmeteor's plans.
image: https://decodedxr.github.io/sheets-mail-merge/assets/cover.png
---
{% raw %}

# Mailmeteor alternative: Sheets mail merge with follow-ups, no subscription

[Mailmeteor](https://mailmeteor.com/) is a well-liked Google Sheets and Gmail mail merge add-on. On [its pricing page](https://mailmeteor.com/pricing) (checked October 2026):

- **Free:** 50 emails a day and 500 a month, with scheduled sending included.
- **Starter:** $5.99 a month per user, for 250 emails a day.
- **Premium:** $17.99 a month per user, for 1,000 emails a day. This is the first plan that lists follow-ups.

So the free plan covers scheduling, and follow-ups are what pushes people onto Premium. If you want "send to my sheet, then follow up with whoever didn't reply", a script in your own Google account can do that for a one-time price.

## Side by side

| | Mailmeteor Premium | Mail Merge Pro |
|---|---|---|
| Price | $17.99 a month per user | $12 once |
| Emails per day | 1,000 | Gmail's script limit: about 100 on personal Gmail, 1,500 on Workspace |
| Follow-ups to non-repliers | Yes, up to 5, automatic | One per person, in one click, in the same thread |
| Scheduled sending | Yes | Yes, one scheduled merge at a time |
| Different attachment per person | Check their docs | Yes, from a column of Drive links |
| Open and click tracking | Yes | No |
| How it's installed | Workspace add-on | One script pasted into your Google Sheet |
| Who runs it | Mailmeteor's service | Your own copy of the code, in your own Google account |

## When Mailmeteor is the better buy

- **Automatic follow-up sequences** (several follow-ups on a timer) and **tracking** are its strengths. Mail Merge Pro sends one follow-up per person, when you click.
- **Volume:** a personal Gmail account's script limit is about 100 recipients a day, while Mailmeteor's paid plans allow more.
- **Under 50 emails a day and no follow-ups?** Mailmeteor's free plan, or the free script below, is enough.

## When a one-time script is enough

[Mail Merge Pro](https://decodedpc.gumroad.com/l/tcfsse) is for regular mailings: invitations, outreach, client updates, reminders.

1. Write the email as a Gmail draft with `{{First Name}}`-style placeholders, and send or [schedule](schedule-mail-merge-google-sheets.html) the merge.
2. A few days later, choose **Follow Up With Non-Repliers…**. Pro checks each thread, skips anyone who replied, and [follows up in the same thread](mail-merge-follow-up-emails-google-sheets.html) with everyone else.

## No follow-ups needed?

The free [Sheets Mail Merge](https://github.com/DecodedXR/sheets-mail-merge) does the mail merge part (placeholders, formatting, attachments, a different file per person) at no cost and with no daily cap of its own. Start with the [setup guide](free-mail-merge-google-sheets.html).

---

[Mail Merge Pro ($12, one-time)](https://decodedpc.gumroad.com/l/tcfsse) · [Free script on GitHub](https://github.com/DecodedXR/sheets-mail-merge) · [GMass comparison](gmass-alternative-google-sheets.html) · [YAMM comparison](free-yamm-alternative.html)
{% endraw %}
