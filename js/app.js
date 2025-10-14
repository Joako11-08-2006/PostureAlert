document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link[data-page]");
  const content = document.getElementById("content");

  // Función para cargar una página
  async function loadPage(page) {
    try {
      // Mostrar spinner
    content.innerHTML = 
      <div class="d-flex flex-column align-items-center justify-content-center py-5 text-light">
        <div class="spinner-border text-info mb-3" role="status"></div>
        <p>Cargando contenido...</p>
      </div>;

      const response = await fetch(`semanas/${page}`);
      const html = await response.text();
      content.innerHTML = html;

      // Reiniciar animaciones
      if (window.AOS) AOS.refreshHard();

      // Reaplicar los estilos globales (garantizar CSS cargado)
      const cssLink = document.querySelector("link[href='css/style.css']");
      if (!cssLink) {
        const newLink = document.createElement("link");
        newLink.rel = "stylesheet";
        newLink.href = "css/style.css";
        document.head.appendChild(newLink);
      }

      // Subir al inicio de la página
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

  // Detectar clics en los enlaces del navbar
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      loadPage(page);

      // Marcar enlace activo
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
