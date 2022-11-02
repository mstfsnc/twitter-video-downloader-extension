export default async function (url, name) {
  return fetch(url)
    .then(function (response) {
      return response.blob();
    })
    .then(function (response) {
      const element = document.createElement("a");
      element.style.display = "none";
      document.body.appendChild(element);
      element.href = window.URL.createObjectURL(response);
      element.setAttribute("target", "_blank");
      element.setAttribute("download", `${name}.mp4`);
      element.click();

      window.URL.revokeObjectURL(element.href);
      document.body.removeChild(element);
      return true;
    }).catch(err => {
      console.error('Error while downloading video', err)
      return false;
    });
}
