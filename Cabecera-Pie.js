window.onload = function () {
    // Cargar encabezado
    fetch('Cabecera.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            setupMenu(); // Llamar a la función para inicializar el menú
            setupLinks(); // Llamar a la función para actualizar los enlaces dinámicos
        })
        .catch(error => console.error('Error al cargar el encabezado:', error));

    // Cargar pie de página
    fetch('Pie.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => console.error('Error al cargar el pie de página:', error));

    // Configurar la carga dinámica de contenido
    setupLinks();
};

document.addEventListener("DOMContentLoaded", function () {
    setupMenu();
});

// Función para manejar la visibilidad del menú hamburguesa
function setupMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (!menuToggle || !menu) {
        console.error("No se encontró el menú o el botón de menú.");
        return;
    }

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("show");
    });

    // Cerrar el menú si se hace clic fuera
    document.addEventListener("click", function (event) {
        if (!event.target.closest("#menu") && !event.target.closest("#menu-toggle")) {
            menu.classList.remove("show");
        }
    });
}



// Función para manejar los enlaces dinámicos sin recargar la página
function setupLinks() {
    document.querySelectorAll('a').forEach(link => {
        if (!link.hasAttribute('target') || link.getAttribute('target') !== '_blank') {
            link.addEventListener('click', function (event) {
                event.preventDefault(); // Evita que el navegador recargue la página
                
                const url = this.getAttribute('href'); // Obtener la URL del enlace
                if (url !== '#') {
                    loadContent(url); // Cargar solo el contenido dinámico
                    history.pushState(null, '', url); // Actualizar la URL sin recargar
                }
            });
        }
    });
}

// Función para cargar contenido sin recargar la barra de navegación
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data; // Reemplazar el contenido
        })
        .catch(error => console.error('Error al cargar la página:', error));
}

// Manejar la navegación del historial del navegador
window.onpopstate = function () {
    loadContent(location.pathname);
};

// Lógica para el carrusel
let currentIndex = 0;

function movecarrucel(direction) {
    const items = document.querySelectorAll('.carrucel-item');
    const totalItems = items.length;
    const carrucelInner = document.querySelector('.carrucel-inner');

    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    const newTransformValue = -currentIndex * 100;
    carrucelInner.style.transform = `translateX(${newTransformValue}%)`;
}
