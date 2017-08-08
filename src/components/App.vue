<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import * as types from '../store/types'
  import {mapState} from 'vuex'

  export default {
    name: 'App',
    data () {
      return {
        section: 'Head'
      }
    },
    methods: {
      logout () {
        this.$store.commit(types.LOGOUT)
        this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>