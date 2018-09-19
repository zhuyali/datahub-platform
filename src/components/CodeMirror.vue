<template>
  <el-input
    :key="selfKey"
    class="u-textarea"
    type="textarea" 
    :rows="10" 
    :id="selfKey">
  </el-input>
</template>

<script>
import { mapState } from 'vuex';

import 'codemirror/addon/lint/lint';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/display/placeholder';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/selection/active-line';
import * as CodeMirror from 'codemirror/lib/codemirror';

import '@/assets/javascript/format';
import '@/assets/javascript/jsonlint';

export default {
  props: ['selfKey', 'visible', 'hasChange'],
  watch: {
    visible() {
      this.codeMirrorEditor.toTextArea();
      this.init();
    }
  },
  data() {
    return {
      codeMirrorEditor: null
    }
  },
  mounted() {
    if (this.hasChange) {
      this.init();
    }
  },
  methods: {
    init() {
      const codeElement = document.getElementById(this.selfKey);
      this.codeMirrorEditor = CodeMirror.fromTextArea(codeElement, {
        mode: {
          name: 'javascript',
          json: true
        },
        lint: true,
        tabSize: 2,
        foldGutter: true,
        lineNumbers: true,
        smartIndent: true,
        matchBrackets: true,
        styleActiveLine: true,
        autoCloseBrackets: true,
        gutters: [
          'CodeMirror-linenumbers',
          'CodeMirror-foldgutter',
          'CodeMirror-activeline-gutter',
          'CodeMirror-lint-markers'
        ],
        placeholder: '{\n  ... Input JSON data here\n}'
      });
    }
  }
}
</script>

<style lang="less" scoped>
.u-textarea {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
</style>
