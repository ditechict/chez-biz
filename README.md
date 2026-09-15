# chezzie

Build a music streaming application with an integrated reward system. The app’s intention is to attract and retain users by allowing them to earn points through engagement (listening, watching ads, sharing, inviting friends). These points can be used to pay for subscriptions first and later converted into cashunder strict conditions.

🎯 Core Intentions
1. Provide smooth music streaming (start with royalty-free/indie tracks, expand later).
2. Reward users for genuine engagement while preventing abuse.
3. Ensure the reward system is financially sustainable (points come only after listening + ads generate revenue).
4. Use points first to auto-cover subscription fees, then allow users to save toward withdrawals.
5. Support individual, couple, family, and group plans at affordable monthly rates.
6. Create a referral-driven growth system that only rewards real, active invitees.

🏗️ Functional Rules
Points & Currency
* 1,000 points = $1
* Subscription fees:
    * Solo: $2/month (2,000 pts)
    * Couple: $3/month (3,000 pts)
    * Family (5 users): $6/month (6,000 pts)
    * Group (10 users): $10/month (10,000 pts)
* First earned points must cover subscription before cash-out.
Earning Points
* Listening: 1 point per track (≥60s).
* Ads: 20 points per ad watched (server-verified).
* Sharing playlist: 10 points per valid share.
* Referral: 100 points for inviter, only when invitee listens ≥30 minutes/day and watches ≥1 ad/day for 7 consecutive days.
Daily Limits
* Maximum of 50 points/day per user, regardless of activity.
* Ad frequency:
    * First 30 min session → 1 ad required.
    * 30–60 min → 1 ad every 15–20 min.
    * Beyond 60 min → 1 ad every 25–30 min (lighter load).
Withdrawals
* Only after subscription is covered.
* Minimum withdrawal: $10 (10,000 pts).
* Only 1 withdrawal every 30 days.
* Must pass KYC verification (ID, phone, etc.).

🔒 Anti-Abuse Rules
* Play must be ≥60s to count.
* Referral only activates after 7-day engagement rule.
* Device/IP checks to prevent multiple fake accounts.
* Points ledger and fraud-detection logic to freeze suspicious users.

📊 Example User Flow
* Medium User listens to 20 tracks (20 pts), watches 1 ad (20 pts), and shares a playlist (10 pts) daily.
* Total daily = 50 pts (daily cap).
* Monthly = 1,500 pts ($1.50).
* In 3 months = 4,500 pts ($4.50) → enough to cover at least 2 months of solo subscription.
* Viral User does the same as Medium but also refers 5 friends in 3 months. Each successful referral = 100 pts.
* Additional 500 pts → total ~5,000 pts ($5) in 3 months.
This proves medium/heavy/viral users can sustain subscription with activity, while light users stay ad-supported.

🗂️ Example Structure (high-level)
* App Features:
    * Music Player (play, skip, queue, offline cache)
    * Points Dashboard (balance, history, redemption)
    * Subscription System (solo, couple, family, group)
    * Referral & Invite Tracking (status + rules)
    * Ads Integration (rewarded ads for points)
    * Wallet (points auto-apply to subscription, optional withdrawal)
    * Admin Controls (tune point values, manage fraud, control withdrawals)
* Core Entities:
    * User
    * Track
    * Play
    * PointsTransaction
    * Referral
    * Subscription
    * Withdrawal
    * AdView.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://chezzie.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/01b21825-d0d2-402c-8718-5bbc41baecb1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
