<template>

  <section class="content">
    <div class="row center-block">
      <h2>Posts</h2>
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Data Table With Full Features</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
                <div class="row">
                  <div class="col-sm-6">
                    <div id="example1_length" class="dataTables_length">

                    </div>
                  </div>
                </div>

                <div v-if="error">
                  Found an error
                </div>
                <div v-else>
                  <div class="row">
                    <div class="col-sm-12 table-responsive">
                      <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                        <thead>
                          <tr role="row">
                            <th aria-label="ID engine: activate to sort column descending" aria-sort="ascending" style="width: 167px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">ID</th>
                            <th aria-label="Title: activate to sort column ascending" style="width: 207px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">Title</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="even" role="row" v-if="response" v-for="p in response" v-on:click="editPost(p)" >
                            <td class="sorting_1">{{ p.id }}</td>
                            <td>{{ p.title }}</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="1" rowspan="1">ID</th>
                            <th colspan="1" rowspan="1">Title</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>

  export default {
    name: 'Tables',
    data () {
      return {
        response: null,
        error: null
      }
    },
    methods: {
      getPosts () {
        this.axios.get('/posts')
          .then(response => {
            
            if (response.status !== 200) {
              this.error = response.statusText
              return
            }

            this.response = response.data
          })
          .catch(error => {
            // Request failed.
            console.log('error', error.response)
            this.error = error.response.statusText
          })
      },
      editPost(post) {
        this.$router.push({
            path: '/posts/' + post.id
          })
      }
    },
    mounted () {
      this.getPosts()
    }
  }
</script>