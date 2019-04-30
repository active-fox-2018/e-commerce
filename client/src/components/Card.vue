<template>
    <div class="column is-12-mobile is-one-third-tablet is-one-quarter-desktop">
      <div class="card products">
        <div class="card-image">
          <div class="crop">
            <!-- <figure class="image"> -->
              <img :src="product.image" alt="Placeholder image">
            <!-- </figure> -->
          </div>
        </div>
        <div class="card-content" style="line-height:30px !important;">
          <p class="title is-6">{{ product.title }}</p>
        </div>
        <p class="card-footer-item is-pulled-left has-text-danger">
          <span>
            {{ thePrice(product.price) }}
          </span>
        </p>
        <footer class="card-footer">
          <p class="card-footer-item has-text-grey-dark">
            <a @click.prevent="$router.push(`/products/${product._id}`)"><span>
            Shop Now
            </span></a>
          </p>
        </footer>
      </div>
    </div>
</template>

<script>
import getPrice from '@/helpers/getPrice';

export default {
  props: ['product'],
  methods: {
    thePrice(price) {
      return getPrice(price);
    },
  },
};
</script>

<style>
div.card.products{
  transition: all 0.5s;
}

div.card.products:hover {
  transform: scale(1.05);
  border: 1px solid purple;
}

/* @media only screen and (max-width: 767px) {
  .crop img {
    display: block;
    margin: auto;
  }
} */

@media (min-width: 768px) {

}
.crop {
  /* width: 312px; */
  /* height: 173.75px; */
  overflow-y: hidden;
  overflow-x: hidden;
}

/* .crop img {
  margin: -15px -5px;
} */

</style>
