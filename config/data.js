let currentCartId = null

try {
  const cartIdData = localStorage.getItem('currentCartId')
  if (cartIdData !== null) {
    try {
      const parsedData = JSON.parse(cartIdData)
      if (parsedData.cartId !== undefined) {
        currentCartId = parsedData.cartId
      }
    } catch (error) {
      console.error('Error parsing cartId data:', error)
    }
  }
} catch (ignore) {}

export function setCurrentCartId(id) {
  currentCartId = id
  if (id === null) {
    localStorage.removeItem('currentCartId')
  } else {
    const cartForStorage = {
      cartId: id,
    }
    localStorage.setItem('currentCartId', JSON.stringify(cartForStorage))
  }
}

export function getCurrentCartId() {
  return currentCartId
}
