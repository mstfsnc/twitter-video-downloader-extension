const buttonMode = document.getElementById('download-button-mode')
const options = [
  {value: 'default-with-fallback', text: 'Default with Link Button as fallback'},
  {value: 'only-link', text: 'Only Link Button'}
]
for(let i=0; i < options.length; i++) {
  let optEl = document.createElement('option')
  optEl.value = options[i].value
  optEl.innerHTML = options[i].text
  buttonMode.appendChild(optEl)
}

/**
 * @type {HTMLButtonElement} saveBtn
 */
const saveBtn = document.getElementById('save')
saveBtn.addEventListener('click', e => {
  chrome.storage.local.set({buttonMode: buttonMode.value})
  saveBtn.textContent = 'Saved!';
  saveBtn.setAttribute('disabled', 'true')
  saveBtn.disabled = true;
  setTimeout(() => {
    saveBtn.textContent = 'Save';
    saveBtn.disabled = false;
  }, 500);
})

function restoreSettings() {
  chrome.storage.local.get('buttonMode', res => {
    document.getElementById('download-button-mode').value = res.buttonMode
  })
}

document.addEventListener('DOMContentLoaded', restoreSettings)