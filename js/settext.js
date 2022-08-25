function gettime() {
  var d = new Date();
  return d.toLocaleTimeString();
}

function getdate() {
  var d = new Date();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    days[d.getDay()] +
    ", " +
    months[d.getMonth()] +
    " " +
    d.getDate() +
    ", " +
    d.getFullYear()
  );
}

function getQuote() {
  return config.quote[Math.floor(Math.random() * config.quote.length)].replace(
    "— ",
    "\n— "
  );
}

function settext(id, text) {
  var el = document.getElementById(id);
  if (el) {
    el.innerText = text;
  }
}

async function geticon(elem, url) {
  storage = chrome.storage.local.get("urls", (result) => {
    if (result.urls[`${url}`] !== undefined) {
      elem.src = result.urls[`${url}`];
    } else {
      fetch(`http://favicongrabber.com/api/grab/` + url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.icons.length > 0) {
            storage = chrome.storage.local.get("urls");
            storage[`${url}`] = data.icons[0].src;
            chrome.storage.local.set({ urls: storage });
            elem.src = data.icons["0"].src;
          } else {
            return "";
          }
        });
      console.log(chrome.storage.local.get("url"));
    }
  });
}

settext("title", config.title);
settext("greeter", config.name);
settext("time", gettime());
settext("date", getdate());
settext("quote", getQuote());
img = document.getElementById("lmao");
geticon(img, "instagram.com");

setInterval(() => {
  settext("time", gettime());
}, 100);

setInterval(() => {
  settext("date", getdate());
}, 1000);
