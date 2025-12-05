// carrito guardado en localStorage (solo local)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Fallback local de productos (id, nombre, precio, imagen)
const productFallback = {
  1: { nombre: 'Pan francés', precio: 2.00, imagen: '../img/img (2).jpg' },
  2: { nombre: 'Empanadas de pollo', precio: 5.00, imagen: '../img/img3.jpg' },
  3: { nombre: 'Bizcochos de vainilla', precio: 3.50, imagen: '../img/img4.jpg' },
  4: { nombre: 'Pastel de chocolate', precio: 6.00, imagen: '../img/img5.jpg' },
  5: { nombre: 'Pay de manzana', precio: 4.50, imagen: '../img/img6.jpg' },
  6: { nombre: 'Queque de zanahoria', precio: 5.00, imagen: '../img/que.jpeg' }
}

const nameToIdFallback = Object.fromEntries(Object.entries(productFallback).map(([id,p]) => [p.nombre, Number(id)]))

// Agrega por productoId (solo local)
function agregarAlCarritoById(productoId, cantidad = 1) {
  console.log('agregarAlCarritoById local llamado', { productoId, cantidad })
  // Actualizar carrito local (buscando por productoId)
  let producto = carrito.find(item => item.productoId === productoId)
  if (producto) {
    producto.cantidad += cantidad
  } else {
    const info = productFallback[productoId] || { nombre: null, precio: null, imagen: null }
    carrito.push({ productoId, cantidad, nombre: info.nombre, precio: info.precio, imagen: info.imagen })
  }

  localStorage.setItem('carrito', JSON.stringify(carrito))
  actualizarCarrito()
  mostrarToast('Producto agregado al carrito')
  return { success: true }
}

// Compatibilidad por nombre: usar solo fallback local
function agregarAlCarrito(nombreOrProductoId, cantidadOrPrice, precioArg) {
  const posibleId = Number(nombreOrProductoId)
  if (!isNaN(posibleId) && posibleId > 0) {
    return agregarAlCarritoById(posibleId, Number(cantidadOrPrice) || 1)
  }

  const nombre = nombreOrProductoId
  const cantidad = (precioArg === undefined) ? 1 : cantidadOrPrice

  const fallbackId = nameToIdFallback[nombre]
  if (fallbackId) {
    return agregarAlCarritoById(fallbackId, Number(cantidad) || 1)
  }

  const msg = 'No se encontró el producto por nombre. Usa el productoId en su lugar.'
  console.error(msg)
  alert('No fue posible agregar el producto: ' + msg)
  return { error: new Error(msg) }
}

// Exponer funciones en window para onclick inline
window.agregarAlCarrito = agregarAlCarrito
window.agregarAlCarritoById = agregarAlCarritoById

// Función sencilla para mostrar toasts temporales
function mostrarToast(mensaje, duracion = 2000) {
  let toast = document.getElementById('toast-message')
  if (!toast) {
    toast = document.createElement('div')
    toast.id = 'toast-message'
    toast.style.position = 'fixed'
    toast.style.right = '16px'
    toast.style.bottom = '16px'
    toast.style.background = 'rgba(0,0,0,0.75)'
    toast.style.color = '#fff'
    toast.style.padding = '10px 14px'
    toast.style.borderRadius = '6px'
    toast.style.zIndex = 9999
    toast.style.fontSize = '14px'
    document.body.appendChild(toast)
  }
  toast.textContent = mensaje
  toast.style.opacity = '1'
  setTimeout(() => {
    if (toast) toast.style.opacity = '0'
  }, duracion)
}

// Mostrar el carrito en pantalla
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalHTML = document.getElementById("total");
  if (!lista || !totalHTML) return

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const nombre = item.nombre || (productFallback[item.productoId] && productFallback[item.productoId].nombre) || 'Producto'
    const precio = Number(item.precio ?? (productFallback[item.productoId] && productFallback[item.productoId].precio) ?? 0)
    const imagen = item.imagen || (productFallback[item.productoId] && productFallback[item.productoId].imagen) || null

    const li = document.createElement("li");
    const subtotal = (precio * (item.cantidad || 0))
    li.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        ${imagen ? `<img src="${imagen}" alt="${nombre}" style="width:48px;height:auto;">` : ''}
        <div>
          <strong>${nombre}</strong><br>
          S/${precio.toFixed(2)} x ${item.cantidad}
        </div>
        <div style="margin-left:auto;">S/${subtotal.toFixed(2)} <button onclick="eliminarDelCarrito(${index})">❌</button></div>
      </div>`;
    lista.appendChild(li);
    total += subtotal;
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
const vaciarBtn = document.getElementById("vaciar-carrito")
if (vaciarBtn) {
  vaciarBtn.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
  })
}

// Cargar carrito al iniciar
actualizarCarrito();

function finalizarCompra() {
  const logueado = localStorage.getItem("logueado") === "true";

  if (!logueado) {
    window.location.href = "../login/login.html";
    return;
  }

  alert("¡Gracias por tu compra! 🛍️");
  window.location.href = "../principal/principal.html";
}

window.finalizarCompra = finalizarCompra
