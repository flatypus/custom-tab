if (!config.minimal) {
  let mousex, mousey;
  let word = "";
  let search = "";
  var c = document.getElementById("canvas");
  c.focus();
  var ctx = c.getContext("2d");
  ctx.font = "90px Arial";
  ctx.canvas.width = window.innerWidth * 0.98;
  ctx.canvas.height = window.innerHeight * 0.96;
  function handleWindowMouseMove(event) {
    mousex = event.clientX;
    mousey = event.clientY;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(mousex, mousey, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText(word, mousex + 40, mousey - 20);
    if (word != "") {
      let drawn = 0;
      search = word;
      for (i in config.search) {
        if (i.includes(word)) {
          ctx.fillText(i, mousex + 40, mousey + 20 + 10 * drawn);
          if (drawn == 0) search = config.search[i];
          drawn += 1;
        }
      }
    }

    setTimeout(() => {}, 1000 / 30);
    requestAnimationFrame(draw);
  }

  function changeWord(event) {
    if (event.key == "Backspace" && word.length > 0) {
      word = word.slice(0, word.length - 1);
    } else if (event.key == "Enter" && search != "") {
      console.log(search);
    } else if (event.key.length == 1) {
      word += event.key;
    }
  }

  window.addEventListener("mousemove", handleWindowMouseMove);
  window.addEventListener("keydown", changeWord);
  var loop = requestAnimationFrame(draw);
}
