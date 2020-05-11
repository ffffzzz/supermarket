// import {
//   ADD_COUNTER,
//   ADD_TO_CART
// } from './mutation-types'

export default  {
  addCart(context,payload) {
     return new Promise((resolve,reject) => {
      //1.payload新添加的商品
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })
      //2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter',oldProduct)
        resolve('当前商品数量加一')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('addToCart',payload)
        resolve('添加商品')
      }
    })
  }
}
