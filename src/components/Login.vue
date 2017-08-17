<template>
  <div>
    <section class="hero is-fullheight is-bold">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">

            <!-- errors -->
            <p class="help is-danger" v-if=response>{{ response }}</p>

            <!-- login form -->
            <form class="ui form loginForm" @submit.prevent="login">

              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input class="input" type="email" placeholder="Email" v-model="data.email">
                      <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input class="input" type="password" placeholder="Password" v-model="data.password" v-if="data">
                      <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <label class="checkbox">
                        <input type="checkbox" v-model="data.rememberMe" v-if="data"> Remember Me
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <p class="control login">
                <button class="button is-success is-outlined is-fullwidth">Login</button>
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import * as types from '../stores/types'

  export default {
    name: 'Login',
    data() {
      return {
        data: {
          email: '',
          password: '',
          rememberMe: false,
        },
        response: ''
      }
    },
    mounted(){
      this.$store.commit(types.TITLE, 'Login')
    },
    methods: {
      login(){
        console.log(this.data)
        this.http.post('/auth/signIn', this.data).then(response => {
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
