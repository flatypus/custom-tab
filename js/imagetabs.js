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
var list = document.getElementById("links");
for (var element in config.links) {
  url = toBaseURL(config.links[element]);
  var container = document.createElement("a");
  var textnode = document.createElement("div");
  var imagenode = document.createElement("img");
  // style container
  container.style.backgroundColor = "#ffffff34";
  container.style.borderRadius = "1vw";
  container.style.height = "170px";
  container.style.position = "relative";
  container.href = "https://" + config.links[element];
  // style textbox
  textnode.innerText = element;
  textnode.style.position = "absolute";
  textnode.style.bottom = "0";
  textnode.style.width = "100%";
  textnode.style.fontSize = "1.5em";
  textnode.style.backgroundColor = "#00000034";
  textnode.style.borderRadius = "1vw";
  textnode.style.textAlign = "center";
  textnode.style.paddingBlock = "0.5vw";
  textnode.style.textDecoration = "none";
  textnode.style.color = "#e7e7e7d7";
  // style imagenode
  imagenode.style.height = "100px";
  imagenode.style.width = "100px";
  imagenode.style.paddingInline = "30px";
  imagenode.style.paddingBlockStart = "20px";
  geticon(imagenode, url);
  container.appendChild(imagenode);
  container.appendChild(textnode);
  list.appendChild(container);
}
