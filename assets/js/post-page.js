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