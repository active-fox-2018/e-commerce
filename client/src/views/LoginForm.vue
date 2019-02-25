<template>
    <div class="columns is-centered" style="margin-top: 1em;">
      <article class="card" v-if="loading">

      </article>
      <article class="card" v-else>
        <div class="card-content">
          <h1 class="title">
            <img src="./../assets/nomad.jpg" alt="logo" width="300">
          </h1>
          <form @submit.prevent="submitLogin">
            <p class="control has-icon" style="margin: 1em;">
              <input class="input" type="email" placeholder="Email" v-model="email">
            </p>
            <p class="control has-icon" style="margin: 1em;">
              <input class="input" type="password" placeholder="Password" v-model="password">
            </p>
            <p class="control" style="margin: 1em;">
              <button type="submit" class="button is-primary is-medium is-fullwidth">
                <i class="fa fa-user"></i>
                Login
              </button>
            </p>
          </form>
        </div>
      </article>
    </div>
</template>

<script>
import api from '@/api/e-commerce';
import swal from 'sweetalert';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    submitLogin() { // works
      this.$store.commit('loading', true);
      api({
        url: '/login',
        method: 'post',
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then(({ data }) => {
          // console.log(data.token);
          this.clearForm();
          swal('Welcome!', {
            button: true,
            timer: 1750,
            icon: 'success',
          });
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          this.loginSuccess();
          this.$router.push('/');
        })
        .catch(({ response }) => {
          this.$store.commit('loading', false);
          let warning = response.data.message || 'invalid username or password';
        // console.log(response.data.message)
          swal(warning, {
            timer : 1750,
            button : false 
          });
        });
    },
    loginSuccess() {
      this.$store.commit('loginSuccess');
      this.$store.dispatch('getUserCart');
    },
    clearForm() {
      this.email = '';
      this.password = '';
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>
