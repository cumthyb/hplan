<template>
  <section class="quill-editor-container">
    <Spin size="large"
      fix
      v-if="spinShow"></Spin>
    <div class="quill-editor"
      :content="content"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      v-quill:myQuillEditor="editorOption"
      ref="myQuillEditor">
    </div>
    <input type="file"
      name="file"
      style='display:none'
      ref='file'
      @change="fileChange">
  </section>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data() {
    return {
      spinShow: false,
      file: null,
      uptoken: '',
      modal1: false,
      content: '<p>I am Example</p>',
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['link', 'image', 'video'],
              ['clean']
            ],
            handlers: {
              // handlers object will be merged with default handlers object
              link: function (value) {
                if (value) {
                  var href = prompt('Enter the URL')
                  this.quill.format('link', href)
                } else {
                  this.quill.format('link', false)
                }
              },
              image: () => {
                this.$refs['file'].click()
              },
              video: () => {
                this.$refs['file'].click()
              },
            }
          }
        }
      },
      fileType: {
        image: ['png', 'jpeg', 'jpg', 'bmp', 'gif', 'ico'],
        video: ['mp4', 'webm', 'ogg', 'mpeg4']
      },
      currentFileClassification: ''
    }
  },
  mounted() {
    // console.log('app init, my quill insrance object is:', this.myQuillEditor)
    setTimeout(() => {
      this.content = ''
    }, 3000)
  },
  methods: {
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    },
    ok() {
      // this.$Message.info('Clicked ok');
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
    },
    fileChange(event) {
      let file = event.target.files[0];
      let fileType = file.type.toLowerCase().split('/')
      let fileClassification = fileType[0];
      let codeType = fileType[1];
      if (this.fileType[fileClassification] && this.fileType[fileClassification].includes(codeType)) {
        this.currentFileClassification=fileClassification
        this.spinShow = true
        this.$http
          .get('upload-token', '').then(r => {
            this.uptoken = r.uptoken
            this.getUpFileUrl(file)
          }).catch(error => {
            this.spinShow = false

            this.$Notice.error({
              title: '上传凭证请求失败'
            })
          })
      }
      else {
        this.$Notice.error({
          title: '暂不支持上传此文件'
        })
      }

    },
    //获取上传的接口
    getUpFileUrl(files) {
      let category = this.category;
      let that = this;
      let file = files;
      var fileName = files.name;
      var form = new FormData();
      form.append("token", this.uptoken);
      form.append('fname', files.name);
      form.append('file', files);
      form.append("key", (new Date()).getTime());
      this.upfile(form, 'http://up-z1.qiniup.com', files.name)

    },
    upfile(form, serverUrl, fileName) {
      let quill = this.myQuillEditor
      var that = this;
      var xhrfile = new XMLHttpRequest();
      xhrfile.timeout = 600000;
      xhrfile.onreadystatechange = function () {
        if (xhrfile.readyState === 4) {
         
          var fileResponse = xhrfile.response;
          if (xhrfile.status === 200) {
            let fileUrl = `http://pe3q7604z.bkt.clouddn.com/${fileResponse.key}`

            let length = quill.getLength();
            // 插入图片  res.info为服务器返回的图片地址
            // quill.insertEmbed(length, 'image', fileUrl)
            quill.insertEmbed(length, that.currentFileClassification, fileUrl)
            // 调整光标到最后
            quill.setSelection(length + 1)
          } else {
            that.$Notice.error({
              title: '上传失败请稍后重试'
            });
          }
          that.spinShow = false
        }
      };
      xhrfile.open('POST', serverUrl, true);
      xhrfile.responseType = 'json';
      xhrfile.send(form);
    },

  }
}
</script>

<style lang="less">
.quill-editor-container {
    width: 95%;
    margin: 0 auto;
    padding: 50px 0;
    // text-align: left;
    height: 100%;
    .quill-editor {
        height: 100%;
        min-height: 500px;
        max-height: 750px;
        overflow-y: auto;
    }
}
</style>
