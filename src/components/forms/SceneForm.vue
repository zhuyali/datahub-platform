<template>
  <el-dialog width="60%"
    :title="dialogType === 'add' ? '添加新场景' : '编辑场景'"
    @open="handleDialogOpen"
    :visible.sync="selfDialogVisible">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="场景名称：" label-width="120px" prop="sceneName">
        <el-input v-model="form.sceneName" placeholder="请输入场景名称"></el-input>
      </el-form-item>
      <el-form-item label="场景数据：" label-width="120px" prop="data">
        <code-mirror
          :hasChange="hasChange"
          :visible="selfDialogVisible"
          :key="`${interfaceUniqId}-scene`"
          :ref="`${interfaceUniqId}-scene-code-mirror`"
          :selfKey="`${interfaceUniqId}-scene-code-mirror`">
        </code-mirror>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="selfDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAddOrUpdateScene">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

import { sceneService } from '@/api'
import CodeMirror from '../CodeMirror'
import { validateJSON } from '@/utils/helper'
import { messageWrapper } from '@/utils/message'

export default {
  props: ['dialogType', 'dialogVisible', 'dialogData'],
  components: {
    'code-mirror': CodeMirror
  },
  watch: {
    interfaceUniqId (newVal, oldVal) {
      this.hasChange = true
    },
    dialogVisible () {
      this.selfDialogVisible = this.dialogVisible
    },
    selfDialogVisible () {
      this.$emit('update:dialogVisible', this.selfDialogVisible)
    }
  },
  data () {
    return {
      hasChange: false,
      selfDialogVisible: false,
      form: {
        interfaceUniqId: '',
        sceneName: '',
        uniqId: '',
        data: {}
      },
      rules: {
        sceneName: [
          { required: true, message: '请输入场景名称', trigger: 'blur' }
        ],
        data: [
          { required: true, message: '请输入场景数据', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapState({
    interfaceUniqId: state => state.interfaceUniqId
  }),
  methods: {
    // 打开对话框时
    handleDialogOpen () {
      this.$nextTick(() => {
        this.form.data = this.dialogData.data || {}
        this.form.uniqId = this.dialogData.uniqId || ''
        this.form.sceneName = this.dialogData.sceneName || ''
        this.form.interfaceUniqId = this.interfaceUniqId || ''
        const codeMirrorEditor = this.$refs[`${this.interfaceUniqId}-scene-code-mirror`].codeMirrorEditor
        const totalLines = codeMirrorEditor.lineCount()
        codeMirrorEditor.doc.setValue(JSON.stringify(this.form.data))
        codeMirrorEditor.autoFormatRange({
          line: 0, ch: 0
        }, {
          line: totalLines
        })
      })
    },
    // 确认添加或更新场景
    confirmAddOrUpdateScene () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const codeMirrorEditor = this.$refs['code-mirror'].codeMirrorEditor
          const { data, error } = validateJSON(codeMirrorEditor.doc.getValue())
          if (error) {
            this.$message.error('JSON 格式错误，请检查后提交')
          } else {
            this.form.data = data
            if (this.dialogType === 'add') {
              const addPromise = sceneService.addScene.bind(null, this.form)
              messageWrapper('新增', addPromise, () => {
                this.$emit('add-or-update-success')
                this.selfDialogVisible = false
              })
            } else {
              const updatePromise = sceneService.updateScene.bind(null, this.form)
              messageWrapper('更新', updatePromise, () => {
                this.$emit('add-or-update-success')
                this.selfDialogVisible = false
              })
            }
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
