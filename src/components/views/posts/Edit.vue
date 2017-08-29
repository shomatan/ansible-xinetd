<template>
  <div>
    <post-form
      button-name="Update"
      :post.sync="post"
      :categories.sync="categories"
      :tags.sync="tags"
      @post-action="updatePost">
    </post-form>
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
        post: {},
        categories: [],
        tags: []
      }
    },
    methods: {
      init () {
        // Get category
        this.http.get('/categories').then( response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.categories = response.data.categories
        })
        .catch(error => {
          this.error = error.toString()
        })

        // Get tag
        this.http.get('/tags').then( response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.tags = response.data.tags
        })
        .catch(error => {
          this.error = error.toString()
        })

        // Get post
        this.http.get('/posts/' + this.$route.params.id).then( response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.post = response.data.post

          for(var i = 0; i < this.post.categories.length; i++) {
            let r = this.post.categories[i]
            let itemFilter = (function (item, index) {
              if (item.name == r.name) return true
            })
            let exists = this.categories.filter(itemFilter)
            this.categories.splice(this.categories.findIndex(itemFilter), 1)
            this.categories.splice(0, 0, exists[0])
          }

          for(var i = 0; i < this.post.tags.length; i++) {
            let r = this.post.tags[i]
            let itemFilter = (function (item, index) {
              if (item.name == r.name) return true
            })
            let exists = this.tags.filter(itemFilter)
            this.tags.splice(this.tags.findIndex(itemFilter), 1)
            this.tags.splice(0, 0, exists[0])
          }
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
