import downloadVideo from "./download";
import Button from "./button.html";
import ExternalLink from "./external-link.html"
import Mustache from "mustache";

export function defaultWithFallback($group, checkVideo, width, height) {
  const $button = document.createElement("button");
  $button.classList.add("extension-button");
  $button.setAttribute("role", "button");
  $button.insertAdjacentHTML(
    "beforeend",
    Mustache.render(Button, {
      width,
      height,
    })
  );
  $group.appendChild($button);
  $button.addEventListener("click", async function (event) {
    event.preventDefault();
    this.disabled = true;
    this.classList.add("loading");
    let downloadSucceed = await downloadVideo(checkVideo.video, checkVideo.text);
    this.classList.remove("loading");
    if(downloadSucceed) {
      this.classList.add("success");
    } else {
      this.classList.add('error')
      this.title = 'Download error, please use fallback link on the right'
      link($group, checkVideo, width, height)
    }
  });
}

export function link($group, checkVideo, width, height) {
  const $link = document.createElement('a');
  $link.href = checkVideo.video
  $link.title = 'Right click and choose save link as to download'
  $link.target = '_blank'
  $link.classList.add("extension-button");
  $link.setAttribute('role', 'button');
  $link.insertAdjacentHTML(
    "beforeend",
    Mustache.render(ExternalLink, {
      width,
      height,
    })
  );
  $link.addEventListener('click', e => {
    e.preventDefault()    
  })
  $group.appendChild($link);
  
}