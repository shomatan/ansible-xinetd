<template>
  <div class="container is-fluid">

    <article class="message is-success is-small" v-if="isSuccess">
      <div class="message-header">
        <p>Success!</p>
        <button class="delete" aria-label="delete" @click="isSuccess = false"></button>
      </div>
    </article>

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
          <button class="button is-success is-outlined" v-on:click="postAction()">{{ buttonName }}</button>
        </p>

      </div>

      <div class="column">

        <!-- Categories -->
        <div class="box box-info">
          <h4>Category</h4>

          <!-- Add category -->
          <div class="field is-horizontal">
            <input class="input" type="text" placeholder="Category name" v-model="newCategory">
            <button class="button is-info is-outlined" @click="addItem(newCategory, categories, post.categories)">+</button>
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
            <button class="button is-info is-outlined" @click="addItem(newTag, tags, post.tags)">+</button>
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
    props: ['buttonName', 'post'],
    components: {
      CustomField
    },
    data () {
      return {
        categories: [],
        tags: [],
        newCategory: '',
        newTag: '',
        isSuccess: false,
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
      },
      postAction() {
        this.isSuccess = true
        setTimeout( function () {
          this.isSuccess = false
        }, 2000);
        this.$emit('post-action')
      },
      addItem (inputName, items, hasItems) {
        let name = inputName && inputName.trim()

        if (!name) return

        let itemFilter = (function (item, index) {
          if (item.name == name) return true
        })

        let exists = items.filter(itemFilter)
        if (exists.length > 0) {
          if (hasItems.filter(itemFilter).length == 0) {
            hasItems.splice(0, 0, exists.shift())
          }
        } else {
          let c = {id: 0, name: name}
          items.splice(0, 0, c)
          hasItems.splice(0, 0, c)
        }
        this.newCategory = ''
        this.newTag = ''
      }
    },
    created () {
      this.init()
    }
  }
</script>
