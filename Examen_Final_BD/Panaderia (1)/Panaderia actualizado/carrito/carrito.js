let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
    let producto = carrito.find(item => item.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Mostrar el carrito en pantalla
function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalHTML = document.getElementById("total");

    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.nombre} x${item.cantidad} - S/${(item.precio * item.cantidad).toFixed(2)}
            <button onclick="eliminarDelCarrito(${index})">❌</button>`;
        lista.appendChild(li);
        total += item.precio * item.cantidad;
    });

    totalHTML.textContent = total.toFixed(2);
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Vaciar carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
});

// Cargar carrito al iniciar
actualizarCarrito();

function finalizarCompra() {
    const logueado = localStorage.getItem("logueado") === "true";

    if (!logueado) {
        // Si no está logueado, redirige al login
        window.location.href = "login.html";
        return;
    }

    // Si está logueado, procede a confirmar
    alert("¡Gracias por tu compra! 🛍️");
    window.location.href = "confirmacion.html";
}