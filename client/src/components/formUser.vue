<template>
  <v-card>
        <v-card-title>
          <span class="headline">{{action.toUpperCase()}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 v-if="action !== 'login'">
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="10"
                  label="Name"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="password"
                type ="password"
                :error-messages="passErrors"
                label="Password"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="action === 'login'" color="blue darken-1" flat @click="dialog">Close</v-btn>
          <v-btn v-if="action !=='login'" color="blue darken-1" flat @click="dialogRegist">Close</v-btn>
          <v-btn v-if="action ==='login'" color="blue darken-1" flat @click="login">login</v-btn>
          <v-btn v-if="action !=='login'" color="blue darken-1" flat @click="register">register</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, minLength } from 'vuelidate/lib/validators'

export default {
  props: ['action'],
  name: 'formUser',
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { minLength: minLength(5), maxLength: maxLength(20) }

  },
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    dialogRegist () {
      this.$emit('dialogRegist', false)
    },
    dialog () {
      this.$emit('dialog', false)
    },
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    },
    register () {
      axios({
        method: 'post',
        url: `${this.$store.state.serverUrl}/register`,
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.$store.commit('isLogin', true)
          this.dialog()
        })
        .catch(err => {
          console.log(err)
          localStorage.removeItem('token')
        })
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength && errors.push('password must be at most 20 characters long')
      !this.$v.password.minLength && errors.push('password minimal 5 characters long')
      return errors
    }
  }
}
</script>

<style>

</style>
