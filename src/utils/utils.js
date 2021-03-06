export function formatTime(time) {
    let date = new Date(time),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    return `${year}-${month}-${day}`
}