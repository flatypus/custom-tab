# Hinson's New Tab Page

## How to use:
First, click the green 'Code' button, download as zip, then unpack, or run <br>
`git clone https://github.com/flatypus/newtab`. <br>
This is meant to be a chrome extension, so open the extensions page on your browser, and tick the 'developer mode' button on the top right. Then, click 'load unpacked' button on the top left, and select this folder. Then, duplicate the default.config.js file, rename it to config.js, and edit it to suit your needs.

## Features
<ol>
  <li>Configurable even for non-programmers through the config.js file</li>
  <li>Load custom images in /images, just name them in order and change <code>numberofimages</code> in config.js</li>
  <li>Automatically grabs favicons from page when added to the link list, then caches them in local storage to speed up future loads (if auto favicon is too low res, there is a custom favicon feature)</li>
  <li>Custom search bar for searching specific websites quickly</li>
</ol>

| ![image](https://user-images.githubusercontent.com/68029599/186850372-d1cc3c89-0f95-4673-8dbb-bbab553e93cb.png) | 
|:--:| 
| *Beautiful dashboard of customizable tabs* |
| ![image](https://user-images.githubusercontent.com/68029599/186854651-815e20c7-1945-4c00-a799-5854348fed6b.png) | 
| *Custom search feature* |

## Common problems:
-If the favicon grabber returns a low res or inaccurate image, you can override it in the customicon section at the bottom of the config.js. Provide the name of the website that matches the same name in the link list, and a path to the image.

<br>Kinda inspired by [vincent's start page](https://github.com/vincor-qc/new-startpage) btw<br>
