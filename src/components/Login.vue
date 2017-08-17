<template>
<div>
  <!-- errors -->
  <p class="help is-danger" v-if=response>{{ response }}</p>

  <!-- login form -->
  <form class="ui form loginForm" @submit.prevent="login">

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">E-mail</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="email address" v-model="email">
          </div>
          <p class="help is-danger" v-if="!email">
            This field is required
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Password</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" type="password" placeholder="password" v-model="password">
          </div>
          <p class="help is-danger" v-if="!password">
            This field is required
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <!-- Left empty for spacing -->
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <button class="button is-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
</template>

<script>
  import * as types from '../stores/types'

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        response: ''
      }
    },
    mounted(){
      this.$store.commit(types.TITLE, 'Login')
    },
    methods: {
      login(){
        this.http.post('/auth/signIn', { email: this.email, password: this.password, rememberMe: false }).then(response => {
          this.$store.commit(types.LOGIN, response.data.token)
          let redirect = decodeURIComponent(this.$route.query.redirect || '/')
          this.$router.push({
            path: redirect
          })
        })
          .catch(error => {
            this.response = error.message
            let redirect = decodeURIComponent(this.$route.query.redirect || '/')
            this.$router.push({
              path: redirect
            })
          })
      }
    }
  }
</script>
