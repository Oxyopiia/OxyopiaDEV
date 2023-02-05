function secsToTime(num) {
    var hours = Math.floor(num / 3600);
    var minutes = Math.floor((num - (hours * 3600)) / 60);
    var seconds = num - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}

function rainTimer() {
    const UTCPrevThunderstorm = 1668474356000;
    const UTCNow = new Date().getTime();
    const base = Math.floor((UTCNow - UTCPrevThunderstorm) / 1000);
    const thunderstorm = base % ((3850 + 1000) * 4);

    const timer = document.querySelector("#thunder-container #thunderTimer")

    timer.textContent = "00:00:00";

    // if (thunderstorm + 63 === 18400) {
    //     console.log("Here2")
    //     var audio = new Audio('thunderstorm_timer.mp3');
    //     audio.play();
    // }

    if (thunderstorm < (3850 * 4 + 1000 * 3)) {
        timer.textContent = secsToTime(3850 * 4 + 1000 * 3 - thunderstorm);
    } else {
        timer.textContent = `NOW (${secsToTime(3850 * 4 + 1000 * 4 - thunderstorm)})`;
    }
    
}

rainTimer()
setInterval('rainTimer()', 500);