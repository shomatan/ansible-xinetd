<template>
  <div>

    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-6">
        </div>
        <div class="column is-2">
          <button class="button is-primary is-outlined is-fullwidth" type="button" v-on:click="createPost()">New Post</button>
        </div>
        <div class="column is-3">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="Search">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
          </p>
        </div>
        <div class="column is-1">
          <button class="button is-outlined is-fullwidth" type="button"><i class="fa fa-search"></i></button>
        </div>
      </div>
    </div>

    <section class="content">
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-body">
              <div v-if="error">
                Found an error
              </div>
              <div v-else>

                <table class="table">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="p in posts" @click="editPost(p)" >
                    <td>{{ p.id }}</td>
                    <td>{{ p.title }}</td>
                  </tr>
                  </tbody>
                </table>

              </div><!-- /.box-body -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Tables',
    data () {
      return {
        posts: [],
        error: null
      }
    },
    methods: {
      getPosts () {
        // this.$Progress.start()
        this.http.get('/posts').then( response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.posts = response.data.posts
        })
        .catch(error => {
          // Request failed.
          console.log('error', error.response)
          this.error = error.response.statusText
        })
        // this.$Progress.finish()
      },
      editPost(post) {
        this.$router.push({
          path: '/posts/' + post.id
        })
      },
      createPost() {
        this.$router.push({
          path: '/posts/create'
        })
      }
    },
    mounted () {
      this.getPosts()
    }
  }
</script>

<style>
  .user-panel .image img {
    border-radius: 50%;
  }
</style>
