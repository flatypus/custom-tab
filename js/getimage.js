const bg = document.getElementById("background").style;
bg.backgroundImage = `url("/images/${
  1 + Math.floor(Math.random() * config.numberofimages)
}.png")`;
