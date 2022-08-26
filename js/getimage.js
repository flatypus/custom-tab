const bg = document.getElementById("background").style;
bg.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/${
  1 + Math.floor(Math.random() * config.numberOfImages)
}.png")`;
