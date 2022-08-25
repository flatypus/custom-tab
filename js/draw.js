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
    ctx.arc(mousex, mousey, 30, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText(word, mousex, mousey);
    if (word != "") {
      let drawn = [];
      search = word;
      for (i in config.search) {
        if (i.includes(word)) {
          if (drawn.length == 0) search = config.search[i];
          drawn.push(i);
        }
      }
      for (let i = 0; i < drawn.length; i++) {
        ang = (i * 2 * Math.PI) / drawn.length;
        ctx.fillText(
          drawn[i],
          mousex + Math.cos(ang) * 90,
          mousey + Math.sin(ang) * 90
        );
        ctx.beginPath();
        ctx.arc(
          mousex + Math.cos(ang) * 90,
          mousey + Math.sin(ang) * 90,
          60,
          0,
          2 * Math.PI
        );
        ctx.stroke();
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
