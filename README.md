# PREM — our world 🐼

An interactive proposal + birthday website for **Preeti**.

A panda world that travels from sunrise to starlight: layered mountains
drifting with parallax, bamboo along the edges, falling bamboo leaves and
blossom petals — and pandas everywhere, drawn and real.

## 🌅 The journey from dawn to night

The sky is tied to how far she has scrolled. It starts at **sunrise** on
the gate, brightens into **daytime** through your story, turns to a purple
and orange **sunset** around the pandas, and by the time she reaches your
letter it is **night** — stars out, a moon risen over the hills, fireflies
in the grass and the occasional shooting star.

The whole page follows: text, cards and the hills all shift to their
night colours, while your letter stays cream on purpose, so it glows like
paper under the stars.

Pure HTML, CSS and JavaScript. No build step, no npm install, no framework.
Just open `index.html` — or push it to GitHub and it's live.

---

## 🔒 How the opening works

The site is sealed until her birthday. She sees this, in order:

1. **The gate.** A misty valley at dawn, framed by borders that draw
   themselves, with a light tracing a heart, a **panda fast asleep**
   (breathing, with little z's floating up), and a live countdown to
   **18 August**. Nothing else is reachable. It says *"Not yet, my love."*
2. **Zero.** The instant the countdown ends, the heart flares, confetti
   falls, **the panda wakes up and stretches**, and the message changes
   to *"The gate is open."*
3. **The password.** The panel swaps to *"What is the name of our world?"*
   She types **PREM** (or **PREETI** — both work).
4. **The gate opens.** The border blazes gold, a seam of light splits
   the screen, and the two doors slide apart to reveal the site.

### ⚠️ Testing it before the 18th

You obviously can't wait until her birthday to check your own work. Two ways in:

- **Add `?skip` to the URL** — e.g. `http://localhost:8000/?skip` or
  `https://you.github.io/repo/?skip`. Goes straight to the site.
- **Set `previewMode: true`** in `js/content.js` — same thing, permanently.

> **Set `previewMode` back to `false` before you send her the link**, or
> she'll skip the whole opening. The `?skip` URL keeps working either way,
> so use that one while you're building.

To rehearse the countdown-hits-zero moment, temporarily change `birthday`
in `content.js` to a minute from now, e.g. `"2026-08-15T21:30"`.

---

## ✏️ How to personalise it

**You only ever need to edit one file: [`js/content.js`](js/content.js).**

Every word on the site lives there. Open it in Notepad, VS Code, or even
directly on GitHub, change the text between the quote marks, and save.

| What you want to change | Where in `content.js` |
|---|---|
| Her name / the world name | `her`, `world` |
| Birthday date **and the moment the gate opens** | `birthday` |
| Skip the countdown while testing | `previewMode` |
| The "not yet" gate screen | `gate` |
| The unlock password | `lock.passwords` |
| What the pandas say when tapped | `panda` |
| The chapter notes ("the series") | `chapters` |
| Gallery photos + captions | `gallery.photos` |
| The "reasons" flip cards | `reasons.items` |
| Number of candles on the cake | `birthdaySection.candles` |
| The proposal question + cheeky "no" lines | `proposal` |
| The final letter and your name | `finale` |

### Adding your photos

1. Put your images in the **`photos/`** folder.
2. Reference them in `content.js`, e.g. `photo: "photos/01.jpg"`.

Filenames the site already expects (rename yours to match and you're done):

- **Chapters:** `01.jpg` … `06.jpg` (portrait / tall photos look best)
- **Gallery:** `g1.jpg` … `g8.jpg` (square photos look best)

> If a photo is missing, nothing breaks — you just get a soft placeholder
> that tells you which filename to add. So you can ship it half-finished
> and add photos later.

### Adding music

Drop an mp3 at **`assets/music/our-song.mp3`**.
The music button appears automatically once the file exists, and hides
itself if it doesn't. It starts when she unlocks the site (fading in
gently), and she can mute it any time from the bottom-left button.

---

## 💍 What's inside

| Section | What it does |
|---|---|
| **The gate** | Countdown → password → doors open. See above. |
| **Hero** | The word PREM assembles letter by letter, her name glows in script, hearts and pandas drift upward. |
| **Countdown** | Once she's inside, this section shows the birthday message on the day itself, with confetti — and counts to next year after that. |
| **The series** | Your notes, chapter by chapter, alternating photo/text, revealing as she scrolls. |
| **Moments** | A polaroid wall. Tap any photo for a full-screen lightbox (arrow keys work too). |
| **Pandas** | Eight **real panda photographs** with captions about her. Tap for the lightbox. |
| **Reasons** | Flip cards — she taps each one to reveal why. Each flip pops little hearts. |
| **Birthday** | A CSS cake with real flickering candles. She taps each flame to blow it out; the last one triggers confetti and your birthday message. |
| **The question** | The proposal. The "Let me think…" button runs away from her cursor (and her finger), getting shyer each time, while YES grows. YES takes over the screen. |
| **The letter** | Your closing letter on paper, sealed with a P. |

Running throughout: the dawn sky and mountains sit behind everything, so
she's inside one continuous landscape the whole way down. Bamboo sways at
the edges, clouds and birds drift past, leaves and petals fall, a heart
cursor trails hearts (and the occasional panda), plus a scroll progress
bar and side navigation dots.

**🐼 The pandas.** Five of them:

| Where | What it does |
|---|---|
| The gate | Sleeps — belly rising and falling, z's floating up — then **wakes and stretches** the moment the countdown ends. |
| The hero | Sits on the hillside watching. Tap it. |
| The story | Peeks over the top edge of the section, then ducks back down. |
| The cake | Wears a party hat. Tap it. |
| The proposal | Turns up to celebrate when she says yes. |

Plus one that **rolls across the bottom of the screen** every minute or
so, and little ones drifting among the hearts.

### The real ones 📷

`photos/pandas/` holds **eight real panda photographs** — walking,
belly-flopped asleep, lounging with bamboo, rolling in the grass, grinning
— that drive the *"Pandas that remind me of you"* section. Each one has a
caption you can edit in `content.js` → `pandaGallery`.

They all came from **Wikimedia Commons under free licences** (public
domain, CC0, CC BY, CC BY-SA), which is what makes them safe to put on a
public site. Those licences require credit, so
**`photos/pandas/ATTRIBUTION.md` must stay in the repo** — it lists the
photographer, licence and source URL for every photo. To swap one out,
drop your own image in as `p3.jpg` (etc.) and remove that line from the
attribution file.

### One more thing

**Tapping anywhere on the page releases a heart balloon** that floats up
and away. Buttons, cards and candles still do their own jobs.

All five are drawn in SVG right inside `index.html` — no image files, so
nothing to load and nothing to break. The tappable ones jump, pop hearts,
and say something; edit their lines in `content.js` → `panda`.

It's fully responsive, works on phones, and respects
`prefers-reduced-motion` for anyone who gets motion sick.

---

## 🚀 Hosting it on GitHub Pages

1. Create a new repository on GitHub (public is fine — or private if you
   have GitHub Pro and want it hidden).
2. Upload everything in this folder (or push it — see below).
3. Go to **Settings → Pages**.
4. Under *Source*, pick **Deploy from a branch**, branch `main`, folder `/ (root)`.
5. Save. In about a minute it's live at:
   `https://<your-username>.github.io/<repo-name>/`

### Pushing from your computer

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "PREM - our world"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
```

```bash
git push -u origin main
```

> ⚠️ **Note:** a GitHub Pages site is public — anyone with the link can
> open it. The password screen is a romantic gesture, not real security.
> If you want it genuinely private, use a private repo with a
> [Netlify](https://netlify.com) or [Vercel](https://vercel.com) deploy
> and turn on password protection there, or just send her the file.

---

## 👀 Previewing it locally

Just double-click `index.html`.

One caveat: some browsers block the music file over `file://`. If you want
a perfect local preview, run a tiny server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

---

Made with far too much love.
