import { join } from "node:path";
import { app, BrowserWindow, clipboard, ipcMain,globalShortcut} from "electron";
import Clipping from "../renderer/components/clipping";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    minHeight: 400,
    minWidth: 600,
    maxHeight: 800,
    maxWidth: 450,
    maximizable: false,
    titleBarStyle: "hidden",
    titleBarOverlay: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.webContents.openDevTools({ mode: "detach" });

  return mainWindow;
};

app.on("ready", ()=>{
  const BrowserWindow = createWindow();
  globalShortcut.register('CommandOrControl+Shift+C',()=>{
    const content = clipboard.readText();

  })
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.on("write-to-clipboard", (_, content:string) => {
  clipboard.writeText(content);
});
ipcMain.handle('read-from-clipboard',(_)=>{
  return clipboard.readText();
})
