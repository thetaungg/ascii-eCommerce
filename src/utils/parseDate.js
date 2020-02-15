const parseDate = (dataInString) => {
    const date = new Date(dataInString);
    const currentDate = new Date();

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;

    const elapsed = currentDate - date;

    if(elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago'
    }
    if(elapsed < msPerHour ){
        return Math.round(elapsed / msPerMinute) + ' minutes ago'
    }
    if(elapsed < msPerDay ){
        return Math.round(elapsed / msPerHour) + ' hours ago'
    }
    if(elapsed < msPerWeek ){
        return Math.round(elapsed / msPerDay) + ' days ago'
    }
    if(elapsed === msPerWeek) {
        return 'a week ago'
    }
    return `${date.getDate()}/${date.getMonth()+1}/${date.getUTCFullYear()}` //because month starts from 0
};

export default parseDate;