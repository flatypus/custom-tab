function toBaseURL(fullURL) {
  return fullURL.replace(/(http(s)?:\/\/)|(\/.*){1}/g, "");
}

function removeHttps(url) {
  return url.replace(/^https?:\/\//i, "");
}

function setuplocalstorage() {
  chrome.storage.local.get("urls", (result) => {
    if (result.urls === undefined) {
      chrome.storage.local.set({ urls: {} });
    }
  });
}

const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve([url, img.width * img.height]);
    img.onerror = (error) => reject(error);
    img.src = url;
  });
};

function getLargest(arr) {
  arr.sort((a, b) => (a[1] > b[1] ? 1 : -1));
  return arr[arr.length - 1][0];
}

function setDefault(elem) {
  console.log("grabbing default because data.icons.length == 0");
  elem.src = "./js/customicons/default.png";
  storage = chrome.storage.local.get("urls", async (result) => {
    result.urls[`${url}`] = "./js/customicons/default.png";
    chrome.storage.local.set({ urls: result.urls });
  });
}

async function geticon(elem, url) {
  try {
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
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            try {
              if (data.icons.length > 0) {
                storage = chrome.storage.local.get("urls", async (result) => {
                  res = await Promise.all(
                    data.icons.map((i) => {
                      return getImageDimensions(i.src);
                    })
                  );
                  bestsrc = getLargest(res);
                  result.urls[`${url}`] = bestsrc;
                  chrome.storage.local.set({ urls: result.urls });
                  elem.src = bestsrc;
                });
              } else {
                // setDefault(elem);
                geticon(elem, url);
                return;
              }
            } catch {
              // setDefault(elem);
              geticon(elem, url);
              return;
            }
          })
          .catch((error) => {
            if (error instanceof TypeError) {
              setDefault(elem);
            } else if (error instanceof SyntaxError) {
              geticon(elem, url);
              return;
            }
          });
      }
    });
  } catch {
    console.log("error");
    geticon(elem, url);
    return;
  }
}

setuplocalstorage();
var list = document.getElementById("links");
links.style.gridTemplateColumns = `repeat(${config.iconsPerRow}, minmax(0, 1fr))`;
for (var element in config.links) {
  url = toBaseURL(config.links[element]);
  var container = document.createElement("a");
  var textnode = document.createElement("div");
  var imagecontainer = document.createElement("div");
  var imagenode = document.createElement("img");
  // style container
  container.className = "container";
  container.href = "https://" + removeHttps(config.links[element]);
  // style textbox
  textnode.innerText = element;
  textnode.className = "textnode";
  // style imagenode
  imagenode.className = "imagenode";
  // style imagecontainer
  imagecontainer.className = "imagecontainer";
  if (Object.keys(config.customicons).includes(element)) {
    imagenode.src = config.customicons[element];
  } else {
    geticon(imagenode, url);
  }
  imagecontainer.appendChild(imagenode);
  container.appendChild(imagecontainer);
  container.appendChild(textnode);
  list.appendChild(container);
}
