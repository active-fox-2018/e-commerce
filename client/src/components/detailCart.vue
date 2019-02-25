<template>
  <div
    class="modal fade"
    id="exampleModalCenter2"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Your Shopping Cart</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">product name</th>
                <th scope="col">price</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody v-for="item, index in allItem">
              <tr>
                <td>{{index+=1}}</td>
                <td>{{item.name}}</td>
                <td>Rp. {{Number(item.price).toLocaleString()}}</td>
                <td>
                  <button type="submit" @click="removeItem(index)">cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p>total : Rp. {{invoice}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="checkout" data-dismiss="modal">checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/server'
export default {
  name: "cartDetail",
  data() {
    return {};
  },
  computed: {
    invoice() {
      var sum = this.allItem.reduce(function(accumulator, currentValue) {
        return accumulator + Number(currentValue.price);
      }, 0);
      return sum.toLocaleString();
    },
    allItem() {
      return this.$store.state.activeCart;
    }
  },
  methods: {
    removeItem(index) {      
       return this.allItem.splice(index-1,1);
    },
    checkout() {
     
          let data = []
          this.allItem.forEach(element => {
            data.push(element._id)
          })
          axios
            .patch(`/carts/${this.$store.state.userCartId}`, data, { headers : {
              token : localStorage.getItem('token')
            }})
            .then(data => {
              let self = this
              this.$store.commit('checkout')
            })
            .catch(err => {
              console.log(err,"===didalam checkout");         
            })
        
    }
  }
};
</script>

