function formatCommentDate(date) {
    let dateCom = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear() - 2000;
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (month < 10) {
        month = "0" + month;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    return dateCom = day + "." + month + "." + year + "  " + hour + ":" + minute;
}

export { formatCommentDate }