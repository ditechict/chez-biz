export interface FeaturedTrack {
  title: string;
  spotifyId: string;
  description: string;
  artwork: string;
}

export const featuredTracks: FeaturedTrack[] = [
  {
    title: "Beautiful",
    spotifyId: "1eKFDBN0VhvsjU5IvvNyhS",
    description: "A warm, melody-led introduction to Che.z Bizzie’s unhurried Afrobeats and R&B sound.",
    artwork: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02988ae2bb761473db49fe3d8a",
  },
  {
    title: "Quality",
    spotifyId: "23cHuEjfbVacf0HUHpngVV",
    description: "Patient grooves and a direct vocal performance built for late-night listening.",
    artwork: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02f3df315b2b555e8b7e412952",
  },
  {
    title: "Rainfall",
    spotifyId: "21o4vQRSXASCF1cy9sMEWO",
    description: "A smooth contemporary cut that keeps rhythm, melody and atmosphere in close balance.",
    artwork: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0233bbc3b8f2a418a01e7eebca",
  },
  {
    title: "Reason",
    spotifyId: "4ReITFKU3rcGvWrLpy57GP",
    description: "Che.z Bizzie’s vocal character sits forward over a measured, modern production.",
    artwork: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02606299519c343bfece9fc22d",
  },
  {
    title: "Live As One — Live",
    spotifyId: "1Bn3wMHVnasoVNdgAWNfaT",
    description: "A live recording that places the performance energy and the room at the centre.",
    artwork: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a30d179e2da64c8cfbb71526",
  },
];

export const spotifyArtistId = "0ojLRbHwjVYLGxAPjBMJnY";