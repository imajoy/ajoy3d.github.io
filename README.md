# Ajoy Pal — 3D Animation Portfolio

A self-contained, dependency-free portfolio site: plain HTML, CSS, and JS —
no build step, no framework, no npm install. Built to host on GitHub Pages.

## What's here

```
index.html                 the whole page
assets/css/styles.css      all styling
assets/js/projects.js      ← the file you edit to add/update playblasts
assets/js/main.js          site behaviour (filtering, modal, nav, menu)
assets/img/banner.jpg      your cover image
assets/img/profile.jpg     your profile photo
```

## 1. Put this on GitHub Pages

1. Create a new repository on GitHub named exactly `<your-username>.github.io`
   (e.g. `ajoypal1.github.io`) — this naming makes GitHub serve it at the
   root of that URL automatically. If you'd rather use a project repo with
   any other name, that also works, just at `<username>.github.io/<repo>/`.
2. Push these files to the repository's default branch (`main`):
   ```
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, and under "Build and deployment"
   set **Source** to "Deploy from a branch," branch `main`, folder `/root`.
4. Save. GitHub gives you a live URL in a minute or two.

## 2. Add your real playblasts

Open `assets/js/projects.js`. Each project is one entry in the `PROJECTS`
array — the comments at the top of that file explain every field. To add a
new one, copy an existing entry and edit it:

```js
{
  id: "walk-cycle-01",
  title: "Warrior Walk Cycle",
  category: "Realistic Animation",   // must match a filter tab exactly
  frameRange: "0001–0240",           // optional, shown as a small label
  thumbClass: "thumb--realistic",    // used until you add a posterImage
  posterImage: "",                   // e.g. "assets/img/work/walk.jpg"
  video: { type: "youtube", id: "dQw4w9WgXcQ" },
}
```

Supported `video` types:
- `{ type: "youtube", id: "VIDEO_ID" }` — the part after `v=` in the YouTube URL
- `{ type: "vimeo", id: "VIDEO_ID" }` — the number in the Vimeo URL
- `{ type: "local", src: "assets/video/shot.mp4" }` — a file you host in the repo
- `{ type: "placeholder" }` — shows a "no video yet" note (what the six sample entries use now)

Delete the six sample entries (`sample-01` … `sample-06`) once you've added
real ones — they only exist to show the layout with something in it.

**A note on file size if you go the `local` route:** GitHub has a 100MB
per-file limit and Pages sites are generally expected to stay under ~1GB
total. Playblasts compress well as H.264 MP4s, but for anything longer than
a few seconds, YouTube (unlisted, if you don't want it publicly listed) or
Vimeo will load faster and cost you nothing in repo size.

## 3. Swap in real poster thumbnails (optional)

Right now each category has a plain gradient placeholder card. Drop a JPG or
PNG per project into `assets/img/work/` and set that project's `posterImage`
field to its path — it'll replace the gradient automatically. A 16:9 frame
grabbed straight from the playblast works well.

## 4. Things worth double-checking

- **Name**: I read "Ajoy Pal" from your ArtStation/LinkedIn handles
  (`ajoypal1` / `palajoy`). If that's not right, it's set in one place —
  search for `Ajoy Pal` in `index.html` and swap it.
- **Links**: LinkedIn and ArtStation URLs are wired in from what you gave me.
- **Contact**: There's no email on the site — contact currently routes
  through LinkedIn and ArtStation. Add a `mailto:` link in the `#contact`
  section of `index.html` if you'd like one.

## 5. Preview locally before pushing

Any static file server works, e.g. with Python installed:

```
python3 -m http.server 8000
```

then open `http://localhost:8000` in a browser.

## Design notes

The palette is pulled from your banner artwork rather than a generic
dark-theme default: graphite background, a bronze accent (echoing the
sunset/keyframe diamond color), and a cool teal secondary (echoing the
viewport gizmo blue). Category tags are styled after software workspace
tabs, and the small numeric labels on each card borrow the frame-range
convention from animation timelines — details meant to feel like they
belong to this profession rather than a generic template.
