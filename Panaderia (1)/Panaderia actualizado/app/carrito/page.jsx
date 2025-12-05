import React from 'react'
import { getCarrito } from '@/lib/carrito'

export default async function Page({ searchParams }) {
  const userId = searchParams?.userId

  if (!userId) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Carrito</h1>
        <p>Proporcione <code>?userId=&lt;tu-uuid&gt;</code> en la URL para ver el carrito.</p>
      </div>
    )
  }

  const items = await getCarrito(userId)
  const total = items.reduce((s, it) => s + (it.precio || 0) * it.cantidad, 0)

  return (
    <div style={{ padding: 20 }}>
      <h1>Carrito</h1>

      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8 }}>Imagen</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Producto</th>
              <th style={{ textAlign: 'right', padding: 8 }}>Precio</th>
              <th style={{ textAlign: 'right', padding: 8 }}>Cantidad</th>
              <th style={{ textAlign: 'right', padding: 8 }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td style={{ padding: 8 }}>
                  {item.imagen ? <img src={item.imagen} alt={item.nombre} style={{ width: 80, height: 'auto' }} /> : null}
                </td>
                <td style={{ padding: 8 }}>{item.nombre}</td>
                <td style={{ padding: 8, textAlign: 'right' }}>S/{(item.precio ?? 0).toFixed(2)}</td>
                <td style={{ padding: 8, textAlign: 'right' }}>{item.cantidad}</td>
                <td style={{ padding: 8, textAlign: 'right' }}>S/{((item.precio ?? 0) * item.cantidad).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 style={{ marginTop: 16 }}>Total: S/{total.toFixed(2)}</h3>
    </div>
  )
}
