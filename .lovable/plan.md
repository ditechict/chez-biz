# Curated Video Showcase

## Goal
Add a premium, editorial video experience using a small selection from Che.z Bizzie’s official YouTube channel, without turning the site into a video grid or weakening its gallery-first identity.

## Curated selection
Use three verified, full-length uploads from the official channel:

1. **Quality** — `7l8nqaYYXCM` — lead feature; the strongest cinematic thumbnail and the channel’s most-viewed full-length upload in the current public feed.
2. **Beautiful** — `kmnXCNNwH8Q` — supporting feature connected to an established song already presented in the Spotify section.
3. **Hustling** — `jn7sXXUiN4U` — supporting feature that broadens the visual and musical selection beyond the two established singles.

Shorts and weaker duplicate/lyric uploads will not be embedded in the main presentation. The official channel remains available through a restrained “View channel” action.

## What will change

### Home page: “Visuals” editorial section
- Add a full-width section directly after “The Music” and before Booking.
- Give **Quality** one large 16:9 lead position with its title visible outside the player.
- Place **Beautiful** and **Hustling** beneath it in a balanced two-column layout on desktop and a single-column sequence on mobile.
- Keep copy minimal and let the video imagery lead.

### Press page: concise EPK video selection
- Upgrade the existing video portion of the Listen area so **Quality** and **Beautiful** can be played inline.
- Keep this version compact and press-friendly; avoid duplicating the full home-page presentation.
- Preserve existing Spotify embeds and downloadable press assets.

### Premium player treatment
- Add one reusable YouTube video component with a fixed 16:9 frame, accessible title, fullscreen support, and privacy-enhanced YouTube embeds.
- Initially show each video’s official thumbnail with a clear play control; load the YouTube player only after interaction. This keeps the page fast and avoids loading several heavy players at once.
- Use restrained motion, crisp borders, editorial numbering, and the site’s existing semantic colors and typography.
- Respect reduced-motion settings and keep all controls keyboard accessible.

## Technical details
- Store the curated titles, video IDs, categories, and channel URL in one typed content file.
- Use `youtube-nocookie.com` for playback and official YouTube thumbnails for the pre-play state.
- Do not autoplay videos. Only the selected player starts after a visitor chooses it.
- Reuse the same curated data across Home and Press to avoid mismatched titles or links.
- No new page, carousel, reward behavior, or database structure is required.

## Verification
- Confirm all three videos load and play inline without navigating away.
- Confirm fullscreen, keyboard operation, player titles, and privacy-enhanced URLs.
- Check the Home and Press layouts at desktop and mobile sizes for clean crops, stable 16:9 sizing, and no overlap.
- Confirm initial page loading remains lightweight and the existing Spotify embeds, gallery, booking section, and reward pause remain unchanged.
- Verify the production build and preview diagnostics are clean.
