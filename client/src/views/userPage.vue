<template>
  <v-layout
    justify-center
    wrap
  >
   <v-flex
      xs12
      md4
    >
        <v-avatar
          slot="offset"
          class="mx-auto d-block"
          size="130"
        >
          <img
            src="data:image/jpeg;base64,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"
          >
        </v-avatar>
        <v-card-text class="text-xs-center">
          <h6 class="category text-gray font-weight-thin mb-3">{{$store.state.type.toUpperCase()}}</h6>
        </v-card-text>
    </v-flex>
    <v-flex
      xs12
      md8
    >
      <v-form>
        <v-container py-0>
          <v-layout wrap>
            <v-flex
              xs12
              md4
            >
              <v-text-field
                class="purple-input"
                label="Name"
                v-model="name"
              />
            </v-flex>
            <v-flex
              xs12
              md4
            >
              <v-text-field
                label="Email Address"
                class="purple-input"  v-model="email"/>  
            </v-flex>
            <v-flex
              xs12
              text-xs-left
            >
              <v-btn
                class="mx-0 ma-5"
                color="white"
                @click.prevent="update"
              >
                Update Profile
              </v-btn>
              <v-btn
                class="mx-0 ma-5"
                color="white"
                v-if="$store.state.type === 'admin' && $route.path !== '/users/transactions'"
                @click="show = 'transaction'"
              >
              <router-link to="/users/transactions" style="text-decoration:none">
                List Transaction
              </router-link>
              </v-btn>
              <v-btn  v-if="$store.state.type === 'admin' && $route.path === '/users/transactions'"
                class="mx-0 ma-5"
                color="white"
              >
                <router-link to="/users" style="text-decoration:none">
                Close
                </router-link>
              </v-btn>

            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-flex>
    <router-view class="mt-5"/>
  </v-layout>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('getAllData')
  },
  data () {
    return {
      name: this.$store.state.username,
      email: this.$store.state.email,
      show: ''
    }
  },
  methods: {
    update () {
      console.log('====')
    }
  }
}
</script>
