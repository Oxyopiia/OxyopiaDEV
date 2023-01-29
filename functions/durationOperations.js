function timeToSecs(time) {
    var b = time.split(':');
    return b[0]*3600 + b[1]*60 + +b[2];
}

function timeFromSecs(secs, wrap) {
    function z(n){return (n<10? '0':'') + n;}
    var h = (secs / 3600 | 0); if(wrap) h = h % 24;
    var m = Math.floor(secs / 60) % 60; 
    var s = secs % 60;
    return z(h) + ':' + z(m) + ':' + z(s);
}
  
/**
 * Adds durations together
 * @param {boolean} wrap If times should wrap if 24 hours is passed
 * @param {strings} times Duration in hh:mm:ss format
 * @returns {string} Duration in hh:mm:ss format
 */
function addTimes(wrap, ...times) {
    let total = 0

    times.forEach(t => {
        total += timeToSecs(t)
    })

    return timeFromSecs(total,wrap);
}