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

    ap.on('ended', function () {
        const link = `/songs/listen/${dataSong._id}`

        const option = {
            method: "PATCH"
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                const span = document.querySelector(".singer-detail .song-action .song-listen span")
                span.innerHTML = `${data.listen} lượt nghe`
            })
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

// form search suggest
const formSearch = document.querySelector(".form-search")
if(formSearch) {
    const input = formSearch.querySelector("input[name='keyword']")
    const formSuggest = formSearch.querySelector(".song-suggest")

    input.addEventListener("keyup", () => {
        const keyword = input.value

        console.log(keyword)
        
        const link = `/search/suggest?keyword=${keyword}`

        fetch(link)
            .then(res => res.json())
            .then(data => {
                const songs = data.songs
                console.log(songs)
                if (songs.length > 0) {
                    formSuggest.classList.add("show")

                    const htmls = songs.map(song => {
                        return `
                            <a class="song-item" href="/songs/detail/${song.slug}">
                                <div class="song-image">
                                    <img src="${song.avatar}" >
                                </div>
                                <div class="song-info">
                                    <div class="song-title">
                                        ${song.title}
                                    </div>
                                    <div class="song-singer">
                                        ${song.infoSinger.fullName}
                                    </div>
                                </div>
                            </a>
                        `
                    })

                    const songList = formSearch.querySelector(".song-list")
                    songList.innerHTML = htmls.join("")
                }else {
                    formSuggest.classList.remove("show")
                }
            })
    })
    input.addEventListener("blur", () => {
        formSuggest.classList.remove("show")
    })
}