<template>
  <el-dialog width="60%"
    @open="handleDialogOpen"
    :visible.sync="selfDialogVisible">
    <div slot="title">
      编辑 Schema（详见
      <a target="_blank" href="https://github.com/macacajs/macaca-datahub/blob/master/README.md#schema-syntax">
        syntax docs
      </a>
      ）
    </div>
    <code-mirror
      :hasChange="hasChange"
      :visible="selfDialogVisible"
      :key="`${interfaceUniqId}-${type}`"
      :ref="`${interfaceUniqId}-${type}-code-mirror`" 
      :selfKey="`${interfaceUniqId}-${type}-code-mirror`">
    </code-mirror>
    <div slot="footer" class="dialog-footer">
      <el-button @click="selfDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmUpdateSchema">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';

import { schemaService } from '@/api';
import CodeMirror from '../CodeMirror';
import { validateJSON } from '@/utils/helper';
import { messageWrapper } from '@/utils/message';

export default {
  props: ['dialogVisible', 'schema', 'type'],
  components: {
    'code-mirror': CodeMirror
  },
  watch: {
    interfaceUniqId(newVal, oldVal) {
      this.hasChange = oldVal ? true : true;
    },
    dialogVisible() {
      this.selfDialogVisible = this.dialogVisible;
    },
    selfDialogVisible() {
      this.$emit('update:dialogVisible', this.selfDialogVisible);
    }
  },
  data() {
    return {
      hasChange: false,
      selfDialogVisible: false
    }
  },
  computed: mapState({
    interfaceUniqId: state => state.interfaceUniqId
  }),
  methods: {
    // 对话框打开时
    handleDialogOpen() {
      this.$nextTick(() => {
        const codeMirrorEditor = this.$refs[`${this.interfaceUniqId}-${this.type}-code-mirror`].codeMirrorEditor;
        const totalLines = codeMirrorEditor.lineCount();
        codeMirrorEditor.doc.setValue(JSON.stringify(this.schema || {}));
        codeMirrorEditor.autoFormatRange({
          line: 0, ch: 0
        }, {
          line: totalLines
        });
      });
    },
    // 确认编辑 schema
    confirmUpdateSchema() {
      const codeMirrorEditor = this.$refs[`${this.interfaceUniqId}-${this.type}-code-mirror`].codeMirrorEditor;
      const { data, error } = validateJSON(codeMirrorEditor.doc.getValue());
      if (error) {
        this.$message.error('JSON 格式错误，请检查后提交');
      } else {
        const updatePromise = schemaService.updateSchema.bind(null, {
          type: this.type,
          schemaData: data,
          interfaceUniqId: this.interfaceUniqId
        });
        messageWrapper('更新 schema', updatePromise, () => {
          this.$emit('update-success');
          this.selfDialogVisible = false;
        });
      }
    }
  }
}
</script>
