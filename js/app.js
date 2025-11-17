// Esperar a que TODO se cargue
    window.addEventListener('load', () => {
      // Inicializar AOS solo si está disponible
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          once: true
        });
      }
    });

    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
      const dropdownItems = document.querySelectorAll(".dropdown-item[data-page]");
      const content = document.getElementById("content");

      async function loadPage(page) {
        try {
          const response = await fetch(`${window.location.origin}/PostureAlert/semanas/${page}`);
          const html = await response.text();
          content.innerHTML = html;

          if (typeof AOS !== 'undefined') {
            AOS.refreshHard();
          }
          window.scrollTo({ top: 0, behavior: "smooth" });

        } catch (error) {
          console.error("Error al cargar la página:", error);
          content.innerHTML = `
            <div class="text-center py-5 text-light">
              <h2>Error al cargar el contenido 😢</h2>
              <p>No se pudo encontrar el archivo solicitado.</p>
            </div>`;
        }
      }

      dropdownItems.forEach(item => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const page = item.getAttribute("data-page");
          loadPage(page);

          dropdownItems.forEach(i => i.classList.remove("active"));
          item.classList.add("active");
        });
      });
    });