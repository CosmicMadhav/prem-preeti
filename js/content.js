/* ============================================================
   PREM — our world
   ------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Everything on the website — every word, every photo, every
   date — comes from this file. Change the text between the
   quote marks, save, refresh. That's it.

   Photos: drop your images into the /photos folder and use the
   filename here, e.g. "photos/01.jpg". If a photo is missing,
   the site still looks beautiful — it shows a soft placeholder.
   ============================================================ */

const CONTENT = {

  /* ---------- THE BASICS ---------- */
  her: {
    name: "PREETI",
    // Used in soft, sentence-case places
    softName: "Preeti",
  },

  world: {
    name: "PREM",
    tagline: "our world",
  },

  // Her birthday — and the moment the gate opens.
  // Format: YYYY-MM-DDTHH:MM  (24-hour time)
  // Set the time to 00:00 for midnight on her birthday.
  birthday: "2026-08-18T00:00",

  /* ---------- PREVIEW MODE ----------------------------------
     While you're building this, set previewMode to true so you
     can skip the countdown and see the whole site.
     ►►► SET IT BACK TO false BEFORE YOU SEND HER THE LINK. ◄◄◄
     (You can also add ?skip to the URL to peek, any time.)
  --------------------------------------------------------- */
  previewMode: false,

  /* ---------- THE GATE — stage 1, while she waits ---------- */
  gate: {
    eyebrow: "Something is waiting for you",
    title: "Not yet, my love.",
    // Shown under the countdown
    hint: "This world opens on your birthday. The panda and I will wait here.",
    // The instant the countdown hits zero — the panda wakes up
    openedEyebrow: "It's time.",
    openedTitle: "The gate is open.",
    wokeHint: "Even the panda woke up for this.",
  },

  /* ---------- THE GATE — stage 2, the password ---------- */
  lock: {
    eyebrow: "One last thing",
    title: "What is the name of our world?",
    hint: "Hint: it's the only word that has ever meant us.",
    placeholder: "type it here",
    // Any of these will unlock the site (case doesn't matter)
    passwords: ["prem", "preeti"],
    wrongMessage: "Not quite, my love. Try again. 🤍",
    button: "Open our world",
  },

  /* ---------- HERO ---------- */
  hero: {
    // Typed out letter by letter
    greeting: "Welcome to",
    subtitle: "A little world I built, only for you.",
    scrollHint: "scroll gently",
  },

  /* ---------- COUNTDOWN ---------- */
  countdown: {
    eyebrow: "The day the world got luckier",
    title: "Counting down to you",
    // Shown once it IS her birthday
    todayTitle: "Happy Birthday, my Preeti",
    todayMessage:
      "Today the whole universe is just an excuse to celebrate you. Every candle, every song, every good thing today — it belongs to you.",
    afterMessage:
      "Every second on this clock is a second closer to celebrating the best thing that ever happened to me.",
  },

  /* ---------- THE SERIES: OUR STORY, CHAPTER BY CHAPTER ----------
     This is the "series" of notes. Add as many chapters as you
     want — just copy one block and change it. They appear in
     order, with the photo alternating left and right.
  ------------------------------------------------------------- */
  chapters: [
    {
      number: "I",
      title: "The Beginning",
      date: "the day everything changed",
      photo: "photos/01.jpg",
      note:
        "I don't think I understood what people meant by 'the whole world stopped' until I met you. " +
        "It didn't stop, actually. It rearranged. Every ordinary thing suddenly had a place to go, and that place was you.",
    },
    {
      number: "II",
      title: "The First Laugh",
      date: "somewhere early on",
      photo: "photos/02.jpg",
      note:
        "You laughed at something I said and I remember thinking — I want to spend a very long time making that sound happen. " +
        "I still do. It's my favourite thing I've ever been responsible for.",
    },
    {
      number: "III",
      title: "The Ordinary Days",
      date: "the ones nobody photographs",
      photo: "photos/03.jpg",
      note:
        "Everyone talks about the big moments. But I fell for you in the small ones. " +
        "The way you say my name when you're tired. The way you get excited about tiny things. " +
        "The quiet afternoons where nothing happened and somehow they were the best days of my life.",
    },
    {
      number: "IV",
      title: "The Hard Part",
      date: "when we found out we'd be okay",
      photo: "photos/04.jpg",
      note:
        "We've had days that weren't easy. And I'm grateful for them, because they showed me something: " +
        "you don't run. You stay, you talk, you hold on. That's rarer than love. That's the thing I'd build a life on.",
    },
    {
      number: "V",
      title: "Home",
      date: "and every day since",
      photo: "photos/05.jpg",
      note:
        "Somewhere along the way you stopped being a person I love and became a place I return to. " +
        "Home isn't a city for me anymore. It's wherever you're standing.",
    },
    {
      number: "VI",
      title: "Now",
      date: "and everything after",
      photo: "photos/06.jpg",
      note:
        "So here we are. I've run out of clever things to say and I'm left with the plain one: " +
        "you are the best thing about my life, and I'd like to keep it that way for as long as you'll let me.",
    },
  ],

  /* ---------- GALLERY ---------- */
  gallery: {
    eyebrow: "Moments",
    title: "Our little museum",
    subtitle: "Every one of these is a day I'd live again.",
    // Add as many as you like. caption shows under the polaroid.
    photos: [
      { src: "photos/g1.jpg", caption: "us" },
      { src: "photos/g2.jpg", caption: "that day" },
      { src: "photos/g3.jpg", caption: "your smile" },
      { src: "photos/g4.jpg", caption: "golden hour" },
      { src: "photos/g5.jpg", caption: "no reason" },
      { src: "photos/g6.jpg", caption: "my favourite" },
      { src: "photos/g7.jpg", caption: "look at us" },
      { src: "photos/g8.jpg", caption: "forever" },
    ],
  },

  /* ---------- REAL PANDAS ----------------------------------
     Actual panda photos, in photos/pandas/. They came from
     Wikimedia Commons under free licences — the credits are in
     photos/pandas/ATTRIBUTION.md, please keep that file.
     Change the captions to whatever makes her laugh.
  --------------------------------------------------------- */
  pandaGallery: {
    eyebrow: "Field research",
    title: "Pandas that remind me of you",
    subtitle: "I looked at a great many pandas for this. Purely for science.",
    items: [
      { src: "photos/pandas/p1.jpg", caption: "Walking away because I said something stupid." },
      { src: "photos/pandas/p2.jpg", caption: "You. Any Sunday. Any Sunday at all." },
      { src: "photos/pandas/p3.jpg", caption: "The face you make when the food arrives." },
      { src: "photos/pandas/p4.jpg", caption: "Coming towards me. My favourite thing to look at." },
      { src: "photos/pandas/p5.jpg", caption: "You, laughing at your own joke. Again." },
      { src: "photos/pandas/p6.jpg", caption: "That smile. That exact one." },
      { src: "photos/pandas/p7.jpg", caption: "Us. Doing absolutely nothing. Perfectly." },
      { src: "photos/pandas/p8.jpg", caption: "Keeping watch over our whole world." },
    ],
    credit: "Photos from Wikimedia Commons under free licences — full credits in photos/pandas/ATTRIBUTION.md",
  },

  /* ---------- REASONS (flip cards) ---------- */
  reasons: {
    eyebrow: "Tap each one",
    title: "Reasons, in no particular order",
    subtitle: "There are more. There will always be more.",
    items: [
      { front: "Your laugh", back: "It's the only sound that fixes a bad day instantly." },
      { front: "Your kindness", back: "You are gentle with people who could never repay you. That's who you are." },
      { front: "Your mind", back: "You notice things nobody else does. Being understood by you is a privilege." },
      { front: "Your stubbornness", back: "You don't give up on people. Especially not on me." },
      { front: "Your eyes", back: "I've never been able to lie to them and I've never wanted to." },
      { front: "Your courage", back: "You've been through more than you let on, and you're still soft. That's strength." },
      { front: "Your hands", back: "The safest place I know is somewhere between your fingers." },
      { front: "Your voice", back: "I could listen to you talk about absolutely nothing, forever." },
      { front: "The way you love", back: "Completely. Without keeping score. I'm learning it from you." },
    ],
  },

  /* ---------- BIRTHDAY / CAKE ---------- */
  birthdaySection: {
    eyebrow: "18th August",
    title: "Blow out the candles",
    subtitle: "Tap each flame. Make a wish. I'll handle the rest.",
    // How many candles on the cake
    candles: 5,
    doneTitle: "Happy Birthday, Preeti 🤍",
    doneMessage:
      "I hope this year is kind to you. I hope it gives you everything you've quietly wanted and never asked for. " +
      "And I hope you know that whatever it brings, you won't face a single day of it alone.",
  },

  /* ---------- THE PROPOSAL ---------- */
  proposal: {
    eyebrow: "One more thing",
    // Each line appears one after another
    buildup: [
      "I've been trying to find the right words for a long time.",
      "There aren't any. Not really.",
      "So I'll just say the true thing.",
    ],
    question: "Preeti — will you be mine, forever?",
    yes: "YES 🤍",
    no: "Let me think…",
    // Cheeky lines that appear when she chases the 'no' button
    noTeases: [
      "Nope.",
      "Try again 😌",
      "Not happening.",
      "You can't catch me.",
      "Wrong button, jaan.",
      "Are you sure? 🥺",
      "The other one's nicer.",
      "This button doesn't work. On purpose.",
    ],
    // After she says YES
    acceptedTitle: "She said YES.",
    acceptedMessage:
      "Then that's it. That's the whole plan. You and me, for as long as we get.",
  },

  /* ---------- FINAL LETTER ---------- */
  finale: {
    eyebrow: "The last page",
    title: "My love,",
    letter: [
      "I built this in the middle of the night because I couldn't sleep thinking about how much I wanted to get this right.",
      "I'm not good at saying things out loud. You know that. So I made you a world instead — with your name on it, and every reason I have written into the walls.",
      "Thank you for being patient with me. Thank you for choosing me on the days I wasn't easy to choose. Thank you for making a whole life feel possible.",
      "Happy birthday, Preeti. And happy everything else, too.",
    ],
    signature: "Always yours,",
    // ← put your name here
    signedBy: "Madhav",
    footer: "PREM — our world · made with far too much love",
  },

  /* ---------- PANDAS 🐼 ----------
     There's a panda waiting on the gate and another one at the
     cake. Tap it and it jumps and says one of these.
  --------------------------------------------------------- */
  panda: {
    gateSays: [
      "shh… I was sleeping.",
      "I've been waiting too.",
      "Almost time.",
      "psst — the password is our world.",
      "He was very nervous making this.",
      "Bamboo? No? Okay.",
    ],
    heroSays: [
      "Welcome to PREM.",
      "Nice mountains, right?",
      "Keep scrolling. It gets better.",
      "I live here now.",
      "He built this whole world for you.",
    ],
    cakeSays: [
      "Happy birthday, Preeti!",
      "Is there cake for pandas?",
      "I helped. Mostly by watching.",
      "Make a good wish.",
      "Best human I know.",
    ],
  },

  /* ---------- MUSIC ---------- */
  music: {
    // Put an mp3 at this path. If the file isn't there, the button
    // simply hides itself — nothing breaks.
    src: "assets/music/our-song.mp3",
    label: "our song",
  },

  /* ---------- NAV DOTS ---------- */
  nav: [
    { id: "hero", label: "PREM" },
    { id: "countdown", label: "Countdown" },
    { id: "story", label: "Our story" },
    { id: "gallery", label: "Moments" },
    { id: "pandas", label: "Pandas" },
    { id: "reasons", label: "Reasons" },
    { id: "birthday", label: "Birthday" },
    { id: "proposal", label: "The question" },
    { id: "finale", label: "Letter" },
  ],
};
