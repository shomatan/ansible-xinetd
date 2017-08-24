<template>
  <div>
    <post-form button-name="Update" :post.sync="post" v-on:post-action="updatePost"></post-form>
  </div>
</template>

<script>
  import PostForm from './Form.vue'

  export default {
    name: 'EditPost',
    components: {
      PostForm
    },
    data () {
      return {
        post: {}
      }
    },
    methods: {
      init () {
        this.http.get('/posts/' + this.$route.params.id).then( response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.post = response.data
        })
        .catch(error => {
          this.error = error.toString()
        })
      },
      updatePost () {
        this.http.post('/posts', this.post).then(response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
        })
        .catch(error => {
          this.error = error.response.statusText
        })
      }
    },
    created () {
      this.init()
    }
  }
</script>
