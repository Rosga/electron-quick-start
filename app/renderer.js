// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const IOHook =  require("./iohook").IOHook;

let iohook = null;

const startHookButton = document.querySelector(".start-hook"),
    stopHookButton = document.querySelector(".stop-hook");

const left = document.querySelector(".left"),
    top = document.querySelector(".top");

const openDialogButton = document.querySelector(".open-dialog");

openDialogButton.addEventListener("click", function() {

    const { remote } = require("electron");
    const filePath = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
        message: "Open Fie",
        buttonLabel: "Open"
    });

    console.log("user chose file => ", filePath);

});

startHookButton.addEventListener("click", function() {
    if (iohook !== null) {
        return;
    }

    iohook = new IOHook();

    iohook.on("mousemove", (data) => { 
        left.textContent = data.x;
        top.textContent = data.y;
    });

    iohook.start();
});

stopHookButton.addEventListener("click", function() {
    if (iohook === null) {
        return;
    }

    iohook.stop();
    iohook.unload();
    iohook.removeAllListeners();
    iohook = null;
});

