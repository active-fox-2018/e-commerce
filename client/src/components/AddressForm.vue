<template>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <h5 style="text-align:left;border-bottom: 1px solid orange">Shipping Address</h5>
          <form @submit.prevent="showOngkir" style="text-align:left">
            <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Receiver Name</label>
                  <input type="text" class="form-control">
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Phone Number</label>
                  <input type="password" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="inputAddress">Address</label>
                <textarea class="form-control" type="address" cols="30" rows="2"></textarea>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputState">Province</label>
                  <select v-model="provinceId" id="inputState" class="form-control">
                      <option selected disabled>Select Province...</option>
                      <option v-for="data in provinces" :key="data.province_id" :value="data.province_id">{{data.province}}</option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputCity">City</label>
                  <select v-model="cityId" id="inputCity" class="form-control">
                      <option selected disabled>Select City...</option>
                      <option v-for="data in cities" :key="data.city_id" :value="data.city_id">{{data.city_name}}</option>
                  </select>
                </div>
                <div class="form-group col-md-2">
                  <label for="inputZip">Zip</label>
                  <input type="text" class="form-control" id="inputZip">
                </div>
            </div>
              <button type="submit" class="btn btn-primary">Continue to shipping</button>
          </form>
        </div>

        <div v-if="ongkir" class="col-4">
            <h5 style="text-align:left;border-bottom: 1px solid orange">Select Courier</h5>
            <fieldset class="form-group" style="text-align:left">
              <div class="row">
                <div class="col-sm-10">
                  <div class="form-check mb-2">
                    <input v-model="courier" class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="jne">
                    <img src="http://2.bp.blogspot.com/-87Mf0VFF8nI/VKO0akuuHyI/AAAAAAAAA7g/GxdMrLC6HF4/s280/logo%2BJNE.png" alt="" style="width:50px">
                    <label class="form-check-label" for="gridRadios1">
                      JNE
                    </label>
                  </div>
                  <div class="form-check mb-2">
                    <input v-model="courier" class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="tiki">
                    <img src="https://i1.wp.com/tamanhabiban.com/wp-content/uploads/2017/07/logo-tiki.png?fit=1600%2C487&ssl=1" alt="" style="width:50px;">
                    <label class="form-check-label" for="gridRadios2">
                      TIKI
                    </label>
                  </div>
                  <div class="form-check mb-2">
                    <input v-model="courier" class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="pos">
                    <img src="https://upload.wikimedia.org/wikipedia/id/thumb/0/00/Pos-Indonesia.svg/320px-Pos-Indonesia.svg.png" alt="" style="width:50px">
                    <label class="form-check-label" for="gridRadios2">
                      POS
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
            <hr>
            <div v-if="duration">
              <h6>Select Duration</h6>
              <div class="form-group">
                <select v-model="shippingCost" class="form-control">
                  <option v-for="(data, index) in costs" :key="index" :value="data.cost[0].value">{{data.service}} || Rp. {{data.cost[0].value.toLocaleString()}}</option>
                </select>
              </div>
               <!-- Button trigger modal CheckOut -->
                <button type="button" class="buttonCo" data-toggle="modal" data-target="#exampleModal">
                  Check Out
                </button>
                <!-- Button trigger modal CheckOut -->
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import relicApi from '@/api/index'
export default {
  data () {
    return {
      provinces: [],
      cities: [],
      costs: [],
      provinceId: '',
      cityId: '',
      courier: '',
      shippingCost: 0,
      ongkir: false,
      duration: false
    }
  },
  props: ['fetchData'],
  methods: {
    getProvince () {
      relicApi
        .get('/shippings/province')
        .then(({ data }) => {
          this.provinces = data
        }).catch((err) => {
          console.log(err)
        })
    },
    getCity () {
      relicApi
        .get(`/shippings/city/${this.provinceId}`)
        .then(({ data }) => {
          this.cities = data
        }).catch((err) => {
          console.log(err)
        })
    },
    getCost () {
      let data = {
        destination: this.cityId,
        courier: this.courier
      }
      relicApi
        .post('/shippings/cost/', data)
        .then(({ data }) => {
          this.costs = data
        }).catch((err) => {
          console.log(err)
        })
    },
    showOngkir () {
      if (!this.cityId || !this.provinceId) {
        this.ongkir = false
      } else {
        this.ongkir = true
      }
    }
  },
  watch: {
    provinceId () {
      this.getCity()
    },
    courier () {
      this.duration = true
      this.getCost()
    },
    shippingCost () {
      this.$emit('shipping-cost', this.shippingCost)
    }
  },
  created () {
    this.getProvince()
  }
}
</script>

<style>

</style>
