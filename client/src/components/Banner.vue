<template>
  <section class="hero is-medium is-primary is-bold">
    <div class="hero-body has-text-centered">
      <div class="container">
        <form @submit.prevent="searchThis">
          <b-field custom-class="is-large" position="is-centered">
              <b-input v-model="search" 
                placeholder="u want some sweetness in life?"
                type="search"
                size="is-large">
              </b-input>
              <p class="control">
                  <button 
                    type="submit"
                    class="button is-info is-large">
                    Search
                  </button>
              </p>
          </b-field>
        </form>
        <div style="margin-top: 20px;">
          <h1 class="title">Diet Starts Tomorrow</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/api/e-commerce'
export default {
  name: 'banner',
  methods: {
    searchThis() {
      this.$store.dispatch('searchProduct', this.search)
      this.$router.push(`/search?q=${this.search}`)
      this.search = ''
    },
  },
  data() {
    return {
      search: '',
    }
  }
};
</script>
