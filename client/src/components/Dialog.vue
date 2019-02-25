<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="width:450px">
      <q-tabs
        v-model="tab"
        dense
        class="text-white bg-black"
        active-color="white"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="signin" label="Sign In" />
        <q-tab name="signup" label="Sign Up" />
        <q-btn flat round dense icon="close" v-close-dialog @click="$emit('changestatus')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="signin">
          <div class="text-h6">Sign In</div>
          <q-separator></q-separator>
          <br>
          <label>Email</label>
          <q-input rounded outlined v-model="emailSignIn"/>
          <br>
          <label>Password</label>
          <q-input rounded outlined v-model="passwordSignIn" type="password"/>
          <br>
          <q-btn color="white" class="text-black" @click="signInUser()" label="Sign In" />
        </q-tab-panel>

        <q-tab-panel name="signup">
          <div class="text-h6">Sign Up</div>
          <q-separator></q-separator>
          <br>
          <label>Fullname</label>
          <q-input rounded outlined v-model="fullNameSignUp"/>
          <label>Email</label>
          <q-input rounded outlined v-model="emailSignUp"/>
          <br>
          <label>Password</label>
          <q-input rounded outlined v-model="passwordSignUp" type="password"/>
          <br>
          <q-btn color="white" class="text-black" @click="signUpUser()" label="Sign Up" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from 'axios'
let link = 'http://localhost:3000'

export default {
  name: 'Dialog',
  props: ['showDialog'],
  data () {
    return {
      tab: 'signin',
      emailSignIn: '',
      passwordSignIn: '',
      fullNameSignUp: '',
      emailSignUp: '',
      passwordSignUp: ''
    }
  },
  methods: {
    signInUser () {
      axios
        .post(`${link}/users/login`, {email: this.emailSignIn, password: this.passwordSignIn})
        .then(({ data }) => {
          localStorage.setItem('tokenUser', data.token)
          localStorage.setItem('userEmail', this.emailSignIn)
          this.$store.commit('tokenUser')
          this.emailSignIn = '',
          this.passwordSignIn = '',
          this.$q.notify({icon: 'thumb_up', message: data.status, position: 'top'})
          this.$router.push({path: '/user'})
        })
        .catch((error) => {
          this.$q.notify({color: 'negative', message: error.response.data.status, position: 'top'})
        })
    },
    signUpUser() {
      axios
        .post(`${link}/users/register`, {fullname: this.fullNameSignUp, email: this.emailSignUp, password: this.passwordSignUp})
        .then(({ data }) => {
          this.emailSignUp = '',
          this.passwordSignUp = '',
          this.fullNameSignUp = '',
          this.$q.notify({icon: 'thumb_up', message: `${data.status}, please Login to continue`, position: 'top'})
        })
        .catch((error) => {
          this.$q.notify({color: 'negative', message: error.response.data.status, position: 'top'})
        })
    }
  }
}
</script>

<style>

</style>
