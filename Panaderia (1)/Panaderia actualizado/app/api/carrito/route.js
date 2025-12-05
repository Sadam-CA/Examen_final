import { addToCarrito } from '@/lib/carrito'

export async function POST(req) {
  try {
    const { userId, productoId, cantidad } = await req.json()
    if (!userId || !productoId || !cantidad) {
      return new Response(JSON.stringify({ error: 'userId, productoId y cantidad son requeridos' }), { status: 400 })
    }

    const data = await addToCarrito(userId, productoId, cantidad)
    return new Response(JSON.stringify({ success: true, data }), { status: 200 })
  } catch (err) {
    console.error('API /api/carrito error:', err)
    return new Response(JSON.stringify({ error: err.message || 'Error interno' }), { status: 500 })
  }
}
