const aplayer = document.querySelector("#aplayer")

if (aplayer) {
    let dataSong = aplayer.getAttribute("data-song")
    dataSong = JSON.parse(dataSong)
    let dataSinger = aplayer.getAttribute("data-singer")
    dataSinger = JSON.parse(dataSinger)

    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar
        }],
        autoplay: true
    });

    const songAvatar = document.querySelector(".singer-detail .song-avatar img")

    ap.on('pause', function () {
        songAvatar.style.animationPlayState = "paused"
    });

    ap.on('play', function () {
        songAvatar.style.animationPlayState = "running"
    });
}