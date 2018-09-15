<!--  -->
<template>
  <div>
    <QuillEditor @editor-blur='onEditorBlur' />
  </div>
</template>

<script>
import QuillEditor from '../../../components/QuillEditor.vue'
export default {
  components: {
    QuillEditor
  },

  data() {
    return {}
  },

  computed: {},

  mounted() { },

  methods: {
    onEditorBlur(content) {
      console.log(content)
    }
  }
}
</script>
<style lang='less'>
</style>