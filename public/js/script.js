// Play music in detail song
const aplayer = document.querySelector("#aplayer");

if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);
  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics,
      },
    ],
    autoplay: true,
  });

  const songAvatar = document.querySelector(".song-detail .song-avatar img");

  ap.on("pause", function () {
    songAvatar.style.animationPlayState = "paused";
  });

  ap.on("play", function () {
    songAvatar.style.animationPlayState = "running";
  });

  ap.on("ended", function () {
    const link = `/songs/listen/${dataSong._id}`;

    const option = {
      method: "PATCH",
    };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const span = document.querySelector(
          ".singer-detail .song-action .song-listen span"
        );
        span.innerHTML = `${data.listen} lượt nghe`;
      });
  });
}

// update like in detail song
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    // const isActive = buttonLike.classList.contains("active");

    // const typeLike = isActive ? "disLike" : "like";

    // const link = `/songs/like/${typeLike}/${idSong}`;

    const link = `/songs/like/${idSong}`;

    const option = {
      method: "PATCH",
    };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        if (data.isExist == true) {
          buttonLike.classList.add("active");
        } else {
          buttonLike.classList.remove("active");
        }

        const span = buttonLike.querySelector("span");
        span.innerHTML = `${data.like} lượt thích`;
      });
  });
}

// update favorite in detail song
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite) {
  listButtonFavorite.forEach((buttonFavorite) => {
    buttonFavorite.addEventListener("click", () => {
      const idSong = buttonFavorite.getAttribute("button-favorite");
      const isActive = buttonFavorite.classList.contains("active");

      const typeFavorite = isActive ? "unfavorite" : "favorite";

      const link = `/songs/favorite/${typeFavorite}/${idSong}`;

      const option = {
        method: "PATCH",
      };
      fetch(link, option)
        .then((res) => res.json())
        .then((data) => {
          buttonFavorite.classList.toggle("active");
        });
    });
  });
}

// form search suggest
const formSearch = document.querySelector(".form-search");
if (formSearch) {
  const input = formSearch.querySelector("input[name='keyword']");
  const formSuggest = formSearch.querySelector(".song-suggest");

  input.addEventListener("keyup", () => {
    const keyword = input.value;

    const link = `/search/suggest?keyword=${keyword}`;

    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        const songs = data.songs;
        if (songs.length > 0) {
          formSuggest.classList.add("show");

          const htmls = songs.map((song) => {
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
            `;
          });

          const songList = formSearch.querySelector(".song-list");
          songList.innerHTML = htmls.join("");
        } else {
          formSuggest.classList.remove("show");
        }
      });
  });
  input.addEventListener("blur", () => {
    formSuggest.classList.remove("show");
  });
}

// Function to handle clicks on menu items
const handleMenuItemClick = (event) => {
  const menuItems = document.querySelectorAll(".menu-list--item");
  menuItems.forEach(function (menuItem) {
    menuItem.classList.remove("active");
  });
  event.currentTarget.classList.add("active");

  // Save the active menu item in sessionStorage
  const href = event.currentTarget.getAttribute("data-href");
  sessionStorage.setItem("activeMenuItem", href);
};

// Function to set the active menu item based on sessionStorage
const setActiveMenuItem = () => {
  const activeMenuItem = sessionStorage.getItem("activeMenuItem");
  if (activeMenuItem) {
    const menuItems = document.querySelectorAll(".menu-list--item");
    menuItems.forEach(function (menuItem) {
      const href = menuItem.getAttribute("data-href");
      if (href === activeMenuItem) {
        menuItem.classList.add("active");
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  setActiveMenuItem();

  const menuItems = document.querySelectorAll(".menu-list--item");
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", handleMenuItemClick);
  });
});

// Xử lý loading

const showLoadingOverlay = () => {
  document.getElementById("loadingOverlay").style.display = "flex";
};

const hideLoadingOverlay = () => {
  document.getElementById("loadingOverlay").style.display = "none";
};

window.addEventListener("load", function () {
  const firstLoad = localStorage.getItem("firstLoad");
  hideLoadingOverlay();
  if (!firstLoad) {
    showLoadingOverlay();

    setTimeout(function () {
      hideLoadingOverlay();
      document.querySelector(".container-fluid").style.display = "block";
    }, 3000);

    localStorage.setItem("firstLoad", true);
  }
});


// show bar
function copyMenu() {
  // copy sidebar
  var dptSidebar = document.querySelector('.sidebar');
  var dptPlace = document.querySelector('.off-canvas .departments');
  dptPlace.innerHTML = dptSidebar.innerHTML;
}
copyMenu();

//show mobile menu
const menuButton = document.querySelector('.trigger'),
      closeButton = document.querySelector('.t-close'),
      addClass = document.querySelector('.site');
menuButton.addEventListener('click', function () {
  addClass.classList.toggle('showMenu');
})
closeButton.addEventListener('click', function () {
  addClass.classList.remove('showMenu');
})
