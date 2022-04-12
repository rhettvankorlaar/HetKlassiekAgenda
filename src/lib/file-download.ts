import { saveAs } from "file-saver";

export const saveFile = async (calendar : Blob) => {
    saveAs(calendar,'calendar.ics')
}