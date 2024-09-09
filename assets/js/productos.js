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
const home = document.querySelector('.home');
let lastScrollY = window.scrollY;
const homeHeight = (parseFloat(getComputedStyle(home).height)) * 0.9;

// Función para actualizar la visibilidad del header
document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de que el header esté visible al cargar la página
    header.classList.add('visible');
    updateHeaderVisibility(); // Para asegurar el estado correcto al cargar
});

function updateHeaderVisibility() {
    if (window.scrollY > homeHeight) {
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
    async function loadPosts() {
        try {
            const response = await fetch('assets/json/productos.json');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            const postsContainer = document.getElementById('posts-container');

            if (!postsContainer) {
                throw new Error('Contenedor de posts no encontrado');
            }

            postsContainer.innerHTML = '';

            data.productos.forEach((producto, index) => {
                const postHTML = `
                    <div class="post-box ${producto.type.toLowerCase()}">
                        <img src="${producto.photo}" alt="" class="post-img">
                        <h2 class="category">${producto.type}</h2>
                        <a href="producto.html?postIndex=${index}" class="post-title">${producto.title}</a>
                        <p class="post-description">${producto.content}</p>
                    </div>
                `;

                postsContainer.innerHTML += postHTML;
            });

        } catch (error) {
            console.error('Error cargando los posts:', error);
        }
    }

    loadPosts();
});


// Filter Js
$(document).ready(function(){
    $('.filter-item').click(function(){
        const value = $(this).attr('data-filter');

        if(value == 'todos') {
            $('.post-box').show('1000')
        }  else {
            $('.post-box').not('.' + value).hide('1000')
            $('.post-box').filter('.' + value).show('1000')
        }
    })
});

// Add active to btn
$('.filter-item').click(function(){
    $(this).addClass('active-filter').siblings().removeClass('active-filter');
});