---
title: How to send follow-up emails to people who didn't reply (Google Sheets mail merge)
description: After a Gmail mail merge from Google Sheets, follow up only with the people who haven't replied, in the same email thread. A free manual method and a one-click method.
image: https://decodedxr.github.io/sheets-mail-merge/assets/cover.png
---
{% raw %}

# How to send follow-up emails to people who didn't reply (Google Sheets mail merge)

Most replies to cold emails, invitations and requests come after the follow-up, not the first email. But following up by hand means checking every thread to see who answered, then writing to the rest without bothering the people who did.

## The free way: mark replies, then merge again

With the free [Sheets Mail Merge](https://github.com/DecodedXR/sheets-mail-merge) ([setup guide](free-mail-merge-google-sheets.html)):

1. Add a **Replied** column to your sheet. Go through your inbox and put `yes` next to everyone who answered.
2. Make a copy of the tab and delete the `yes` rows (or use **Data → Create a filter** and copy the visible rows to a new tab).
3. Clear the **Email Status** column on the new tab, write the follow-up as a new Gmail draft, and run **📧 Mail Merge → Send Emails** there.

It works, with two downsides: checking replies is manual, and the follow-up arrives as a new email rather than under your original one, so the recipient doesn't see the context.

## The one-click way: Mail Merge Pro

[Mail Merge Pro](https://decodedpc.gumroad.com/l/tcfsse) ($12 one-time, runs in your own Google account) records each email's thread when it sends, so it can do this for you:

1. Send your merge with Pro (or schedule it).
2. Write the follow-up as a Gmail draft, for example: `Hi {{First Name}}, just bumping this in case it got buried.`
3. Choose **📧 Mail Merge Pro → Follow Up With Non-Repliers…** and type the follow-up draft's subject.

Pro checks every thread. Anyone who replied is marked **Replied** and skipped. Everyone else gets the follow-up **as a reply in the same thread**, under your original email, with your placeholders filled in. Each person gets at most one follow-up.

**Check Replies** marks who has replied without sending anything, which is handy for tracking responses in the sheet.

Things to know:

- Replies from you or your own Gmail aliases don't count as replies.
- Follow-ups are sent as formatted text; attachments in the follow-up draft aren't included.
- Setup has one extra step: in the Apps Script editor, **Services (+) → Gmail API → Add**.

---

[Free script on GitHub](https://github.com/DecodedXR/sheets-mail-merge) · [Mail Merge Pro ($12, one-time)](https://decodedpc.gumroad.com/l/tcfsse) · [Schedule a mail merge](schedule-mail-merge-google-sheets.html)
{% endraw %}
