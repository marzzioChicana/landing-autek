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
    if (window.location.pathname.endsWith('post-page.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const index = urlParams.get('postIndex');
        if (index !== null) {
            fetch('assets/json/blog.json')
                .then(response => response.json())
                .then(data => {
                    const post = data.posts[index];
                    const postContent = document.getElementById('post-content');
                    const postBody = document.getElementById('post-body');
                    
                    if (postContent) {
                        postContent.innerHTML = `
                            <div class="header-content post-container">
                                <!--=============== BACK TO HOME ===============-->
                                <a href="blog.html" class="back-home">Back To Home</a>

                                <!--=============== POST TITLE ===============-->
                                <h1 class="header-title">${post.title}</h1>

                                <!--=============== POST IMAGE ===============-->
                                <img src="${post.photo}" alt="" class="header-img">
                            </div>
                        `;
                    }

                    if (postBody) {
                        postBody.innerHTML = `
                            <h2 class="sub-heading">${post.subtitle}</h2>
                            <p class="post-text">${post.content}</p>
                        `;
                    }
                })
                .catch(error => console.error('Error cargando el post:', error));
        }
    }
});