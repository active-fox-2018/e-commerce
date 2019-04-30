<template>
  <article class="media order shadow">
    <figure class="media-left">
        <i class="fas fa-box"></i>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>Transaction by {{ transaction.userId.name }} </strong>
          <br>
          <small>Jakarta - Bekasi | Tracking ID:
            <strong>{{ transaction._id }}</strong>
          </small>
        </p>
      </div>
    <div class="content">
      <div class="tags has-addons">
        <span class="tag is-light">Status:</span>
        <span class="tag is-success">{{ theTransaction.status }}</span>
        
      </div>
      <div class="tags">
        <a @click.prevent="changeStatus('arrived')"><span class="tag is-warning" v-if="checkTransaction">has arrived to you yet ?</span></a>
        <a @click.prevent="changeStatus('shipping')"><span class="tag is-link" v-if="isShipping">ready to ship?</span></a>
      </div>
    </div>
    </div>

  </article>
</template>

<script>
import api from '@/api/e-commerce'
export default {
  props: ['transaction', 'index'],
  methods: {
    changeStatus(value) {
        api({
            method: 'put',
            url: `/transactions/${this.transaction._id}`,
            headers: { token: localStorage.getItem('token')},
            data: { status: value },
        })
            .then(({ data }) => {
                console.log(data)
                if(value === 'shipping') {
                    this.$store.commit('shippingStatus', this.index);
                } else if(value === 'arrived') {
                    this.$store.commit('arriveStatus', this.index)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
  },
  computed: {
    checkTransaction() {
      return this.$route.path === '/carts' && this.theTransaction.status === 'shipping'
    },
    isShipping() {
        // console.log(this.transaction.status, this.$route.path)
      return this.$route.path === '/admin/transactions' && this.theTransaction.status === 'ready'
    },
    theTransaction() {
        return this.transaction
    },
  }
}
</script>

<style>

</style>
