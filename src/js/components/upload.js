// import FileUpload from './upload_template.vue'

// Vue.component('upload', {
//   template: FileUpload
// })

document.addEventListener("DOMContentLoaded",function() {

  Vue.component('upload', {
    data: function () {
      return {
        filename: null
      }
    },
    template: `
      <div>
        <input v-on:change="selectFile" type="file" />
        <div class="file-upload__uploaded">{{ filename }}</div>
      </div>
    `,
    methods: {
      selectFile: function (e) {
        this.filename = e.target.files[0].name
      }
    }
  })

  new Vue({
    el: '.file_upload',
    data: {
      file: null
    }
  })
})
