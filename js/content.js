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

  /* ---------- GREETING BY TIME OF DAY -----------------------
     Reads the clock on her phone and greets her accordingly,
     just above the big PREM. Set enabled:false to turn it off.
  --------------------------------------------------------- */
  greeting: {
    enabled: true,
    morning:   "Good morning, Preeti.",
    afternoon: "Good afternoon, Preeti.",
    evening:   "Good evening, Preeti.",
    night:     "You're up late, Preeti.",
  },

  /* ---------- US, SO FAR ------------------------------------
     A live counter that ticks UP from the day you two started.

     ►►► PUT YOUR DATE HERE ◄◄◄  Format: "YYYY-MM-DD"
     (or "YYYY-MM-DDTHH:MM" if you remember the time).
     Leave it as "" and this whole section quietly disappears.
  --------------------------------------------------------- */
  together: {
    since: "2026-05-13",
    eyebrow: "Us, so far",
    title: "How long you've been mine",
    message:
      "Every one of those seconds happened. That's the part I can't get over — " +
      "that all of it was real, and that there's so much more of it coming.",
    units: { years: "years", days: "days", hours: "hours", minutes: "minutes" },
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
      // landscape artwork — gets a wider frame so the poem isn't cropped
      wide: true,
      note:
        "Naraz mili hai, toh kya hua. That's the whole thing, isn't it — we're allowed to not " +
        "see it the same way. You tell me what you think, I'll explain what I meant, and neither " +
        "of us goes anywhere. Pyaar kiya hai, koi sauda thodi.",
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
      { src: "photos/g1.jpg", caption: "the sea, and you" },
      { src: "photos/g2.jpg", caption: "us, laughing" },
      { src: "photos/g3.jpg", caption: "held" },
      { src: "photos/g4.jpg", caption: "nazar mili hai" },
      { src: "photos/g5.jpg", caption: "my favourite" },
      { src: "photos/g6.jpg", caption: "that smile" },
      { src: "photos/g7.jpg", caption: "no reason at all" },
    ],
  },

  /* ---------- THE REEL (videos) -----------------------------
     Plays one video after another, in this exact order, then
     starts again. They play muted so they don't fight the music
     — she taps the button for sound, which pauses the songs.

     ►►► TO ADD MORE ◄◄◄  Drop the file in as videos/v4.mp4
     (v5, v6 …) and add a line here. The order of this list is
     the order they play in, so reorder these lines to reorder
     the reel. Nothing else to change.
  --------------------------------------------------------- */
  reel: {
    eyebrow: "Moving pictures",
    title: "Us, in motion",
    subtitle: "They play one after another. Tap the screen for sound.",
    soundOn: "Sound on",
    soundOff: "Sound off",
    videos: [
      { src: "videos/v1.mp4", caption: "" },
      { src: "videos/v2.mp4", caption: "" },
      { src: "videos/v3.mp4", caption: "" },
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
    subtitle: "I found these for you. You love them, so now I love them.",
    items: [
      { src: "photos/pandas/p1.jpg", caption: "This one walks like you." },
      { src: "photos/pandas/p2.jpg", caption: "You. Any Sunday." },
      { src: "photos/pandas/p3.jpg", caption: "Your face when the food arrives." },
      { src: "photos/pandas/p4.jpg", caption: "Coming towards me. My favourite thing to look at." },
      { src: "photos/pandas/p5.jpg", caption: "You, laughing at your own joke." },
      { src: "photos/pandas/p6.jpg", caption: "That smile. That exact one." },
      { src: "photos/pandas/p7.jpg", caption: "Us, doing nothing together." },
      { src: "photos/pandas/p8.jpg", caption: "Looking after our whole world." },
    ],
  },

  /* ---------- MEMORY GAME ---------- */
  game: {
    eyebrow: "A small test",
    title: "Find the pairs",
    subtitle: "Six pandas, twelve cards. Let's see that memory of yours.",
    movesLabel: "moves",
    wonTitle: "Of course you won.",
    wonMessage:
      "You always were better at this than me. Remembering things, I mean. " +
      "You remember everything I say, and it's one of my favourite things about you.",
    restart: "Again",
  },

  /* ---------- OPEN WHEN… ------------------------------------
     Sealed notes for later. She taps one open when she needs it.
     Add or remove as many as you like.
  --------------------------------------------------------- */
  openWhen: {
    eyebrow: "For later",
    title: "Open when…",
    subtitle: "Not all at once. Save them. They'll still be here.",
    hint: "tap to open",
    letters: [
      {
        when: "you miss me",
        note:
          "Then I'm missing you harder, I promise. Close your eyes and pick a memory — " +
          "any one — and know that I'm somewhere doing exactly the same thing. " +
          "We are never as far apart as the distance says we are.",
      },
      {
        when: "you've had a bad day",
        note:
          "You don't have to be okay. You don't have to explain it or be graceful about it. " +
          "Put it down. I'll carry it for a bit. Tell me everything, or tell me nothing and " +
          "let me just sit here with you.",
      },
      {
        when: "you can't sleep",
        note:
          "Then think about something small and good. The way the light comes into your room. " +
          "The next time we'll see each other. I'm probably awake too, thinking about you, " +
          "which is a terrible sleeping strategy and my favourite habit.",
      },
      {
        when: "you feel small",
        note:
          "Let me tell you what I see. Someone who is kind when it costs her something. " +
          "Someone people come to when things go wrong. You have never once been small. " +
          "You just can't see yourself from where I'm standing.",
      },
      {
        when: "we've had a fight",
        note:
          "I'm still here. I'm not going anywhere, and neither is this. " +
          "We're allowed to be bad at things sometimes — we're not allowed to give up. " +
          "Come find me when you're ready. I'll have already forgiven you.",
      },
      {
        when: "you just want to smile",
        note:
          "Remember the panda that sleeps on the front page? That's you at 11am on a Sunday. " +
          "I've thought about that for far too long and I'm not sorry. I love you. Go have a good day.",
      },
    ],
  },

  /* ---------- REASONS (flip cards) ---------- */
  reasons: {
    eyebrow: "Tap each one",
    title: "Reasons, in no particular order",
    subtitle: "There are more. There will always be more.",
    items: [
      { front: "Your laugh", back: "It fixes a bad day in about two seconds." },
      { front: "Your kindness", back: "You are gentle with everyone. I get to see the most of it." },
      { front: "Your mind", back: "You notice things nobody else notices. You understand me faster than I do." },
      { front: "The way you hold on", back: "You don't give up on people. Especially not on me." },
      { front: "Your eyes", back: "I have never been able to lie to them, and I have never wanted to." },
      { front: "Your softness", back: "You stayed soft. I think that's the bravest thing about you." },
      { front: "Your hands", back: "The safest place I know is somewhere between your fingers." },
      { front: "Your voice", back: "I could listen to you talk about nothing at all, forever." },
      { front: "The way you love", back: "Completely, and without keeping score. I'm learning it from you." },
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

  /* ---------- OUR PLACES (the map) --------------------------
     A hand-drawn map of the places that matter. x and y are
     percentages across the map, so just nudge the numbers until
     the pins sit where you want them.
  --------------------------------------------------------- */
  map: {
    eyebrow: "Preeti's travel diary",
    title: "Everywhere you've been",
    subtitle:
      "Every place you've explored, pinned on a real map. Tap one. " +
      "And when you're done — I'd like to see the next hundred with you.",

    // "streets" reads better than satellite when the pins are spread
    // across a whole country. She can switch with the button anyway.
    style: "streets",
    zoom: 6,

    /* Taken from her travel diary. The map frames itself around whatever
       is in this list, so you can add, remove or reorder freely.
       To add one: open Google Maps, RIGHT-CLICK the spot, and the first
       item in the menu is the latitude and longitude. Copy, paste.

       Add a "note" to any of them and it shows in the popup — good for
       the ones you went to together. */
    places: [
      /* ---- Gujarat ---- */
      { name: "Dwarkadhish",          state: "Gujarat", lat: 22.2378, lng: 68.9685 },
      { name: "Bet Dwarka",           state: "Gujarat", lat: 22.4333, lng: 69.1167 },
      { name: "Somnath",              state: "Gujarat", lat: 20.8880, lng: 70.4012 },
      { name: "Nageshwar",            state: "Gujarat", lat: 22.3369, lng: 69.0861 },
      { name: "Ambaji",               state: "Gujarat", lat: 24.3319, lng: 72.8511 },
      { name: "Pavagadh",             state: "Gujarat", lat: 22.4823, lng: 73.5133 },
      { name: "Poicha",               state: "Gujarat", lat: 22.0113, lng: 73.4919 },
      { name: "Porbandar",            state: "Gujarat", lat: 21.6417, lng: 69.6293 },
      { name: "Ahmedabad",            state: "Gujarat", lat: 23.0225, lng: 72.5714 },
      { name: "Akshardham, Gandhinagar", state: "Gujarat", lat: 23.2295, lng: 72.6690 },
      { name: "Modhera Sun Temple",   state: "Gujarat", lat: 23.5832, lng: 72.1327 },
      { name: "Dakor",                state: "Gujarat", lat: 22.7530, lng: 73.1500 },
      { name: "Chotila Mata",         state: "Gujarat", lat: 22.4239, lng: 71.1936 },
      { name: "Gir",                  state: "Gujarat", lat: 21.1244, lng: 70.8244 },
      { name: "Surat",                state: "Gujarat", lat: 21.1702, lng: 72.8311 },
      { name: "Rajkot",               state: "Gujarat", lat: 22.3039, lng: 70.8022 },

      /* ---- Rajasthan ---- */
      { name: "Sawariya Ji",          state: "Rajasthan", lat: 24.9300, lng: 74.6000 },
      { name: "Khatu Shyam Ji",       state: "Rajasthan", lat: 27.4000, lng: 75.3900 },
      { name: "Pokhran",              state: "Rajasthan", lat: 26.9200, lng: 71.9200 },
      { name: "Ramdevra",             state: "Rajasthan", lat: 26.9167, lng: 71.9333 },
      { name: "Salasar Balaji",       state: "Rajasthan", lat: 27.7167, lng: 74.7333 },
      { name: "Pushkar",              state: "Rajasthan", lat: 26.4900, lng: 74.5500 },
      { name: "Mehandipur Balaji",    state: "Rajasthan", lat: 26.9833, lng: 76.6500 },
      { name: "Rajsamand",            state: "Rajasthan", lat: 25.0700, lng: 73.8800 },
      { name: "Udaipur",              state: "Rajasthan", lat: 24.5854, lng: 73.7125 },
      { name: "Nathdwara",            state: "Rajasthan", lat: 24.9333, lng: 73.8167 },
      { name: "Kesariyaji",           state: "Rajasthan", lat: 24.1167, lng: 73.7000 },
      { name: "Jhalawar",             state: "Rajasthan", lat: 24.5967, lng: 76.1653 },
      { name: "Tripura Sundari",      state: "Rajasthan", lat: 23.5500, lng: 74.4300 },
      { name: "Gadhbor",              state: "Rajasthan", lat: 25.2539, lng: 73.6945 },
      { name: "Idana Mata",           state: "Rajasthan", lat: 24.4253, lng: 74.3168 },
      { name: "Banoda Balaji",        state: "Rajasthan", lat: 24.9782, lng: 75.1481 },
      { name: "Jeen Mata",            state: "Rajasthan", lat: 27.4442, lng: 75.1945 },

      /* ---- Maharashtra ---- */
      { name: "Bhimashankar",         state: "Maharashtra", lat: 19.0722, lng: 73.5361 },
      { name: "Trimbakeshwar",        state: "Maharashtra", lat: 19.9333, lng: 73.5333 },
      { name: "Grishneshwar",         state: "Maharashtra", lat: 20.0244, lng: 75.1789 },
      { name: "Shirdi",               state: "Maharashtra", lat: 19.7667, lng: 74.4833 },
      { name: "Nashik",               state: "Maharashtra", lat: 19.9975, lng: 73.7898 },
      { name: "Dagdusheth, Pune",     state: "Maharashtra", lat: 18.5163, lng: 73.8567 },
      { name: "Shani Shingnapur",     state: "Maharashtra", lat: 19.3667, lng: 74.8000 },
      { name: "Pune",                 state: "Maharashtra", lat: 18.5204, lng: 73.8567 },

      /* ---- Uttarakhand ---- */
      { name: "Gangotri",             state: "Uttarakhand", lat: 30.9947, lng: 78.9398 },
      { name: "Yamunotri",            state: "Uttarakhand", lat: 31.0139, lng: 78.4600 },
      { name: "Badrinath",            state: "Uttarakhand", lat: 30.7433, lng: 79.4938 },
      { name: "Kedarnath",            state: "Uttarakhand", lat: 30.7346, lng: 79.0669 },
      { name: "Gaurikund",            state: "Uttarakhand", lat: 30.6500, lng: 79.0200 },
      { name: "Rishikesh",            state: "Uttarakhand", lat: 30.0869, lng: 78.2676 },
      { name: "Haridwar",             state: "Uttarakhand", lat: 29.9457, lng: 78.1642 },
      { name: "Mussoorie",            state: "Uttarakhand", lat: 30.4598, lng: 78.0644 },
      { name: "Devprayag",            state: "Uttarakhand", lat: 30.1467, lng: 78.5981 },
      { name: "Mana",                 state: "Uttarakhand", lat: 30.7667, lng: 79.4833 },

      /* ---- Uttar Pradesh ---- */
      { name: "Varanasi",             state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739 },
      { name: "Mathura",              state: "Uttar Pradesh", lat: 27.4924, lng: 77.6737 },
      { name: "Vrindavan",            state: "Uttar Pradesh", lat: 27.5806, lng: 77.7006 },
      { name: "Giriraj Ji, Govardhan",state: "Uttar Pradesh", lat: 27.4975, lng: 77.4644 },
      { name: "Raman Reti, Gokul",    state: "Uttar Pradesh", lat: 27.4400, lng: 77.7200 },
      { name: "Ayodhya",              state: "Uttar Pradesh", lat: 26.7922, lng: 82.1998 },
      { name: "Agra",                 state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081 },
      { name: "Lucknow",              state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
      { name: "Jhansi",               state: "Uttar Pradesh", lat: 25.4484, lng: 78.5685 },
      { name: "Mirzapur",             state: "Uttar Pradesh", lat: 25.1460, lng: 82.5690 },

      /* ---- Madhya Pradesh ---- */
      { name: "Mahakaleshwar, Ujjain",state: "Madhya Pradesh", lat: 23.1828, lng: 75.7683 },
      { name: "Omkareshwar",          state: "Madhya Pradesh", lat: 22.2450, lng: 76.1510 },
      { name: "Indore",               state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
      { name: "Shivpuri",             state: "Madhya Pradesh", lat: 25.4230, lng: 77.6600 },

      /* ---- Odisha, Jharkhand, West Bengal, Bihar ---- */
      { name: "Puri",                 state: "Odisha", lat: 19.8135, lng: 85.8312 },
      { name: "Ghatsila",             state: "Jharkhand", lat: 22.5833, lng: 86.4667 },
      { name: "Vaidyanath Dham, Deoghar", state: "Jharkhand", lat: 24.4922, lng: 86.7000 },
      { name: "Dakshineswar Kali",    state: "West Bengal", lat: 22.6550, lng: 88.3576 },
      { name: "Kalighat",             state: "West Bengal", lat: 22.5200, lng: 88.3426 },
      { name: "Bodh Gaya",            state: "Bihar", lat: 24.6961, lng: 84.9911 },
      { name: "Patna Sahib",          state: "Bihar", lat: 25.6100, lng: 85.2300 },
    ],

    // Shown under the map: "68 places, and counting."
    countSuffix: "places, and counting.",

    /* ---------- THE FLIGHT ------------------------------------
       A little plane flies her whole journey, state by state,
       drawing the route behind it. Then one last dashed line
       goes somewhere she hasn't been yet.
    --------------------------------------------------------- */
    journey: {
      enabled: true,
      button: "Fly her journey",
      replay: "Fly it again",
      flying: "Flying…",

      // The order the plane travels in. Any state not listed is skipped.
      order: [
        "Gujarat", "Rajasthan", "Madhya Pradesh", "Maharashtra",
        "Uttar Pradesh", "Uttarakhand", "Bihar", "Jharkhand",
        "West Bengal", "Odisha",
      ],

      // The last leg — dashed, because it hasn't happened yet
      nextName: "Wherever you want",
      nextNote: "You did all of that without me. The next one, I'm coming with you.",
      // Out over the Bay of Bengal — past everywhere she's been, but not
      // so far that the map has to zoom out to nothing.
      nextLat: 19.2, nextLng: 91.2,

      // Appears once the plane lands on that last one
      ending: "You did all of that without me. Now pick the next one — I'm coming.",
    },

    streetsLabel: "Street map",
    satelliteLabel: "Satellite",
    // Shown if the map can't load (no internet, say)
    offline: "The map needs internet to load. Everything else still works.",
  },

  /* ---------- THE QUIZ ---------- */
  quiz: {
    eyebrow: "A small exam",
    title: "How well do you know us?",
    subtitle: "No pressure. There's only one right answer to the last one.",
    scoreLabel: "right",
    questions: [
      {
        q: "What's the name of our world?",
        options: ["PREM", "PREETI", "Something I've forgotten"],
        answer: 0,
        reply: "Obviously. It was never going to be anything else.",
      },
      {
        q: "What's my favourite thing about you?",
        options: ["Your smile", "Your laugh", "All of it, every day"],
        answer: 2,
        reply: "Right. I can never pick just one.",
      },
      {
        q: "What am I doing right now?",
        options: ["Sleeping", "Thinking about you", "Both, somehow"],
        answer: 2,
        reply: "You know me far too well.",
      },
      {
        q: "How long am I planning to keep this up?",
        options: ["A while", "A very long while", "Forever"],
        answer: 2,
        reply: "Right answer. Only answer.",
      },
    ],
    done: "You passed. You were always going to pass.",
  },

  /* ---------- TIME CAPSULE ----------------------------------
     A letter that refuses to open until the date you choose.
     Set the date, write the note, and she'll have to come back.
     Leave openOn as "" to hide the whole section.
  --------------------------------------------------------- */
  timeCapsule: {
    // ►►► PICK A DATE ◄◄◄  "YYYY-MM-DD" — your anniversary, say
    openOn: "2027-05-13",
    eyebrow: "Not for today",
    lockedTitle: "A letter you can't read yet.",
    lockedHint:
      "I've sealed this one. It opens by itself on the day, and not a moment sooner. " +
      "Come back then — I'll still be here, and so will it.",
    unlocksIn: "opens in",
    dayWord: "days",
    openTitle: "It's time. Open it.",
    button: "Break the seal",
    note:
      "If you're reading this, a whole year has happened to us since I built this world, " +
      "and I'm willing to bet it was a good one. I'm still making you laugh. " +
      "You're still the easiest choice I've ever made, and I'd make it again today.",
  },

  /* ---------- SCRATCH TO REVEAL ---------- */
  scratch: {
    eyebrow: "One last secret",
    title: "There's something under here.",
    hint: "scratch it with your finger",
    secret: "I'd choose you again. Every single time. Without thinking about it.",
    done: "…that's all. That's the secret.",
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

  /* ---------- REPLY BUTTON ----------------------------------
     A button under the letter that opens WhatsApp with a message
     to you already typed, so she can answer in one tap.

     ►►► PUT YOUR NUMBER HERE ◄◄◄  Country code first, digits
     only, no + or spaces. India example: "919876543210".
     Leave it as "" and the button quietly disappears.
  --------------------------------------------------------- */
  reply: {
    whatsapp: "919588874415",
    label: "Say something back",
    // What gets pre-typed into her chat with you
    message: "I found our world. Come here right now.",
  },

  /* ---------- HER NAME IN THE STARS -------------------------
     Once the sky goes dark, the stars join up and spell her
     name across the night. Set enabled:false to turn it off.
  --------------------------------------------------------- */
  constellation: {
    enabled: true,
    // Defaults to her name. Keep it short — 4 to 8 letters reads best.
    word: "PREETI",
    caption: "I put your name in the sky. It was the only place big enough.",
  },

  /* ---------- WHEN SHE SWITCHES TABS ------------------------
     The browser tab quietly changes while she's away.
  --------------------------------------------------------- */
  tabAway: {
    title: "come back 🤍",
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

  /* ---------- YOUR VOICE ------------------------------------
     Record yourself reading the letter on your phone, save it as
     an mp3 at this path, and a play button appears under the
     letter. If the file isn't there, the button stays hidden.
  --------------------------------------------------------- */
  voice: {
    // The browser takes the first one it can play. The .ogg you recorded
    // is Opus, which older iPhones can't play — so if you ever export an
    // mp3 or m4a of the same recording and drop it in as voice.mp3, it
    // will take over automatically and work everywhere.
    sources: [
      "assets/music/voice.mp3",
      "assets/music/voice.ogg",
    ],
    label: "I sang this for you",
    playing: "Playing…",
    caption: "Darkhaast. Headphones, and nobody else around.",
    // Shown only if her phone can't play any of the formats above
    unsupported: "Your phone can't play this recording — ask me and I'll send it to you.",
  },

  /* ---------- PRINT ---------- */
  print: {
    enabled: true,
    label: "Print this letter",
  },

  /* ---------- EASTER EGG ------------------------------------
     Tap the sleeping panda on the gate this many times and it
     tells her a secret. She'll only ever find this by fiddling.
  --------------------------------------------------------- */
  easterEgg: {
    taps: 7,
    message: "You found it. Nobody else will ever see this one. I love you most.",
  },

  /* ---------- THE SOUNDTRACK --------------------------------
     The music changes with the mood of each section and cross-
     fades between tracks as she scrolls. The button bottom-left
     mutes the whole thing.

     "for" lists the section ids a track covers. Any section not
     listed keeps playing whatever was already on.
  --------------------------------------------------------- */
  music: {
    label: "our song",

    // "playlist"  — songs run one after another, cross-fading, forever.
    // "sections"  — each song is tied to a part of the page instead
    //               (the "for" lists below decide which).
    mode: "playlist",

    // Seconds each song gets before handing over to the next.
    // Set it to 0 to let every song play all the way through.
    segment: 10,

    // How loud, 0 to 1
    volume: 0.42,
    // Seconds of overlap as one song hands over to the next
    fade: 2,

    /* ---------------------------------------------------------
       ORDER — chosen to build and then settle, so it loops well:
         soft and close  ->  swelling  ->  big  ->  the peak
         ->  playful  ->  dreamy  ->  back to soft and close

       startAt = how many seconds INTO the song to begin. This
       matters: the first 10 seconds of most songs is just the
       intro. These are my best guess at the part she'd actually
       recognise — play it once and nudge any that feel wrong.
       (A number like 62 means 1 minute 2 seconds.)
    --------------------------------------------------------- */
    tracks: [
      { title: "Jo Tum Mere Ho",      // soft, close, the one you wanted first
        src: "assets/music/Love_JoTumMereHo.mp3",
        startAt: 52,
        for: ["gate", "hero", "together"] },

      { title: "Until I Found You",   // slow, swelling
        src: "assets/music/Love_UntilIFoundYou.mp3",
        startAt: 48,
        for: ["story"] },

      { title: "Love Me Like You Do", // big and cinematic
        src: "assets/music/Love_LoveMeLikeYouDo.mp3",
        startAt: 60,
        for: ["reasons", "openwhen", "ourmap", "quiz"] },

      { title: "Perfect",             // the peak
        src: "assets/music/Love_EDPerfect.mp3",
        startAt: 68,
        for: ["proposal"] },

      { title: "Nadaaniyan",          // lighter, playful, comes down
        src: "assets/music/Love_Nadaaniyan.mp3",
        startAt: 45,
        for: ["birthday"] },

      { title: "I Love You So",       // dreamy close, loops back nicely
        src: "assets/music/Love_TheWalters.mp3",
        startAt: 55,
        for: ["gallery", "pandas", "game"] },
    ],
  },

  /* ---------- NAV DOTS ---------- */
  /* The order here must match the order of the sections in index.html.
     The journey runs to the letter; everything after it is the extras
     tail, for her to poke at once the important part has landed. */
  nav: [
    { id: "hero", label: "PREM" },
    { id: "together", label: "Us, so far" },
    { id: "story", label: "Our story" },
    { id: "gallery", label: "Moments" },
    { id: "reel", label: "Us, moving" },
    { id: "pandas", label: "Pandas" },
    { id: "reasons", label: "Reasons" },
    { id: "openwhen", label: "Open when…" },
    { id: "birthday", label: "Birthday" },
    { id: "proposal", label: "The question" },
    { id: "scratch", label: "Secret" },
    { id: "starname", label: "The stars" },
    { id: "finale", label: "Letter" },
    // ── extras, after the letter ──
    { id: "capsule", label: "Time capsule" },
    { id: "game", label: "Find the pairs" },
    { id: "ourmap", label: "Our places" },
    { id: "quiz", label: "The quiz" },
  ],
};
