<template>
  <div>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <router-link class="nav-link" style="text-decoration:none" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" style="text-decoration:none" to="/products">Products</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" style="text-decoration:none" to="/account">My Account</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" style="text-decoration:none" to="/">
          <i class="fas fa-shopping-cart"></i>
        </router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style>
</style>
