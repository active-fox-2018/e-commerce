<template>
  <div class="row">
    <div class="col">
      <h1>Products</h1>
      <div class="d-flex flex-wrap justify-content-around">
        <div
          class="card"
          style="width: 17rem;"
          v-for="(product, index) in productData"
          :key="index"
        >
          <img class="card-img-top" :src="product.fileUrl">
          <div class="card-body">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">{{product.description}}</p>
            <p class="card-text">Price : {{product.price}}</p>
            <div v-if="!cartData.map(e=>e.product._id).includes(product._id)">
              <button
                class="btn btn-primary"
                @click="addToCart(product._id,itemAmounts[index])"
              >Add to cart</button>
              <div>
                Quantity :
                <input type="number" v-model="itemAmounts[index]">
              </div>
            </div>
            <div v-if="cartData.map(e=>e.product._id).includes(product._id)">
              <button @click="removeFromCart(product._id)" class="btn btn-primary">Remove from cart</button>
              <div>Quantity : {{cartData.filter(e=>e.product._id===product._id)[0].amount}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["productData", "cartData"],
  created() {
    this.$emit("get-products", null);
    this.$emit("get-carts", null);
  },
  data() {
    return {
      itemAmounts: []
    };
  },
  methods: {
    async addToCart(productId, amount) {
      try {
        if (isNaN(amount)) {
          amount = 1;
        }
        let cartItem = await axios({
          baseURL,
          url: "/api/carts",
          method: "POST",
          headers: { token },
          data: {
            productId,
            amount
          }
        });
        this.$emit("get-carts", null);
      } catch (err) {
        this.$emit("display-error", err);
      }
    },
    async removeFromCart(productId) {
      try {
        let cartId = this.cartData.filter(e => e.product._id === productId)[0]
          ._id;
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
    }
  }
};
</script>

