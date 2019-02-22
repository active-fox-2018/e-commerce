<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>Admin page</h1>
        <router-link to="/admin/products">
          <button class="btn btn-secondary">Products</button>
        </router-link>
        <router-link to="/admin/transactions">
          <button class="btn btn-secondary">Transactions</button>
        </router-link>
      </div>
    </div>
    <router-view
      :user-name="userName"
      :user-email="userEmail"
      :user-role="userRole"
      :product-data="productData"
      :cart-data="cartData"
      @display-error="$emit('display-error',$event)"
      @get-products="$emit('get-products',$event)"
      @get-carts="$emit('get-carts',$event)"
    ></router-view>
  </div>
</template>

<script>
export default {
  props: ["productData", "cartData", "userRole"]
};
</script>
