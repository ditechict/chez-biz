# Premium Artist Site: Hero Stories, Live Music, and Reward Pause

## Goal
Turn the public Che.z Bizzie site into a more immersive, agency-grade artist experience using the four supplied performance photos, a three-image hero banner, and music that plays directly on the site. Pause every points-earning path while preserving existing accounts, balances, and historical records.

## What will change

### 1. Three-slide hero banner
- Replace the single hero image with a full-viewport, three-slide banner.
- Keep the current hero portrait as one slide and use two supplied performance images with the strongest wide-screen crops for the other slides.
- Preserve CHE.Z BIZZIE as the dominant first-viewport signal, with restrained captions and one clear listening action.
- Add automatic progression, manual previous/next controls, slide indicators, keyboard and swipe navigation, pause-on-interaction, and reduced-motion behavior.
- Maintain a glimpse of the next section on common mobile and desktop screens.

### 2. Place all four supplied photos
- Store the uploaded originals through the project’s managed asset delivery.
- Use two performance photos in the hero alongside the current image.
- Add all four to the dynamic gallery with accurate performance-focused alt text and captions.
- Use selected images in the press/photo areas where their crop and resolution suit the layout, without duplicating the same image excessively on one page.
- Keep the gallery asymmetric and image-led; the requested hero slider is the only carousel-like treatment.

### 3. Expand “The Music” into an editorial listening section
- Replace the current short copy and outbound Spotify buttons with a substantial, responsive music section.
- Feature the verified catalog currently available from the supplied material: **Beautiful, Quality, Rainfall, Reason, and Live As One — Live**, plus the supplied Spotify artist profile for broader catalog access.
- Give each featured song a concise editorial description grounded in the artist’s verified Afrobeats/R&B positioning and available release metadata, avoiding invented credits, chart claims, or backstory.
- Create a strong hierarchy: featured release, supporting tracks, track context, artwork, and clear playback states.

### 4. Play Spotify inside the website
- Use official Spotify embeds for individual tracks and the artist catalog rather than sending visitors to Spotify links.
- Keep playback inline on both the home music section and the press-kit listening section.
- Preserve Spotify’s required media permissions and provide accessible titles and loading states.
- Account for Spotify’s platform limitation: logged-in Spotify listeners can receive full playback where eligible; logged-out visitors may receive Spotify’s preview experience. The site will not claim to bypass this restriction.

### 5. Rework the existing music app surface
- Replace the mock Synthwave tracks and decorative controls with Che.z Bizzie’s verified embedded catalog.
- Remove the “stream and earn” promise, listening-points messaging, and promotional reward language from the music experience.
- Keep authentication, existing balances, and historical reward records intact.
- Show a clear, understated “Rewards paused” state wherever the fan area previously invited earning.

### 6. Pause all earning safely
- Disable the server-side listening award path so playback cannot create plays, daily-limit increments, or points transactions.
- Disable or remove active earning actions for ads, sharing, and referrals in the fan interface.
- Preserve existing points, subscription records, referrals, withdrawals, and transaction history; this is a suspension, not deletion.
- Ensure no client-only switch can reactivate earning.

### 7. Premium visual refinement
- Unify the public pages around a cinematic live-performance direction: restrained typography, high-contrast imagery, editorial spacing, and minimal chrome.
- Replace the older purple/pink glass treatment in the music area with the public site’s more disciplined artist identity.
- Use semantic design tokens, consistent controls, subtle image transitions, and polished mobile compositions.
- Keep assistant-like marketing copy, stacked cards, excessive gradients, and nested panels out of the design.

## Technical approach
- Reuse the existing Embla carousel foundation for the hero, extending it with autoplay and accessible controls.
- Add a focused Spotify embed/player component shared by Landing and Press.
- Extend dynamic content handling so the new gallery images and verified music entries are data-driven.
- Add a backend-controlled reward suspension guard and make the fan interface reflect that state.
- Do not attempt to award points from Spotify iframe playback; its events are not a trustworthy proof of listening.

## Verification
- Confirm all four new photos render with suitable crops on mobile and desktop.
- Test hero autoplay, buttons, indicators, keyboard navigation, swipe behavior, reduced motion, and no text/image overlap.
- Confirm all five track embeds and the artist catalog load and play inline without outbound navigation.
- Confirm no listening, ad, share, or referral action can award points while paused, and existing balances remain unchanged.
- Check home, press, gallery, and fan pages at mobile and desktop sizes; run lint and the production build.

## Scope boundary
- No new ad system, monetization flow, reward redesign, or Spotify-account workaround will be introduced.
- The existing placeholder booking email remains unchanged until the real address is supplied.
