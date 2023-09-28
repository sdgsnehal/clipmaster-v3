import { ipcRenderer } from "electron";
import { contextBridge } from "electron/renderer";

const api = {
  writeToClipboard: (content: string) => {
    ipcRenderer.send("write-to-clipboard", content);
  },
  readFromClipboard: async ():Promise<string> => {
    return ipcRenderer.invoke("read-from-clipbopard");
  },
} as const;
contextBridge.exposeInMainWorld('api',api);
export type Api = typeof api;
