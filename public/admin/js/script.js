// upload image preview
const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")

    uploadImageInput.addEventListener("change" , (e) => {
        const file = e.target.files[0]
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}

// upload image preview
const uploadAudio = document.querySelector("[upload-audio]")
if (uploadAudio) {
    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]")
    const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]")
    const source = uploadAudio.querySelector("source")

    uploadAudioInput.addEventListener("change" , (e) => {
        if ( e.target.files.length) {
            const audio = URL.createObjectURL(e.target.files[0])
            source.src = audio
            uploadAudioPlay.load()
        }
    })
}

// Function to handle clicks on menu items
function handleMenuItemClick(event) {
    var menuItems = document.querySelectorAll('.menu-list--item');
    menuItems.forEach(function (menuItem) {
        menuItem.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
  
    // Save the active menu item in sessionStorage
    var href = event.currentTarget.getAttribute('data-href');
    sessionStorage.setItem('activeMenuItem', href);
  }
  
  // Function to set the active menu item based on sessionStorage
  function setActiveMenuItem() {
    var activeMenuItem = sessionStorage.getItem('activeMenuItem');
    if (activeMenuItem) {
        var menuItems = document.querySelectorAll('.menu-list--item');
        menuItems.forEach(function (menuItem) {
            var href = menuItem.getAttribute('data-href');
            if (href === activeMenuItem) {
                menuItem.classList.add('active');
            }
        });
    }
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    // Set active menu item on page load
    setActiveMenuItem();
  
    // Add click event listener to menu items
    var menuItems = document.querySelectorAll('.menu-list--item');
    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', handleMenuItemClick);
    });
  });
  
  // pagination

const btnsPagination = document.querySelectorAll("[button-pagination]")
if (btnsPagination.length > 0) {
    let url = new URL(window.location.href)

    btnsPagination.forEach((btn) => {
        btn.addEventListener("click", () => {
            const page = btn.getAttribute("button-pagination")
             if(page) {
                url.searchParams.set("page", page)
             }else {
                url.searchParams.delete("page")
             }
             window.location.href = url.href
        })
    })
}

// change status

const btnChangeStatus = document.querySelectorAll("[button-change-status]")
if (btnChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    btnChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")

            let statusChange = statusCurrent == "active" ? "inactive" : "active"

            const action = path + `/${statusChange}/${id}?_method=PATCH`
            formChangeStatus.action = action

            formChangeStatus.submit();
        })
    })
}


// delete item
const btnsDelete = document.querySelectorAll("[button-delete]")
if(btnsDelete) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path")
    
    btnsDelete.forEach(btn => {
        btn.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xoá!")
            if(isConfirm) {
                const id = btn.getAttribute("data-id")
                const action = `${path}/${id}?_method=DELETE`
                formDeleteItem.action = action
                formDeleteItem.submit()
            }
        })
    })
}
