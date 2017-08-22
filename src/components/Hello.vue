<template>
  <div class="container">
    <div class="columns">

      <div class="column is-2 aside is-fullheight is-hidden-mobile">
        <p class="menu-label">
          General
        </p>
        <ul class="menu-list">
          <li><router-link to="/">Dashboard</router-link></li>
        </ul>
        <p class="menu-label">
          Posts
        </p>
        <ul class="menu-list">
          <li><router-link to="/posts/create">New Post</router-link></li>
          <li><router-link to="/posts">List</router-link></li>
          <li><a>Category</a></li>
          <li><a>Tag</a></li>
        </ul>
      </div>

      <!-- Content Wrapper. Contains page content -->
      <div class="column is-10">
        <router-view></router-view>
      </div>
      <!-- /.content-wrapper -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
