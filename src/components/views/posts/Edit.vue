<template>
  <div>
    <h1 class="text-center">Edit</h1>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-info">

            <div v-if="post">
              <div class="box-body">

              <h4>Title</h4>
              <div class="input-group">
                <input class="form-control" type="text" v-model="post.title">
                <span class="input-group-addon"></span>
              </div>
              <br>


              </div> <!-- /.box-body -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    
</script>export default {
  name: 'Settings',
  data () {
    return {
      post: null,
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
      this.axios.get('/posts/' + this.$route.params.id)
        .then(response => {
        
        if (response.status !== 200) {
            this.error = response.statusText
            return
        }

        this.post = response.data
      })
      .catch(error => {
        // Request failed.
        console.log('error', error.response)
        this.error = error.response.statusText
      })
    },
  },
  mounted () {
    this.getPost()
  }
}
</script>

<style>
.datetime-picker input {
  height: 4em !important;
}

</style>
