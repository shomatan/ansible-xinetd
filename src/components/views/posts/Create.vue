<template>
  <div>
    <section class="content">
      <div class="row">
        <h1 class="col-md-4">Create</h1>
      </div>
      <div class="alert alert-danger" v-if="error">
        <strong>{{ error }}</strong>
      </div>
      <div class="row flex-container">

        <!-- Edit form -->
        <div class="col-md-8">
          <div class="box box-info">
            <div class="box-body">

              <h4>Title</h4>
              <div class="input-group col-sm-12">
                <input class="form-control" type="text" placeholder="Title" v-model="post.title">
              </div>
              <br>

              <h4>Content</h4>
              <div class="input-group col-sm-12">
                <textarea class="form-control" rows="5" v-model="post.content"></textarea>
              </div>
              <br>
              <button type="button" class="btn btn-default btn-lg" v-on:click="createPost()">Create</button>

            </div><!-- /.box-body -->
          </div><!-- /.box-info -->
        </div>

        <!-- Categories -->
        <div class="col-md-2">
          <div class="box box-info">
            <div class="box-body">
              <h4>Category</h4>
              <table class="table table-bordered table-striped dataTable" data-click-to-select="true">
                <thead>
                  <tr>
                    <th data-field="cat" data-checkbox="true" data-formatter="stateFormatter"></th>
                    <th data-field="name">Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="even" role="row" v-if="categories" v-for="p in categories">
                    <td><input type="checkbox" v-bind:value="{ name: p.name }" v-model="post.categories"></td>
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
        </div><!-- /.col-md-2 -->

      </div><!-- /.row -->
    </section>
  </div>
</template>

<script>

export default {
  name: 'Settings',
  data () {
    return {
      post: {
        id: 0,
        title: null,
        content: null,
        categories: [],
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
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

      this.axios.get('/categories').then( response => {

        if (response.status !== 200) {
          this.$Progress.fail()
          this.error = response.statusText
          return
        }

        this.categories = response.data
      })
      .catch(error => {
        this.$Progress.fail()
        this.error = error.toString()
      })

      this.axios.get('/tags').then( response => {

        if (response.status !== 200) {
          this.$Progress.fail()
           this.error = response.statusText
          return
        }

        this.tags = response.data
      })
      .catch(error => {
        this.$Progress.fail()
        this.error = error.toString()
      })

      this.$Progress.finish()
    },
    createPost() {
      this.$Progress.start()

      this.axios.post('/posts', this.post).then(response => {

        if (response.status !== 200) {
          this.$Progress.fail()
          this.error = response.statusText
          return
        }

        this.$Progress.finish()
        this.$router.push({
          path: '/posts'
        })
      })
      .catch(error => {
        this.$Progress.fail()
        this.error = error.response.statusText
      })
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
