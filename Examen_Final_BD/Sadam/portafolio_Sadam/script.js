
// Mostrar secciones al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Manejar el formulario de contacto
  const form = document.getElementById("contactForm");
  const mensaje = document.getElementById("mensajeConfirmacion");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío real del formulario
    mensaje.textContent = "El mensaje fue enviado. ¡Gracias por contactarte!";
    mensaje.style.display = "block";
    form.reset(); // Limpia los campos del formulario
  });
});

  // Mostrar imágenes del proyecto al hacer clic
  const links = document.querySelectorAll(".ver-proyecto");

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const proyectoId = this.getAttribute("data-proyecto");
      const galeria = document.getElementById("galeria-" + proyectoId);
      
      if (galeria.style.display === "none") {
        galeria.style.display = "block";
        this.textContent = "Ocultar imágenes";
      } else {
        galeria.style.display = "none";
        this.textContent = "Ver proyecto";
      }
    });
  });
  
