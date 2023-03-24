import { Nullable } from "./types";

const DateFormatter = {
    formatDateUS(date: Nullable<string>) : Nullable<string> {
        // TODO: Error handling (?)
        if (!date) {
            return null;
        }
    
        // Can't pass date string into the Date object since JS will convert to UTC
        const split: Array<string> = date.split("-");
        const yearNum: number = parseInt(split[0]);
        const monthIdx: number = parseInt(split[1])-1;
        const dateNum: number = parseInt(split[2]);
        
        const dateObj: Date = new Date(yearNum, monthIdx, dateNum);
        if (isNaN(dateObj.getTime())) { // NaN check
            return null;
        }
    
        const monthRaw: number = dateObj.getMonth() + 1;
        const month: string = (monthRaw < 10) ? `0${monthRaw}` : `${monthRaw}`;
    
        const dayRaw: number = dateObj.getDate();
        const day: string = (dayRaw < 10) ? `0${dayRaw}` : `${dayRaw}`;
    
        return `${month}-${day}-${dateObj.getFullYear()}`;
    },

    formatDateISO(date: Nullable<string>) : string {
        if (!date) {
            date = new Date().toISOString().split("T")[0];
            return date;
        }

        const split: Array<string> = date.split("-");
        const month: number = parseInt(split[0]);
        const day: number = parseInt(split[1]);
        const year: number = parseInt(split[2]);
        
        return `${year}-${month < 10 ? `0${month}` : month}-${day}`;
    }
}


export default DateFormatter;