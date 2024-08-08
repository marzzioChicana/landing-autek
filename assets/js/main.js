/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

   toggle.addEventListener('click', () =>{
       // Add show-menu class to nav menu
       nav.classList.toggle('show-menu')

       // Add show-icon to show and hide the menu icon
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')




let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})


const header = document.querySelector('.header');
let lastScrollY = window.scrollY;
const headerHeight = parseFloat(getComputedStyle(header).height);

// Función para actualizar la visibilidad del header
function updateHeaderVisibility() {
    if (window.scrollY > headerHeight) {
        if (window.scrollY < lastScrollY) {
            // Scroll hacia arriba - mostrar header
            header.classList.add('visible');
        } else {
            // Scroll hacia abajo - ocultar header
            header.classList.remove('visible');
        }
    } else {
        // Si estamos en la posición original, mostrar el header
        header.classList.add('visible');
    }
}

// Escuchar el evento de scroll
window.addEventListener('scroll', () => {
    updateHeaderVisibility();
    lastScrollY = window.scrollY;
});

// Asegúrate de que el header esté visible al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderVisibility();
});



document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const imageWrappers = document.querySelectorAll('.image-wrapper');
    let activeImage = null;
    let isHovered = false;

    galleryContainer.addEventListener('mouseenter', () => {
        isHovered = true;
        updateImageStates();
    });

    galleryContainer.addEventListener('mouseleave', () => {
        isHovered = false;
        activeImage = null;
        updateImageStates();
    });

    imageWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', () => {
            activeImage = wrapper.getAttribute('data-image');
            updateImageStates();
        });
    });

    function updateImageStates() {
        imageWrappers.forEach(wrapper => {
            const image = wrapper.getAttribute('data-image');
            if (image === activeImage) {
                wrapper.classList.add('active');
            } else {
                wrapper.classList.remove('active');
                if (isHovered) {
                    wrapper.classList.add('hovered');
                } else {
                    wrapper.classList.remove('hovered');
                }
            }
        });
    }
});