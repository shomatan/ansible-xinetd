<template>
  <div>
    <post-form button-name="Create" :post.sync="post" v-on:post-action="createPost"></post-form>
  </div>
</template>

<script>
  import PostForm from './Form.vue'

  export default {
    name: 'CreatePost',
    components: {
      PostForm
    },
    data () {
      return {
        post: {
          id: 0,
          title: null,
          content: null,
          categories: [],
          tags: [],
          customFields: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          postedAt: new Date(),
        },
        error: null
      }
    },
    methods: {
      createPost() {
        console.log(this.post)
        this.http.post('/posts', this.post).then(response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.$router.push({
            path: '/posts'
          })
        })
        .catch(error => {
          this.error = error.response.statusText
        })
      }
    }
  }
</script>
