---
title: How to schedule a mail merge from Google Sheets (send later)
description: Write a personalized mail merge in Gmail and Google Sheets, then have it send at a set date and time, even with the sheet closed. No add-on subscription.
image: https://decodedxr.github.io/sheets-mail-merge/assets/cover.png
---
{% raw %}

# How to schedule a mail merge from Google Sheets (send later)

Gmail's **Schedule send** works for one email at a time. Gmail's own mail merge (on paid Workspace plans) and most free mail merge scripts send immediately. So if you want a personalized email to reach 80 people at 9:00 on Monday morning, you're either up at 9:00 clicking Send or paying for an add-on.

This guide covers both a free way and a one-time-purchase way.

## The free way: prepare everything, send by hand

[Sheets Mail Merge](https://github.com/DecodedXR/sheets-mail-merge) is a free, MIT-licensed script that sends a personalized Gmail to every row of your sheet. It sends when you click, so:

1. Set it up in advance ([5-minute guide](free-mail-merge-google-sheets.html)) and write your email as a Gmail draft.
2. Run **📧 Mail Merge → Send Test to Myself** the day before to check the merge.
3. At send time, open the sheet and choose **📧 Mail Merge → Send Emails**. It takes a few seconds.

This works from a phone browser in a pinch, but someone has to be there.

## The scheduled way: Mail Merge Pro

[Mail Merge Pro](https://decodedpc.gumroad.com/l/tcfsse) is the same script with **Schedule Send** added. It's a one-time $12, not a subscription, and runs in your own Google account.

1. Set up the sheet and Gmail draft as above.
2. Choose **📧 Mail Merge Pro → Schedule Send…**, pick the draft, and enter a time like `2026-11-02 09:00`.
3. Close the sheet. Google's servers send the merge at that time, and you get a summary email afterwards.

Things to know:

- The time is in the script's time zone. Set it once in Apps Script under **Project Settings**.
- Keep the draft in Gmail until it has sent.
- **Cancel Scheduled Send** cancels it. One scheduled merge at a time.
- Gmail's limits still apply: about 100 recipients a day on a personal account and 1,500 on Google Workspace.

Pro can also [follow up automatically with everyone who didn't reply](mail-merge-follow-up-emails-google-sheets.html), in the same email thread.

## FAQ

**Does my computer need to be on?** No. The scheduled send runs on Google's servers.

**Why not just use Gmail's Schedule send?** It schedules one email. You'd have to write and schedule each personalized copy separately.

**Can I schedule a recurring email?** Not with these scripts. For reminders that go out when a date in your sheet comes up, use the free [Sheets Deadline Reminders](https://decodedxr.github.io/sheets-deadline-reminders/automatic-email-reminders-google-sheets.html).

---

[Free script on GitHub](https://github.com/DecodedXR/sheets-mail-merge) · [Mail Merge Pro ($12, one-time)](https://decodedpc.gumroad.com/l/tcfsse) · [More free Google Sheets scripts](https://decodedxr.github.io/free-google-sheets-scripts/)
{% endraw %}
