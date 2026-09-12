# Real Che.z Bizzie content + dynamic content tables

Replace the placeholder artist identity across the public pages with Che.z Bizzie's real details from his press kit, and move gallery, events, and press assets into the database so they can be edited without code changes.

## Artist facts to use

- Name: CHE.Z BIZZIE (born Johnson Omotola Adeleke, 11 June 1990, Lagos, Nigeria)
- Tagline: "Getting Ready for the World"
- Roles: Nigerian singer, songwriter and businessman; recording since 2004; independent
- Genres: Afrobeats, R&B, Contemporary
- Known songs: Beautiful, Quality, No Stress, Forever
- Short bio and full press-release bio taken from the press kit wording
- Links: Spotify tracks from the press kit, YouTube video, Instagram @che.z_bizzie, website chez-bizzie.co

## Pages

- Landing: name in the nav/footer/logo, real hero headline and tagline, bio-based intro, real streaming links, gallery preview pulled from the database.
- Press: real short bio, full press-release bio, press photos from the database, real Spotify/YouTube links, booking contact.
- Gallery: images loaded from the database instead of the hardcoded list, keeping the asymmetric grid and lightbox.
- Events: loaded from the database; shows the existing "no upcoming events" state until real dates are added (the press kit lists none).

## Images

Press-kit photos are copied into the project's own storage so they load reliably, then referenced by the gallery and press pages. If any image cannot be copied, it is skipped rather than left broken.

## Database

Three new tables, all publicly readable so the site works for visitors, with writes reserved for admins:

- gallery_images: image path, alt text, caption, grid size, sort order, published flag
- events: date, venue, city, country, ticket link, sold-out flag, published flag
- press_assets: title, type (photo, logo, rider, bio), file path, external link, sort order

Seeded with the press-kit photos and track links so the pages render real content immediately.

## Technical notes

- Public storage bucket `artist-media` for press-kit images; page components read rows with the Supabase client via small hooks (`useGalleryImages`, `useEvents`, `usePressAssets`).
- Each table: `GRANT SELECT` to `anon`/`authenticated`, full grants to `service_role`, RLS on, read policy `published = true` (press_assets: read all), write policies gated on an admin role check.
- Admin writes need a `user_roles` table + `has_role()` function; this plan adds them so the write policies are not left open. A management UI is out of scope for now — content is seeded by data insert.
- Update `index.html` title/description/OG tags to the artist's real name and tagline.

## Needs your input

- Booking / press contact email to replace `booking@artist.com`.
