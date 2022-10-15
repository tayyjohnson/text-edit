import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database.js";
import "./css/style.css";
import Logo from "./images/logo.png";
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { initDb, getDb, postDb } from "./database.js";

window.addEventListener("load", function () {
  initDb();
});

const main = document.querySelector("#main");
main.innerHTML = "";

window.addEventListener("load", function () {
  document.getElementById("logo").src = Logo;
});

//Function for install button
const buttonInstall = document.getElementById("buttonInstall");
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  buttonInstall.style.visibility = "visible";

  buttonInstall.addEventListener("click", () => {
    event.prompt();
    buttonInstall.setAttribute("disabled", true);
    buttonInstall.textContent = "Installed!";
  });

  window.addEventListener("appinstalled", (event) => {
    console.log("👍", "appinstalled", event);
  });
});

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === "undefined") {
  loadSpinner();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}