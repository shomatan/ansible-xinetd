<template>
  <div>
    <h1 class="text-center">Edit</h1>
    <section class="content">
      <div class="row flex-container">

        <!-- Edit form -->
        <div class="col-md-8">
          <div class="box box-info">

            <div v-if="post">
              <div class="box-body">

                <h4>Title</h4>
                <div class="input-group">
                  <input class="form-control" type="text" v-model="post.title">
                  <span class="input-group-addon"></span>
                </div>
                <br>

                <h4>Content</h4>
                <div class="input-group">
                  <textarea class="form-control" v-model="post.content"></textarea>
                  <span class="input-group-addon"></span>
                </div>
                <br>
                <button type="button" class="btn btn-default btn-lg" v-on:click="updatePost()">Update</button>
              </div> <!-- /.box-body -->
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div class="col-md-2">
          <div class="box box-info">
            <div class="box-body">
              <h4>Category</h4>
              <table class="table table-bordered table-striped dataTable" data-click-to-select="true">
                <thead>
                  <tr>
                    <th data-field="state" data-checkbox="true" data-formatter="stateFormatter"></th>
                    <th data-field="name">Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="even" role="row" v-if="categories" v-for="p in categories">
                    <td><input type="checkbox" v-bind:value="p" v-model="post.categories"></td>
                    <td>{{ p.name }}</td>
                  </tr>
                </tbody>
              </table>
            </div> <!-- /.box-body -->
          </div>
        </div>

        <!-- Tags -->
        <div class="col-md-2">
          <div class="box box-info">

            <div class="box-body">
              <h4>Tags</h4>
              <table class="table table-bordered table-striped dataTable" data-click-to-select="true">
                <thead>
                <tr>
                  <th data-field="state" data-checkbox="true" data-formatter="stateFormatter"></th>
                  <th data-field="name">Name</th>
                </tr>
                </thead>
                <tbody>
                <tr class="even" role="row" v-if="tags" v-for="p in tags">
                  <td><input type="checkbox" v-bind:value="p" v-model="post.tags"></td>
                  <td>{{ p.name }}</td>
                </tr>
                </tbody>
              </table>
            </div> <!-- /.box-body -->
          </div>
        </div>

      </div><!-- /.row -->

    </section>
  </div>
</template>

<script>

export default {
  name: 'Settings',
  data () {
    return {
      post: null,
      categories: null,
      tags: null,
      error: null
    }
  },
  computed: {
    datetime () {
      return new Date()
    },
  },
  methods: {
    clearInput (vueModel) {
      vueModel = ''
    },
    getPost () {
      this.$Progress.start()
      this.axios.get('/posts/' + this.$route.params.id).then( response => {

        if (response.status !== 200) {
          this.$Progress.fail()
          this.error = response.statusText
          return
        }

        this.post = response.data
      })
      .catch(error => {
        // Request failed.
        this.$Progress.fail()
        console.log('error', error.response)
        this.error = error.response.statusText
      })

      this.axios.get('/categories').then( response => {

        if (response.status !== 200) {
          this.$Progress.fail()
          this.error = response.statusText
          return
        }

        this.categories = response.data

        console.log(this.categories)
      })
      .catch(error => {
        // Request failed.
        this.$Progress.fail()
        console.log('error', error.response)
        this.error = error.response.statusText
      })

      this.axios.get('/tags').then( response => {

        if (response.status !== 200) {
          this.$Progress.fail()
          this.error = response.statusText
          return
        }

        this.tags = response.data

        console.log(this.categories)
      })
      .catch(error => {
        // Request failed.
        this.$Progress.fail()
        console.log('error', error.response)
        this.error = error.response.statusText
      })

      this.$Progress.finish()
    },
    updatePost() {
      this.$Progress.start()
      this.axios.post('/posts', this.post).then(response => {

        if (response.status !== 200) {
          this.$Progress.fail()
          this.error = response.statusText
          return
        }
      })
      .catch(error => {
        // Request failed.
        console.log('error', error.response)
        this.$Progress.fail()
        this.error = error.response.statusText
      })
      this.$Progress.finish()
    }
  },
  mounted () {
    this.getPost()
  }
}
</script>

<style>
  .flex-container {
    padding: 0;
    margin: 0;
    list-style: none;

    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
</style>
