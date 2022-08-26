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

function toBaseURL(fullURL) {
  return fullURL.replace(/(http(s)?:\/\/)|(\/.*){1}/g, "");
}

function settext(id, text) {
  var el = document.getElementById(id);
  if (el) {
    el.innerText = text;
  }
}

function setuplocalstorage() {
  chrome.storage.local.get("urls", (result) => {
    if (result.urls === undefined) {
      chrome.storage.local.set({ urls: {} });
    }
  });
}

async function geticon(elem, url) {
  url = toBaseURL(url);
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
            storage = chrome.storage.local.get("urls", (result) => {
              result.urls[`${url}`] = data.icons[0].src;
              chrome.storage.local.set({ urls: result.urls });
              elem.src = data.icons["0"].src;
            });
          } else {
            return "";
          }
        });
      console.log(chrome.storage.local.get("url"));
    }
  });
}

setuplocalstorage();
settext("title", config.title);
settext("greeter", config.name);
settext("time", gettime());
settext("date", getdate());
settext("quote", getQuote());

var list = document.getElementById("links");
for (var key in config.links) {
  var container = document.createElement("div");
  var textnode = document.createElement("div");
  var imagenode = document.createElement("img");
  // style container
  container.style.backgroundColor = "#ffffff34";
  container.style.borderRadius = "1vw";
  container.style.height = "170px";
  container.style.position = "relative";
  // style textbox
  textnode.innerText = key;
  textnode.style.position = "absolute";
  textnode.style.bottom = "0";
  textnode.style.width = "100%";
  textnode.style.fontSize = "1.5em";
  textnode.style.backgroundColor = "#00000034";
  textnode.style.borderRadius = "1vw";
  textnode.style.textAlign = "center";
  textnode.style.paddingBlock = "0.5vw";
  // style imagenode
  imagenode.style.height = "100px";
  imagenode.style.width = "100px";
  imagenode.style.paddingInline = "30px";
  imagenode.style.paddingBlockStart = "20px";
  geticon(imagenode, config.links[key]);
  container.appendChild(imagenode);
  container.appendChild(textnode);
  list.appendChild(container);
}

setInterval(() => {
  settext("time", gettime());
}, 100);

setInterval(() => {
  settext("date", getdate());
}, 1000);
