/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId),
          navItems = nav.querySelectorAll('a');

    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu');

        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon');
    });

    // Cerrar el menú al hacer clic en una opción
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove show-menu class from nav menu
            nav.classList.remove('show-menu');

            // Remove show-icon to hide the menu icon
            toggle.classList.remove('show-icon');
        });
    });
}

showMenu('nav-toggle','nav-menu');


const header = document.querySelector('.header');
let lastScrollY = window.scrollY;
const headerHeight = parseFloat(getComputedStyle(header).height);

// Función para actualizar la visibilidad del header
document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de que el header esté visible al cargar la página
    header.classList.add('visible');
    updateHeaderVisibility(); // Para asegurar el estado correcto al cargar
});

function updateHeaderVisibility() {
    if (window.scrollY > headerHeight) {
        if (window.scrollY < lastScrollY) {
            // Scroll hacia arriba - mostrar header
            header.classList.remove('hidden');
            header.classList.add('visible');
        } else {
            // Scroll hacia abajo - ocultar header
            header.classList.remove('visible');
            header.classList.add('hidden');
        }
    } else {
        // Si estamos en la posición original, mostrar el header
        header.classList.remove('hidden');
        header.classList.add('visible');
    }
}

// Escuchar el evento de scroll
window.addEventListener('scroll', () => {
    updateHeaderVisibility();
    lastScrollY = window.scrollY;
});



document.addEventListener('DOMContentLoaded', () => {
    // Cargar y mostrar el post seleccionado en post-page.html
    if (window.location.pathname.endsWith('producto.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const index = urlParams.get('postIndex');
        if (index !== null) {
            fetch('assets/json/productos.json')
                .then(response => response.json())
                .then(data => {
                    const producto = data.productos[index];
                    const productoContent = document.getElementById('post-content');
                    const productoBody = document.getElementById('post-body');
                    const productoGallery = document.getElementById('producto-gallery');
                    const productoSection = document.getElementById('producto');
                    
                    if (productoContent) {
                        productoContent.innerHTML = `
                            <div class="header-content post-container">
                                <!--=============== BACK TO HOME ===============-->
                                <a href="productos.html" class="back-home">Back To Home</a>

                                <!--=============== POST TITLE ===============-->
                                <h1 class="header-title">${producto.title}</h1>

                                <!--=============== POST IMAGE ===============-->
                                <img src="${producto.photo}" alt="" class="header-img">
                            </div>
                        `;
                    }

                    if (productoBody) {
                        productoBody.innerHTML = `
                            <h2 class="sub-heading">${producto.subtitle}</h2>
                            <p class="post-text">${producto.content}</p>
                        `;
                    }

                    if (productoGallery && Array.isArray(producto.gallery) && producto.gallery.length > 0) {
                        producto.gallery.forEach(image => {
                            const slide = document.createElement('div');
                            slide.classList.add('swiper-slide', 'producto-slide');
                            slide.innerHTML = `
                                <div class="producto-slide-img">
                                    <img src="${image}" alt="">
                                </div>
                            `;
                            productoGallery.appendChild(slide);
                        });
                        // Mostrar la sección solo si hay contenido
                        if (productoSection) {
                            productoSection.style.display = 'block';

                            new Swiper('.producto-slider', {
                                effect: 'coverflow',
                                grabCursor: true,
                                centeredSlides: true,
                                loop: true,
                                slidesPerView: 'auto',
                                coverflowEffect: {
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 2.5
                                },
                                pagination: {
                                    el: '.swiper-pagination',
                                    clickable: true,
                                },
                                navigation: {
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev'
                                }
                            });
                        }
                    } else {
                        // Ocultar la sección si no hay imágenes
                        if (productoSection) {
                            productoSection.style.display = 'none';
                        }
                    }
                })
                .catch(error => console.error('Error cargando el post:', error));
        }
    }
});



document.addEventListener('DOMContentLoaded', () => {
    // Define URLs base para compartir
    const shareUrls = {
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
        twitter: 'https://twitter.com/intent/tweet?url=',
        linkedin: 'https://www.linkedin.com/shareArticle?mini=true&url=',
        instagram: 'https://www.instagram.com/' // Instagram no soporta compartir enlaces directamente desde el navegador
    };

    // Obtén la URL actual
    const currentUrl = encodeURIComponent(window.location.href); // Codifica la URL para que sea válida en un enlace

    // Configura los enlaces de compartir
    document.getElementById('facebook-share').href = shareUrls.facebook + currentUrl;
    document.getElementById('twitter-share').href = shareUrls.twitter + currentUrl;
    document.getElementById('linkedin-share').href = shareUrls.linkedin + currentUrl;

    document.getElementById('instagram-share').href = 'https://www.instagram.com/yourusername/';
    document.getElementById('instagram-share').addEventListener('click', (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Comparte en Instagram',
            text: 'Copia el enlace y pégalo en un mensaje directo usando la aplicación de Instagram.',
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: "#232323ff",
            customClass: {
                title: 'swal2-title',
                htmlContainer: 'swal2-html-container',
                confirmButton: 'swal2-confirm'
            }
        });
    });
});