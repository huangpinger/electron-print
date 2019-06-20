const {app, BrowserWindow, ipcMain} = require('electron');
let mainWindow;


function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600})

    mainWindow.loadFile('index.html');//作为一个地里的渲染进程中

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () =>{
        mainWindow = null;
    })
    //在主线程下，通过ipcMain对象监听渲染线程传过来的getPrinterList时间
    ipcMain.on('getPrinterList', (event) =>{
        const  list = mainWindow.webContents.getPrinters();
        mainWindow.webContents.send('getPrinterList', list);
    })
}
app.on('ready', createWindow);
app.on('window-all-closed', () =>{
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
app.on('activate', () =>{
    if (mainWindow === null) {
        createWindow();
    }
})
