function toBaseURL(fullURL) {
  return fullURL.replace(/(http(s)?:\/\/)|(\/.*){1}/g, "");
}

function setuplocalstorage() {
  chrome.storage.local.get("urls", (result) => {
    if (result.urls === undefined) {
      chrome.storage.local.set({ urls: {} });
    }
  });
}

function imageSize(url) {
  const img = new Image();
  img.addEventListener("load", function () {
    return this.naturalWidth * this.naturalHeigh;
  });
  img.src = url;
}

function largest(elems) {
  e = [];
  for (let i in elems) {
    console.log(imageSize(elems[i].src));
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
            console.log(data, largest(data.icons));
            storage = chrome.storage.local.get("urls", (result) => {
              result.urls[`${url}`] = data.icons[0].src;
              chrome.storage.local.set({ urls: result.urls });
              elem.src = data.icons["0"].src;
            });
          } else {
            return "";
          }
        });
    }
  });
}

setuplocalstorage();
var list = document.getElementById("links");
for (var element in config.links) {
  url = toBaseURL(config.links[element]);
  var container = document.createElement("a");
  var textnode = document.createElement("div");
  var imagenode = document.createElement("img");
  // style container
  container.className = "container";
  container.href = "https://" + config.links[element];
  // style textbox
  textnode.innerText = element;
  textnode.className = "textnode";
  // style imagenode
  imagenode.className = "imagenode";
  geticon(imagenode, url);
  container.appendChild(imagenode);
  container.appendChild(textnode);
  list.appendChild(container);
}
