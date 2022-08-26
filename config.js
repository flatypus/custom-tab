// all the variables can and should be changed to fit the user

config = {
  // change this to the number of images in /images, otherwise random image generator will fail
  numberOfImages: 10,

  // how many links to show per row
  iconsPerRow: 5,

  // title in the top tab
  title: "Zho Sun, Hinson",

  // links to websites to be shown in tabs
  links: {
    gmail: "mail.google.com",
    docs: "docs.google.com",
    crd: "remotedesktop.google.com",
    github: "https://github.com/flatypus",
    linkedin: "linkedin.com",
    instagram: "instagram.com",
    drive: "drive.google.com",
    youtube: "youtube.com",
    pixlr: "https://pixlr.com/x/",
    geoguessr: "geoguessr.com",
    twitch: "twitch.tv",
    studio: "studio.youtube.com",
    localhost: "localhost:3000",
    wikipedia: "wikipedia.org",
    work: "https://trello.com/",
  },

  // if you don't want quotes, just delete the entire quote section
  quote: [
    ["Be the change you want to see in the world.", " — Mahatma Gandhi"],
    [
      "When you have a dream, you've got to grab it and never let go.",
      " — Carol Burnett",
    ],
    [
      "Nothing is impossible. The word itself says 'I'm possible!'",
      " — Audrey Hepburn",
    ],
    [
      "There is nothing impossible to they who will try. ",
      " — Alexander the Great",
    ],
    [
      "The bad news is time flies. The good news is you're the pilot. ",
      " — Michael Altshuler",
    ],
    [
      "Life has got all those twists and turns. You've got to hold on tight and off you go. ",
      " — Nicole Kidman",
    ],
    [
      "Keep your face always toward the sunshine, and shadows will fall behind you.   ",
      " — Walt Whitman",
    ],
  ],

  // list of search engines to be chosen from
  customsearch: {
    YouTube: "https://www.youtube.com/results",
    Google: "https://www.google.com/search",
    StackOverflow: "https://stackoverflow.com/search",
  },

  // icon override for when favicon picker fails to find a high res icon
  customicons: {
    docs: "./js/customicons/docs.png",
    drive: "./js/customicons/drive.png",
    youtube: "./js/customicons/youtube.png",
    twitch: "./js/customicons/twitch.png",
    studio: "./js/customicons/studio.png",
  },
};
