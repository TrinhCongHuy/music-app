// Play music in detail song
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

// update like in detail song
const buttonLike = document.querySelector("[button-like]")
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const idSong = buttonLike.getAttribute("button-like")
        const isActive = buttonLike.classList.contains("active")

        const typeLike = isActive ? "disLike" : "like"
        
        const link = `/songs/like/${typeLike}/${idSong}`

        const option = {
            method: "PATCH"
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                const span = buttonLike.querySelector('span')
                span.innerHTML = `${data.like} lượt thích`
                buttonLike.classList.toggle("active")
            })
    })
}

// update favorite in detail song
const listButtonFavorite = document.querySelectorAll("[button-favorite]")
if (listButtonFavorite) {
    listButtonFavorite.forEach(buttonFavorite => {
        buttonFavorite.addEventListener("click", () => {
            const idSong = buttonFavorite.getAttribute("button-favorite")
            const isActive = buttonFavorite.classList.contains("active")
    
            const typeFavorite = isActive ? "unfavorite" : "favorite"
            
            const link = `/songs/favorite/${typeFavorite}/${idSong}`
    
            const option = {
                method: "PATCH"
            }
            fetch(link, option)
                .then(res => res.json())
                .then(data => {
                    buttonFavorite.classList.toggle("active")
                })
        })
    })
}