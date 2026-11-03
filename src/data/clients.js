// ---------------------------------------------------------------
// CLIENTS & THUMBNAILS
// Edit this file to add clients and their thumbnails.
//
// For each thumbnail:
//   title     - label shown on the card
//   image     - path to the image inside /public/thumbnails/
//               (e.g. "/thumbnails/my-reel.jpg"), or a full https:// URL
//   reelUrl   - the Instagram Reel link for that thumbnail
//
// NOTE: login here is a simple client-side check, suitable for a
// lightweight delivery page. Don't put sensitive data behind it.
// ---------------------------------------------------------------

export const clients = [
  {
    username: "demo",
    password: "demo123",
    name: "Demo Client",
    thumbnails: [
      {
        id: "t1",
        title: "Reel 01 - Morning Routine",
        image: "/thumbnails/tanjore tiffin room.png",
        reelUrl: "https://www.instagram.com/reel/DKPEEJexgwC/?cplk=MWplbm9ham10MWp2MA==",
      },
      {
        id: "t2",
        title: "Reel 02 - Travel Vlog",
        image: "/thumbnails/thumb-2.jpg",
        reelUrl: "https://www.instagram.com/reel/REPLACE_WITH_REEL_ID_2/",
      },
      {
        id: "t3",
        title: "Reel 03 - Product Launch",
        image: "/thumbnails/thumb-3.jpg",
        reelUrl: "https://www.instagram.com/reel/REPLACE_WITH_REEL_ID_3/",
      },
    ],
  },
];
