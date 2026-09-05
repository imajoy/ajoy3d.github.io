/**
 * PROJECTS DATA
 * ─────────────────────────────────────────────────────────────────────
 * This is the only file you need to touch to update your showreel.
 * Each entry below is one project card. Duplicate an entry, edit the
 * fields, and it will appear on the site automatically — no HTML/CSS
 * knowledge required.
 *
 * FIELDS
 *   id          — any short unique string, e.g. "proj-07"
 *   title       — project name shown on the card
 *   category    — must exactly match one of:
 *                 "Realistic Animation" | "Cartoon Animation" | "Rigging" |
 *                 "Rhymes Animation" | "Product Animation" | "Others"
 *   frameRange  — optional, shown as a small timecode-style label,
 *                 e.g. "0001–0180". Leave as "" to hide it.
 *   thumbClass  — which built-in gradient swatch to use for the card
 *                 while you don't have a poster frame yet:
 *                 "thumb--realistic" | "thumb--cartoon" | "thumb--rigging" |
 *                 "thumb--rhymes" | "thumb--product" | "thumb--others"
 *   posterImage — optional path to a real poster/thumbnail image,
 *                 e.g. "assets/img/work/my-shot.jpg". When set, this
 *                 replaces the gradient swatch.
 *   video       — where the playblast lives:
 *       { type: "youtube", id: "VIDEO_ID" }              // youtube.com/watch?v=VIDEO_ID
 *       { type: "vimeo",   id: "VIDEO_ID" }               // vimeo.com/VIDEO_ID
 *       { type: "local",   src: "assets/video/shot.mp4" } // self-hosted file
 *       { type: "placeholder" }                            // no video yet
 *
 * Delete these six sample entries once you start adding real work —
 * they exist so the layout and filters have something to show.
 */

const PROJECTS = [
  {
    id: "sample-01",
    title: "Character Walk Cycle — Study",
    category: "Realistic Animation",
    frameRange: "0001–0180",
    thumbClass: "thumb--realistic",
    posterImage: "",
    video: { type: "placeholder" },
  },
  {
    id: "sample-02",
    title: "Forest Critter — Bounce & Squash",
    category: "Cartoon Animation",
    frameRange: "0001–0096",
    thumbClass: "thumb--cartoon",
    posterImage: "",
    video: { type: "placeholder" },
  },
  {
    id: "sample-03",
    title: "Biped Control Rig — Breakdown",
    category: "Rigging",
    frameRange: "",
    thumbClass: "thumb--rigging",
    posterImage: "",
    video: { type: "placeholder" },
  },
  {
    id: "sample-04",
    title: "Nursery Rhyme Short — Scene 02",
    category: "Rhymes Animation",
    frameRange: "0001–0450",
    thumbClass: "thumb--rhymes",
    posterImage: "",
    video: { type: "placeholder" },
  },
  {
    id: "sample-05",
    title: "Product Turntable — Sneaker",
    category: "Product Animation",
    frameRange: "0001–0120",
    thumbClass: "thumb--product",
    posterImage: "",
    video: { type: "placeholder" },
  },
  {
    id: "sample-06",
    title: "Mocap Cleanup Pass",
    category: "Others",
    frameRange: "0001–0300",
    thumbClass: "thumb--others",
    posterImage: "",
    video: { type: "placeholder" },
  },
];
