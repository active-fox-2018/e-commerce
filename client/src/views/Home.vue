<template>
  <div id="home">
    <div id="banner-product" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="@/assets/asus.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="@/assets/msi.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="@/assets/razer.jpg" alt="Third slide">
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#banner-product"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#banner-product"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.carousel-item img {
  height: 75vh;
  min-height: 300px;
  background: no-repeat center center scroll;
  background-size: cover;
}
</style>
