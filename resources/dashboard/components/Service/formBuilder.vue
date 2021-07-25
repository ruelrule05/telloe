<script>
window.$ = window.jQuery = require("jquery");
require("jquery-ui-sortable");
require("formBuilder");
require("formBuilder/dist/form-render.min.js");

export default {
  name: "v-form-builder",
  template:
    '<div><div id="form-editor"></div><div id="form-render"></div></div>',
  props: {},
  mounted: function () {
    var self = this,
      fbOptions = {
        onSave: function () {
          $("#form-render").formRender({ formData: fBuilder.formData });
          self.$emit("click", fBuilder.formData);
          console.log(fBuilder.formData);
        },
        onClearAll: function() {
            alert('all fields removed');
            $("#form-render").formRender({ formData: fBuilder.formData });
        },
        disabledActionButtons: ["data"],
      },
      fBuilder = $("#form-editor").formBuilder(fbOptions);
  },
};
</script>