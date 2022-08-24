function gettime() {
  var d = new Date();
  return d.getTime();
}

function settext(id, text) {
  var el = document.getElementById(id);
  if (el) {
    el.innerText = text;
  }
}

settext("title", config.title);
settext("greeter", config.name);
settext("time", gettime())

setInterval(() => {
  settext("time", gettime());
}, 1000);
