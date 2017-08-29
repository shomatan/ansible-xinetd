<template>
  <div class="field has-text-left">
    <table class="table is-bordered">
      <thead>
      <tr>
        <th data-field="key">Key</th>
        <th data-field="value">Value</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="customFields" v-for="r in customFields">
        <td><input class="input" type="text" placeholder="Key" v-model="r.key"></td>
        <td><input class="input" type="text" placeholder="Value" v-model="r.value"></td>
        <td><button class="button is-danger is-outlined" @click="removeCustomField(r)">x</button></td>
      </tr>
      <tr>
        <td><input class="input" type="text" placeholder="Key" v-model="key"></td>
        <td><input class="input" type="text" placeholder="Value" v-model="value"></td>
        <td><button class="button is-info is-outlined" @click="addCustomField">+</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'CustumField',
    props: ['postId', 'customFields'],
    data () {
      return {
        key: '',
        value: ''
      }
    },
    methods: {
      addCustomField: function () {
        let key = this.key && this.key.trim()
        let value = this.value && this.value.trim()
        if (!key || !value) {
          return
        }
        this.customFields.push({
          postId: this.postId,
          key: key,
          value: value,
        })
        this.key = null
        this.value = null
      },
      removeCustomField: function (cf) {
        this.customFields.splice(this.customFields.indexOf(cf), 1)
      }
    }
  }
</script>
