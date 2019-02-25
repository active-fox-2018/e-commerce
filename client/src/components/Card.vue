<template>
  <v-hover>
    <v-card slot-scope="{ hover }">
      <v-img :src="product.image" aspect-ratio="1">
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out grey lighten-1 v-card--reveal display-3 white--text display-1"
              style="height: 100%;"
            >
              see details
            </div>
          </v-expand-transition>
      </v-img>

      <v-card-text class="px-1 py-1">
        <span class="font-weight-medium">
          {{product.name}}
        </span><br>
        <span class="red--text font-weight-bold">
          IDR. {{product.price.toLocaleString()}}
        </span>
      </v-card-text>

    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: [
    "product"
  ],
  data() {
    return {

    }
  },
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>
