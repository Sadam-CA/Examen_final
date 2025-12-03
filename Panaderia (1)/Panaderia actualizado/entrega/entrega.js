document.addEventListener('DOMContentLoaded', function () {
    const resumenCompra = document.getElementById('resumen-compra');

    const datosCompra = JSON.parse(localStorage.getItem('datosCompra'));

    if (!datosCompra) {
        resumenCompra.innerHTML = "No se encontraron datos de la compra.";
        return;
    }

    const { metodoEntrega, direccion, sucursal, metodoPago, total } = datosCompra;
    const costoEnvio = 5.00;
    const totalFinal = metodoEntrega === "delivery" ? (total + costoEnvio) : total;

    // Creamos código de seguimiento aleatorio
    const codigoSeguimiento = 'DEL-' + Math.floor(100000 + Math.random() * 900000);

    let resumenTexto = `
        <h3>Resumen de tu compra:</h3>
        <ul style="text-align: left;">
            <li><strong>Método de entrega:</strong> ${metodoEntrega === "delivery" ? "Delivery" : "Recoger en tienda"}</li>
            ${metodoEntrega === "delivery" ? `<li><strong>Dirección de envío:</strong> ${direccion}</li>` : `<li><strong>Sucursal de recojo:</strong> ${sucursal}</li>`}
            ${metodoEntrega === "delivery" ? `<li><strong>Costo de envío:</strong> S/${costoEnvio.toFixed(2)}</li>` : ''}
            <li><strong>Método de pago:</strong> ${metodoPago}</li>
            <li><strong>Total Pagado:</strong> S/${totalFinal.toFixed(2)}</li>
        </ul>

        <h3>Proceso de Entrega del Pedido:</h3>
        <ul style="text-align: left; list-style: none; padding-left: 0;">
            <li>✅ Se genera la orden en el sistema interno.</li>
            <li>✅ El producto es preparado en cocina/pastelería.</li>
            <li>✅ Se empaqueta con identificación.</li>
            <li>✅ 
                ${metodoEntrega === "delivery" 
                    ? `Delivery asignado. Tu número de seguimiento es: <strong>${codigoSeguimiento}</strong>.`
                    : `Podrás recoger tu pedido en tienda en aproximadamente <strong>2 horas</strong>.`}
            </li>
        </ul>

        <h3>¿Quieres revisar el estado de tu pedido?</h3>
        <input type="email" id="correo-revision" placeholder="Ingresa tu correo" style="padding: 10px; width: 80%; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px;">
        <br>
        <button id="btn-revisar" style="padding: 10px 20px; background-color: #8B4513; color: white; border: none; border-radius: 5px; cursor: pointer;">Revisar</button>
    `;

    resumenCompra.innerHTML = resumenTexto;

    // Acción del botón revisar
    const botonRevisar = document.getElementById('btn-revisar');
    botonRevisar.addEventListener('click', function() {
        const correo = document.getElementById('correo-revision').value;
        if (correo) {
            alert(`Se enviará información de tu pedido a: ${correo}`);
        } else {
            alert('Por favor ingresa un correo válido.');
        }
    });
});