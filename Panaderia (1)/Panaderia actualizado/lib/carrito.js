import { supabase } from './supabaseClient'

/**
 * Inserta un registro en la tabla `carrito`.
 * @param {string} userId - UUID del usuario
 * @param {number} productoId - ID del producto (BIGINT)
 * @param {number} cantidad - cantidad a agregar
 * @returns {Promise<object[]>} fila(s) insertada(s)
 */
export async function addToCarrito(userId, productoId, cantidad) {
  if (!userId) throw new Error('userId es requerido')
  if (!productoId) throw new Error('productoId es requerido')
  const { data, error } = await supabase.from('carrito').insert([
    { user_id: userId, producto_id: productoId, cantidad }
  ])
  if (error) throw error
  return data
}

/**
 * Obtiene el carrito de un usuario y trae información del producto (join)
 * Retorna un arreglo con { id, productoId, nombre, precio, imagen, cantidad, created_at }
 */
export async function getCarrito(userId) {
  if (!userId) throw new Error('userId es requerido')

  const { data, error } = await supabase
    .from('carrito')
    .select(`id, cantidad, producto_id, created_at, productos ( id, nombre, precio, imagen )`)
    .eq('user_id', userId)

  if (error) throw error

  return (data || []).map(item => ({
    id: item.id,
    productoId: item.producto_id,
    cantidad: item.cantidad,
    nombre: item.productos?.nombre ?? null,
    precio: item.productos?.precio ?? null,
    imagen: item.productos?.imagen ?? null,
    created_at: item.created_at
  }))
}
