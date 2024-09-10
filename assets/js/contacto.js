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

// SEND MAIL
function sendMail() {
    var params = {
        from_name: document.getElementById("from_name").value,
        from_email: "Autek S.A.C.",
        email_id: document.getElementById("email_id").value,
        project: document.getElementById("project").value,
        message: document.getElementById("message").value
    }
    emailjs.send("service_zs7g5yz", "template_n850utv", params).then(function (res) {
        if (res.status == 200) {
            alert("Mensaje enviado correctamente");

            document.getElementById("contact-form").reset();
        } else {
            alert("Ocurrió un error al enviar el mensaje");
        }
    })
}