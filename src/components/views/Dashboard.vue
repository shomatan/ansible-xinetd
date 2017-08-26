<template>
  <div>
    <section class="hero is-small">
      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot">
        <nav class="level">
          <div class="level-item has-text-centered">
            <p class="heading">Published Posts</p>
            <p class="title">{{ total }}</p>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>

  export default {
    name: 'Dashboard',
    data () {
      return {
        total: 0
      }
    },
    created () {
      this.http.get('/posts').then( response => {
        if (response.status !== 200) {
          this.error = response.statusText
          return
        }
        console.log(response.data)
        this.total = response.data.total
      })
      .catch(error => {
        this.error = error.response.statusText
      })
    }
  }

</script>
