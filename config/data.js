let currentCartId = null
let currentUserId = null

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

try {
  const userData = localStorage.getItem('user')
  if (userData !== null) {
    try {
      const parsedData = JSON.parse(userData)
      if (parsedData.userId !== undefined) {
        currentUserId = parsedData.userId
      }
    } catch (error) {
      console.error('Error parsing userId data:', error)
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

export function setCurrentUserId(id) {
  currentUserId = id
  if (id === null) {
    localStorage.removeItem('user')
  } else {
    const userForStorage = {
      userId: id,
    }
    localStorage.setItem('user', JSON.stringify(userForStorage))
  }
}

export function getCurrentCartId() {
  return currentCartId
}

export function getCurrentUserId() {
  return currentUserId
}
