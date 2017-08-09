<template>
  <div id="app">
    <router-view></router-view>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
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
    }
  }
</script>