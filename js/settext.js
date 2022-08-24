function gettime() {
  var d = new Date();
  return d.toLocaleTimeString();
}

function getdate() {
  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function settext(id, text) {
  var el = document.getElementById(id);
  if (el) {
    el.innerText = text;
  }
}

settext("title", config.title);
settext("greeter", config.name);
settext("time", gettime());
settext("date", getdate());

setInterval(() => {
  settext("time", gettime());
}, 100);

setInterval(() => {
  settext("date", getdate());
}, 1000);
