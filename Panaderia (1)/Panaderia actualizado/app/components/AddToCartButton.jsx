"use client"
import React, { useState } from 'react'

export default function AddToCartButton({ userId, productoId, cantidad = 1 }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/carrito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productoId, cantidad })
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Error agregando al carrito')
      alert('Producto agregado al carrito')
    } catch (err) {
      console.error(err)
      alert('Error agregando al carrito')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Agregando...' : 'Agregar al carrito'}
    </button>
  )
}
