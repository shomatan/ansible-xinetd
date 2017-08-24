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

        <!-- Custom field -->
        <custom-field :post-id="post.id" :custom-fields.sync="post.customFields"/>

        <div class="field has-text-left">
          <label class="label">Post date</label>
          <div class="control">
            <el-date-picker id="postedAt-date" name="postedAt" type="datetime" placeholder="Select date and time" v-model="post.postedAt"></el-date-picker>
          </div>
        </div>

        <p class="control login">
          <button class="button is-success is-outlined" v-on:click="updatePost()">Update</button>
        </p>

      </div>

      <div class="column">

        <!-- Categories -->
        <div class="box box-info">
          <h4>Category</h4>

          <!-- Add category -->
          <div class="field is-horizontal">
            <input class="input" type="text" placeholder="Category name" v-model="newCategory">
            <button class="button is-info is-outlined" @click="addCategory()">+</button>
          </div>

          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th data-field="cat" data-checkbox="true" data-formatter="stateFormatter"></th>
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
        </div>

        <!-- Tags -->
        <div class="box box-info">
          <h4>Tag</h4>

          <!-- Add tag -->
          <div class="field is-horizontal">
            <input class="input" type="text" placeholder="Tag name" v-model="newTag">
            <button class="button is-info is-outlined" @click="addTag()">+</button>
          </div>

          <table class="table table-bordered table-striped dataTable" data-click-to-select="true">
            <thead>
            <tr>
              <th data-field="cat" data-checkbox="true" data-formatter="stateFormatter"></th>
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
        </div>

      </div>
    </div><!-- /.columns is-vcentered -->
  </div>
</template>

<script>
  import CustomField from './CustomField.vue'

  export default {
    name: 'CreatePost',
    components: {
      CustomField
    },
    data () {
      return {
        post: {
          id: 0,
          title: '',
          content: '',
          categories: [],
          tags: [],
          customFields: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          postedAt: new Date(),
        },
        postedAt: new Date(),
        categories: [],
        tags: [],
        newCategory: '',
        newTag: '',
        error: null
      }
    },
    methods: {
      init () {
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
      },
      updatePost() {
        console.log(this.post)
        this.http.post('/posts', this.post).then(response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
        })
        .catch(error => {
          this.error = error.response.statusText
        })
      },
      addCategory () {
        let name = this.newCategory && this.newCategory.trim()

        if (!name) return

        let categoryFilter = (function (item, index) {
          if (item.name == name) return true
        })

        let exists = this.categories.filter(categoryFilter)
        if (exists.length > 0) {
          if (this.post.categories.filter(categoryFilter).length == 0) {
            this.post.categories.splice(0, 0, exists.shift())
          }
          console.log(this.post.categories)
        } else {
          let c = {id: 0, name: name}
          this.categories.splice(0, 0, c)
          this.post.categories.splice(0, 0, c)
        }
        this.newCategory = ''
      },
      addTag () {
        let name = this.newTag && this.newTag.trim()

        if (!name) return

        let tagFilter = (function (item, index) {
          if (item.name == name) return true
        })

        let exists = this.tags.filter(tagFilter)
        if (exists.length > 0) {
          if (this.post.tags.filter(tagFilter).length == 0) {
            this.post.tags.splice(0, 0, exists.shift())
          }
        } else {
          let c = {id: 0, name: name}
          this.tags.splice(0, 0, c)
          this.post.tags.splice(0, 0, c)
        }
        this.newTag = ''
      }
    },
    created () {
      this.init()
    }
  }
</script>
