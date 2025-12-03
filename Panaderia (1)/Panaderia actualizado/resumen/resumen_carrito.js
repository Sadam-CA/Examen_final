// Simulación de datos del carrito
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const impuestos = 0.18;  
const costoEnvio = 5.00;  

let metodoEntregaSeleccionado = "delivery"; // Valor inicial por defecto

function mostrarCarrito() {
    const tablaCarrito = document.getElementById("tabla-carrito").getElementsByTagName('tbody')[0];
    tablaCarrito.innerHTML = ""; // ← limpia la tabla antes de agregar productos

    let subtotal = 0;

    carrito.forEach(producto => {
        const row = tablaCarrito.insertRow();
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>S/${(producto.precio * producto.cantidad).toFixed(2)}</td>
        `;
        subtotal += producto.precio * producto.cantidad;
    });

    actualizarTotales(subtotal);
}

function actualizarTotales(subtotal) {
    const envioAplicado = (metodoEntregaSeleccionado === "delivery") ? costoEnvio : 0;
    const totalConTodo = subtotal + (subtotal * impuestos) + envioAplicado;

    document.getElementById("total-carrito").innerHTML = `Total: S/${totalConTodo.toFixed(2)}`;
    document.getElementById("impuestos").textContent = `Impuestos (18%): S/${(subtotal * impuestos).toFixed(2)}`;
    document.getElementById("envio").textContent = `Costo de envío: S/${envioAplicado.toFixed(2)}`;
}

// Función para finalizar compra
function finalizarCompra() {
    const metodoEntrega = document.getElementById("metodo-entrega").value;
    const metodoPago = document.getElementById("metodo-pago").value;
    const direccion = document.getElementById("direccion").value;
    const sucursal = document.getElementById("sucursal").value;

    if (metodoEntrega === "delivery" && !direccion.trim()) {
        alert("Por favor, ingresa tu dirección de entrega.");
        return;
    }
    if (metodoEntrega === "recoger" && !sucursal) {
        alert("Por favor, selecciona una sucursal para recoger.");
        return;
    }
    if (!metodoPago) {
        alert("Por favor, selecciona un método de pago.");
        return;
    }

    // Guardar datos necesarios para la próxima página
    const datosCompra = {
        metodoEntrega,
        metodoPago,
        direccion,
        sucursal,
        carrito,
        total: calcularTotal()
    };
    localStorage.setItem("datosCompra", JSON.stringify(datosCompra));

    // Redirigir a la página Entrega.html
    window.location.href = "Entrega.html";
}

function calcularTotal() {
    let subtotal = 0;
    carrito.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
    });

    const envioAplicado = (metodoEntregaSeleccionado === "delivery") ? costoEnvio : 0;
    return subtotal + (subtotal * impuestos) + envioAplicado;
}

// Mostrar Delivery por defecto
document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
    document.getElementById("direccion-container").style.display = "block";
    document.getElementById("sucursal-container").style.display = "none";

    const metodoEntregaElement = document.getElementById("metodo-entrega");
    metodoEntregaElement.addEventListener("change", function() {
        metodoEntregaSeleccionado = this.value; // Actualiza la variable global
        if (this.value === "delivery") {
            document.getElementById("direccion-container").style.display = "block";
            document.getElementById("sucursal-container").style.display = "none";
        } else {
            document.getElementById("direccion-container").style.display = "none";
            document.getElementById("sucursal-container").style.display = "block";
        }
        mostrarCarrito(); // Refresca totales cuando cambia el método
    });
});