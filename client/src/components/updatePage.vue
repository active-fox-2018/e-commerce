<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModalLong"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLongTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">


          <form method="post" v-on:submit.prevent="updateProduct" enctype="multipart/form-data">
            <div class="form-group row">
              <label for="colFormLabel" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="colFormLabel"
                  placeholder="new task"
                  v-model="selectedProduct.name"
                >
              </div>
            </div>
            <div class="form-group row">
              <label for="colFormLabel" class="col-sm-2 col-form-label">Description</label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="colFormLabel"
                  placeholder="description"
                  v-model="selectedProduct.description"
                >
              </div>
            </div>
            <div class="form-group row">
              <label for="colFormLabel" class="col-sm-2 col-form-label">Price</label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="colFormLabel"
                  placeholder="price"
                  v-model="selectedProduct.price"
                >
              </div>
            </div>
            <div class="form-group row">
              <label for="colFormLabel" class="col-sm-2 col-form-label">Stock</label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="colFormLabel"
                  placeholder="stock"
                  v-model="selectedProduct.stock"
                >
              </div>
            </div>
            <div class="form-group row">
              <label for="colFormLabel" class="col-sm-2 col-form-label">Image</label>
              <div class="col-sm-10">
                <input
                  type="file"
                  class="form-control"
                  id="colFormLabel"
                  placeholder="image"
                  @change="getUrl"
                >
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/server'
export default {
  name: "update",
  data () {
    return {
      image : ''
    }
  },
  props: ["selected-product"],
  methods : {
    getUrl(e) {
      this.image = e.target.files[0]
    },
    updateProduct() {
      let obj = {
        name : this.selectedProduct.name,
        description : this.selectedProduct.description,
        stock : this.selectedProduct.stock,
        price : this.selectedProduct.price,
        image : this.selectedProduct.image
      }
      let formData = new FormData
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(obj))

      axios
            .patch(`/product/${this.selectedProduct._id}`,formData, { headers : {
              token : localStorage.getItem('token')
            }})
            .then(({data}) => {
              this.$store.commit('updateProduct', data)
              // console.log(data);          
            })
            .catch(err => {
              swal(err)
              console.log(err);            
            })

      // console.log(formData, "==inside updaet page");
      
      // this.$store.dispatch('updateProduct', {id : this.selectedProduct._id, formData: formData})
    }
  }
};
</script>

