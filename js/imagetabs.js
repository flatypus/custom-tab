function toBaseURL(fullURL) {
  return fullURL.replace(/(http(s)?:\/\/)|(\/.*){1}/g, "");
}

function removeHttps(url) {
  return url.replace(/^https?:\/\//i, "");
}
const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve([url, img.width * img.height]);
    img.onerror = () => resolve(url, 0);
    img.src = url;
  });
};

async function getLargest(elem, url, icons) {
  arr = await Promise.all(
    icons.map((i) => {
      return getImageDimensions(i.src);
    })
  );
  arr.sort((a, b) => (a[1] > b[1] ? 1 : -1));
  bestsrc = arr[arr.length - 1][0];
  chrome.storage.local.set({ [url]: bestsrc });
  elem.src = bestsrc;
}

function setDefault(elem, url) {
  // console.log("grabbing default because data.icons.length == 0");
  elem.src = "./customicons/default.png";
  chrome.storage.local.set({ [url]: "./customicons/default.png" });
}

async function geticon(elem, url, www = 1) {
  try {
    storage = chrome.storage.local.get([url], (result) => {
      if (result[url] !== undefined) {
        // console.log(result);
        elem.src = result[url];
      } else {
        fetch(
          `https://favicongrabber.com/api/grab/` +
            (www == 2 ? "www." : "") +
            url,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
          .then((response) => {
            if (response.status == 422) {
              setDefault(elem, url);
            } else if (response.status == 500) {
              if (www == 2) {
                setDefault(elem, url);
              } else {
                geticon(elem, url, (www = 2));
              }
            } else {
              return response.json();
            }
          })
          .then((data) => {
            if (data.icons.length > 0) {
              getLargest(elem, url, data.icons);
            }
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    });
  } catch {
    // console.log("error");
    geticon(elem, url);
    return;
  }
}

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
