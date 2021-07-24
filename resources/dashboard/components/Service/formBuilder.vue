<script>
  window.$ = window.jQuery = require('jquery');
  require('jquery-ui-sortable')
  require('formBuilder')

  export default {
    name : 'v-form-builder',
    template : '<div><div id="form-editor"></div><div id="form-render"></div></div>',
    props : {},
    mounted : function() {
      var self = this,
      fbOptions = {
        onSave:function () {
          $('#form-render').formRender({formData:fBuilder.formData});
          self.$emit('on-save', fBuilder.formData);
        },
        disabledActionButtons: ['data']
      },
      fBuilder = $('#form-editor').formBuilder(fbOptions);
    }
  }
</script>