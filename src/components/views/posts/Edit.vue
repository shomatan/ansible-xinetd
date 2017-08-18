<template>
  <div class="container is-fluid">
    <div class="columns is-vcentered">

      <!-- Edit form -->
      <div class="column is-8">

        <div class="field has-text-left">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" type="text" placeholder="Title" v-model="post.title">
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Content</label>
          <div class="control">
            <textarea class="textarea" rows="5" v-model="post.content"></textarea>
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Post date</label>
          <div class="control">
            <date-picker id="postedAt-date" name="postedAt" type="datetime" placeholder="Select date and time" v-model="post.postedAt"></date-picker>
          </div>
        </div>

        <p class="control login">
          <button class="button is-success is-outlined" v-on:click="updatePost()">Update</button>
        </p>

      </div>

      <!-- Categories -->
      <div class="column is-2">
        <div class="box box-info">
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
        </div>
      </div>

      <!-- Tags -->
      <div class="column is-2">
        <div class="box box-info">
          <h4>Tag</h4>
          <table class="table table-bordered table-striped dataTable" data-click-to-select="true">
            <thead>
            <tr>
              <th data-field="cat" data-checkbox="true" data-formatter="stateFormatter"></th>
              <th data-field="name">Name</th>
            </tr>
            </thead>
            <tbody>
            <tr class="even" role="row" v-if="tags" v-for="p in tags">
              <td><input type="checkbox" v-bind:value="{ name: p.name }" v-model="post.tags"></td>
              <td>{{ p.name }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div><!-- /.columns is-vcentered -->
  </div>
</template>

<script>
  import { DatePicker } from 'element-ui'

  export default {
    name: 'CreatePost',
    components: { DatePicker },
    data () {
      return {
        post: {
          id: 0,
          title: '',
          content: '',
          categories: [],
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          postedAt: new Date(),
        },
        postedAt: new Date(),
        categories: [],
        tags: [],
        error: null
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
          this.categories = response.data
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
          this.tags = response.data
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
          this.post = response.data
        })
        .catch(error => {
          this.error = error.toString()
        })
      },
      updatePost() {
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
