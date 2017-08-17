<template>
  <div class="container is-fluid">
    <div class="columns is-vcentered">

      <!-- Edit form -->
      <div class="column is-6">

        <div class="field has-text-left">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" type="text" placeholder="Title">
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Content</label>
          <div class="control">
            <textarea class="input" rows="5"></textarea>
          </div>
        </div>

        <p class="control login">
          <button class="button is-success is-outlined">Create</button>
        </p>

      </div>

      <!-- Categories -->
      <div class="column is-3">
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
            <tr class="even" role="row">
              <td><input type="checkbox"></td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div><!-- /.columns is-vcentered -->
  </div>
</template>
