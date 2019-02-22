<template>
  <div class="row">
    <div class="col">
      <h1>Cart</h1>
      <div class="row">
        <div class="col-6">Product name</div>
        <div class="col">Amount</div>
        <div class="col">Price</div>
        <div class="col">Total</div>
        <div class="col">Action</div>
      </div>
      <div class="row" v-for="(item,index) in cartData" :key="index">
        <div class="col-6">{{item.product.name}}</div>
        <div class="col">{{item.amount}}</div>
        <div class="col">{{item.product.price}}</div>
        <div class="col">{{item.product.price*item.amount}}</div>
        <div class="col">
          <button class="btn btn-primary" @click="removeFromCart(item._id)">Remove</button>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <button class="btn btn-primary" @click="checkout()">Checkout</button>
        </div>
        <div class="col"></div>
        <div class="col">Subtotal :</div>
        <div class="col">{{subtotal}}</div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["productData", "cartData"],
  computed: {
    subtotal() {
      return this.cartData.reduce((a, b) => a + b.product.price * b.amount, 0);
    }
  },
  created() {
    this.$emit("get-products", null);
    this.$emit("get-carts", null);
  },
  methods: {
    async removeFromCart(cartId) {
      try {
        let cartItem = await axios({
          method: "DELETE",
          baseURL,
          url: "/api/carts/" + cartId,
          headers: { token }
        });
        this.$emit("get-carts", null);
      } catch (err) {
        this.$emit("display-error", err);
      }
    },
    async checkout() {
      try {
        let checkoutItem = await axios({
          method: "POST",
          baseURL,
          url: "/api/transactions/checkout",
          headers: { token }
        });
        this.$emit("get-carts", null);
        this.$router.push({ path: `/transactions`})
      } catch (err) {
        this.$emit("display-error", err);
      }
    }
  }
};
</script>
