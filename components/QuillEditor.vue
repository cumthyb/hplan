<template>
  <section class="quill-editor-container">
    <div :id="'editor_'+_uid"
      class="quill-editor"
      :content="content"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      v-quill:quill="editorOption"
      ref="quill">
    </div>
    <Upload @upload-success='onFileUpload'
      ref='upload' />
    <template>

    </template>
  </section>
</template>

<script>
import * as Quill from 'quill'
import hljs from 'highlight.js'
import Upload from './Upload.vue'


// 自定义字体大小
let Size = Quill.import('attributors/style/size')
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
Quill.register(Size, true)

// 自定义字体类型
var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial']
var Font = Quill.import('formats/font')
Font.whitelist = fonts // 将字体加入到白名单
Quill.register(Font, true)



var Embed = Quill.import('blots/embed');
class ProcLink extends Embed {
  static create(value) {
    let node = super.create(value);
    node.setAttribute('class', 'comment-embed');
    node.setAttribute('contenteditable', "true");
    node.setAttribute('data-proc', value.data);
    node.innerHTML = value.html;
    return node;
  }
}

ProcLink.blotName = 'proc-link';
ProcLink.className = 'proc-link';
ProcLink.tagName = 'span';

Quill.register({
  'formats/proc-link': ProcLink
});


export default {
  components: {
    Upload
  },
  props: {
    value: ''
  },
  data() {
    return {
      mouseposition: {},
      editorDom: null,
      commentDom: null,
      content: '',
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              // [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge', '10px', '12px', '14px', '16px', '18px', '20px'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: fonts }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['link', 'image', 'video'],
              ['clean', 'annotate']
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
                this.$refs['upload'].click()
              },
              video: () => {
                this.$refs['upload'].click()
              },
              annotate: () => {
                var range = this.quill.getSelection();
                if (range) {
                  if (range.length == 0) {
                    this.$Notice.error({
                      title: '请先选择要批注的范围'
                    })
                    console.log('User cursor is at index', range.index);
                  } else {
                    var text = this.quill.getText(range.index, range.length);
                    var content = prompt('输入批注内容')
                    if (content) {
                      this.quill.formatText(range.index, range.length, {                   // unbolds 'hello' and set its color to blue
                        'bold': true,
                        'color': '#FCE5EA',
                        'background': '#E5335D'
                      });
                      let commemtId=(new Date()).getTime()
                      this.quill.deleteText(range.index, range.length)
                      let commentData = this.getCommentData(range.index, range.length, text, content)
                      var cObj = { html: `<span class='comment-item' data-commemtId='${commemtId}'><span>${text}</span><div class='comment-container' id='${commemtId}'><div class='header'>${text}</div><div class='content' contenteditable='true'> ${content}</div></div></span>`, data: JSON.stringify(commentData) };
                      this.quill.insertEmbed(range.index, "proc-link", cObj)
                    }

                  }
                } else {
                  console.log('User cursor is not in editor');
                }
              }
            }
          }
        }
      },

    }
  },
  watch: {
    value(val) {
      this.content = val
      if (val != this.content) {
        this.content = val
      }
    },
  },

  mounted() {

    var selector = `#editor_${this._uid}`
    var commentDom = document.createElement('div');
    commentDom.className = 'quill-comment'
    this.editorDom = document.querySelector(selector)
    this.editorDom.appendChild(commentDom)
    this.commentDom = commentDom;
    // selector = `#editor_${this._uid} .ql-editor`
    // this.editorDom = document.querySelector(selector)
    // this.$nextTick(() => {
    // this.editorDom.addEventListener('mouseup', this.onEditorMouseUp)
    // })
  },
  methods: {
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
      this.$emit('editor-blur', this.content)
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
      this.$emit('input', this.content)
    },

    onFileUpload(currentFileClassification, fileUrl) {
      let length = this.quill.getLength();
      this.quill.insertEmbed(length, currentFileClassification, fileUrl)
      this.quill.setSelection(length + 1) //调整光标到最后
    },
    onEditorMouseUp(e) {
      console.log(e)
      this.mouseposition = e;
    },
    getCommentData(startIndex, length, original, comment) {
      return {
        startIndex: startIndex,
        length: length,
        original: original,
        comment: comment
      }

    },
    insertComment(text) {
      var commentItemDom = document.createElement('div');
      commentItemDom.className = 'quill-comment-item'
      commentItemDom.style.position = 'absolute'
      commentItemDom.style.top = (this.mouseposition.clientY - 145) + 'px'
      commentItemDom.innerText = text
      this.commentDom.appendChild(commentItemDom)
    }

  }
}
</script>

<style lang="less">
.quill-editor-container {
  width: 1066px;
  box-sizing: border-box;
  margin: 0 auto;
  // max-height: 1200px;
  .ql-toolbar {
    background-color: #f7f7f7;
    height: 46px;
    padding: 0;
    padding-bottom: 8px;
    padding-top: 11px;
    white-space: nowrap;
    border: none;
    margin: 0 auto;
    text-align: center;
    font-family: Helvetica, Tahoma, Arial, Hiragino Sans GB, Microsoft YaHei,
      sans-serif;
    transition: height 0.2s ease-in;
    transition: height 0.2s ease-in;
    .ql-annotate {
      position: relative;
      top: -2px;
      &::after {
        content: "C";
        font-size: 16px;
        font-weight: 700;
      }
    }
  }

  .quill-editor {
    min-height: 800px;
    padding-right: 250px;
    background-color: #fff;
    border-bottom: 1px solid #d9d9d9;
    box-shadow: 0 1px 6px #ccc;
    .comment-embed {
      text-decoration: underline;
      color: #fce5ea;
      background: #e5335d;
      cursor: pointer;
      .comment-item {
        .comment-container {
          display: inline-block;
          width: 230px;
          position: absolute;
          left: 826px;
          text-align: left;
          color: #e5335d;
          font-size: 12px;
          z-index: 100;

          max-height: 300px;
          overflow: auto;
          background: #fff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          border-radius: 2px;
          position: absolute;
          cursor: pointer;
          transition: opacity 0.3s ease-out, margin-left 0.3s ease,
            top 0.3s ease;

          padding: 5px 10px;

          opacity: 0.5;
          &:hover {
            opacity: 1;
            z-index: 101;
          }
          .header {
            border-bottom: 1px dashed #f00;
          }
          .content {
            padding-top: 2px;
            padding-bottom: 2px;
            color: #333;
            line-height: 18px;
            word-break: break-word;
          }
        }
      }
    }
  }
  .quill-comment {
    position: absolute;
    top: 0;
    right: 0;
    width: 250px;
    height: 100%;

    border-left: 1px solid #ccc;
  }
}
</style>
