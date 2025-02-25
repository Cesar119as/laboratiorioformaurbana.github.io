window.onload = function () {
    // Cargar encabezado
    fetch('Cabecera.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            setupMenu(); // Inicializa el menú
            setupLinks(); // Enlaces dinámicos
        })
        .catch(error => console.error('Error al cargar el encabezado:', error));

    // Cargar pie de página
    fetch('Pie.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => console.error('Error al cargar el pie de página:', error));

    setupLinks();
};

// Manejar la visibilidad del menú hamburguesa
function setupMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (!menuToggle || !menu) {
        console.error("No se encontró el menú o el botón de menú.");
        return;
    }

// Manejo de submenú: Mostrar/ocultar submenú al hacer clic
const menuItems = menu.querySelectorAll('li');
menuItems.forEach(item => {
    const submenu = item.querySelector('ul.submenu');
          if (submenu) {
              item.addEventListener('click', function (event) {
                  event.stopPropagation(); // Evitar que el clic se propague
                  submenu.classList.toggle('show');
              });
          }
      });

    // Abrir/cerrar el menú
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("show");
    });

    // Cerrar el menú cuando se haga clic en un enlace, excepto en "Mapas"
    const menuLinks = menu.querySelectorAll('a'); // Seleccionar todos los enlaces dentro del menú
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            // Verificar si el enlace clicado no es "Mapas"
            if (link.textContent !== "Mapas") {
                menu.classList.remove("show"); // Cerrar el menú solo si no es "Mapas"
            }
        });
    });
    submenu.addEventListener('mouseleave', () => {
                submenu.classList.remove('show');
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
                event.preventDefault(); 
                
                const url = this.getAttribute('href'); 
                if (url !== '#') {
                    loadContent(url); 
                    history.pushState(null, '', url); 
                }
            });
        }
    });
}

// Cargar contenido sin recargar la barra de navegación
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data; 
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




