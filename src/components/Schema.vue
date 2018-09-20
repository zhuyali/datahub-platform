<template>
  <div class="g-schema">
    <schema-item
      :from="from"
      type="request"
      :schema="reqSchema"
      @update-success="getAllSchema">
    </schema-item>
    <schema-item
      :from="from"
      type="response"
      :schema="resSchema"
      @update-success="getAllSchema">
    </schema-item>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { schemaService } from '@/api'
import SchemaItem from './SchemaItem'

export default {
  props: ['from'],
  components: {
    'schema-item': SchemaItem
  },
  watch: {
    interfaceUniqId () {
      this.getAllSchema()
    }
  },
  computed: {
    ...mapState({
      schemas: state => state.schemas,
      interfaceUniqId: state => state.interfaceUniqId
    }),
    reqSchema () {
      const schema = this.schemas.filter((schema) => {
        return schema.type === 'request'
      })[0] || {}
      return schema.data ? schema.data.schemaData : {}
    },
    resSchema () {
      const schema = this.schemas.filter((schema) => {
        return schema.type === 'response'
      })[0] || {}
      return schema.data ? schema.data.schemaData : {}
    }
  },
  methods: {
    // 获取所有的 schema 数据
    async getAllSchema () {
      const res = await schemaService.getAllSchema(this.interfaceUniqId)
      this.$store.dispatch('setSchemas', res.data || [])
    }
  }
}
</script>
