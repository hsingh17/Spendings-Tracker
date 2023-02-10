const formatDate = (date: string) => {
    // TODO: Error handling (?)

    // Can't pass date string into the Date object since JS will convert to UTC
    const split: Array<string> = date.split("-");
    const yearNum: number = parseInt(split[0]);
    const monthIdx: number = parseInt(split[1])-1;
    const dateNum: number = parseInt(split[2]);
    
    const dateObj: Date = new Date(yearNum, monthIdx, dateNum);

    const monthRaw: number = dateObj.getMonth() + 1;
    const month: string = (monthRaw < 10) ? `0${monthRaw}` : `${monthRaw}`;

    const dayRaw: number = dateObj.getDate();
    const day: string = (dayRaw < 10) ? `0${dayRaw}` : `${dayRaw}`;

    return `${month}-${day}-${dateObj.getFullYear()}`
};

export default formatDate;