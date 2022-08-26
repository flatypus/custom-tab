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
  console.log(arr);
  return arr[arr.length - 1][0];
}

async function geticon(elem, url) {
  switch (url) {
    case "docs.google.com":
      elem.src = "./js/customicons/docs.png";
      break;
    case "youtube.com":
      elem.src = "./js/customicons/youtube.png";
      break;
    case "drive.google.com":
      elem.src = "./js/customicons/drive.png";
      break;
    case "studio.youtube.com":
      elem.src = "./js/customicons/studio.png";
      break;
    case "twitch.tv":
      elem.src = "./js/customicons/twitch.png";
      break;
    default:
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
                  return "";
                }
              } catch {
                elem.src = data.icons[0].src;
              }
            });
        }
      });
  }
}

setuplocalstorage();
var list = document.getElementById("links");
for (var element in config.links) {
  console.log(config.links[element]);
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
  geticon(imagenode, url);
  imagecontainer.appendChild(imagenode);
  container.appendChild(textnode);
  container.appendChild(imagecontainer);
  list.appendChild(container);
}