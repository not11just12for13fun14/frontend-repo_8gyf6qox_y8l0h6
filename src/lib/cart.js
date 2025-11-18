const KEY = 'cart.v1'

export function getCart() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function setCart(items) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(KEY, JSON.stringify(items))
  window.dispatchEvent(new StorageEvent('storage', { key: KEY }))
}

export function addToCart(item) {
  const arr = getCart()
  const idx = arr.findIndex(i => i.product === item.product && (i.customText || '') === (item.customText || ''))
  if (idx >= 0) {
    arr[idx].qty = Math.min(10, (arr[idx].qty || 1) + (item.qty || 1))
    arr[idx].images = item.images?.length ? item.images : arr[idx].images
  } else {
    arr.push(item)
  }
  setCart(arr)
}

export function subtotal(items) {
  return items.reduce((sum, i) => sum + (Number(i.price) || 0) * (i.qty || 1), 0)
}
