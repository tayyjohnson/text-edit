const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible';
});

// Event handler for the `butInstall` element
butInstall.addEventListener('click', async () => {
    event.prompt();
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed!';
});

// Event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('sucess!', 'appinstalled', event);
});