
function getTotalPrice(cart) {
  console.log(cart)
  let total = null
  cart.items.forEach(item => {
    total += item.item.price * item.quantity
  })
  return total
}

module.exports = getTotalPrice