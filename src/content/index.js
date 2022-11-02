import onRequestDone from "./xhr";
import parseRequest from "./parse";
import observeDom from "./observe";
import { defaultWithFallback, link } from "./buttonType";

const videos = [];
onRequestDone(function (response) {
  const requestVideos = parseRequest(response);
  if (requestVideos.length) {
    videos.push(...requestVideos);
  }
});

observeDom(function ({ $group, $image }) {
  const checkVideo = videos.find(function (video) {
    return $image.src.indexOf(video.photo) > -1;
  });
  const checkExtensionButton = $group.getAttribute(
    "data-twitter-video-downloader-extension"
  );
  if (checkVideo && !checkExtensionButton) {
    $group.setAttribute("data-twitter-video-downloader-extension", "true");
    const { width, height } = $group
      .querySelector("svg")
      .getBoundingClientRect();
    
    let buttonMode = localStorage.getItem('twitter-downloader-button-mode');

    switch (buttonMode) {
      case 'default-with-fallback':
        defaultWithFallback($group, checkVideo, width, height)
        break;
      case 'only-link':
        link($group, checkVideo, width, height)
        break;

      default:
        defaultWithFallback($group, checkVideo, width, height)
        break;
    }
  }
});