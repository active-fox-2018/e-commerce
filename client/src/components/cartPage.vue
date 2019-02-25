<template>
  <div
    class="modal fade"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">{{selectedProduct.name}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card" style="width: 90%">
            <div class="card-header" style="background-color:red;">product preview</div>
            <img class="card-img-top" :src="selectedProduct.image" alt="Card image cap">
            <p class="card-text">stock(s) : {{selectedProduct.stock}}</p>
            <label>quantity</label>
            <input type="text" v-model="quantity">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="addToCart"
            data-dismiss="modal"
          >add To Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      quantity: 0
    };
  },
  props: ["selected-product"],
  computed : {
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  methods: {
    addToCart() {
      if (this.isLogin == false) {
        swal("you must login first");
      } else if(this.quantity === 0){
        swal('please input quantity of your order')
      }else {
        if (this.selectedProduct.stock < this.quantity) {
          swal("opss, your request bigger than our stock");
        } else {
          this.$store.commit("addToCart", {
            item: this.selectedProduct,
            quantity: this.quantity
          });
          this.quantity = 0
        }
      }
    }
  }
};
</script>

