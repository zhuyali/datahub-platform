<template>
  <div class="g-schema">
    <schema-item 
      type="request" 
      :schema="reqSchema" 
      @update-success="getAllSchema">
    </schema-item>
    <schema-item
      type="response" 
      :schema="resSchema"
      @update-success="getAllSchema">
    </schema-item>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { schemaService } from '@/api';
import SchemaItem from './SchemaItem';

export default {
  components: {
    'schema-item': SchemaItem
  },
  watch: {
    interfaceUniqId() {
      this.getAllSchema();
    }
  },
  data() {
    return {
      schemas: []
    }
  },
  computed: {
    ...mapState({
      interfaceUniqId: state => state.interfaceUniqId
    }),
    reqSchema() {
      const schema = this.schemas.filter((schema) => {
        return schema.type === 'request';
      })[0] || {};
      return schema.data ? schema.data.schemaData : {};

    },
    resSchema() {
      const schema = this.schemas.filter((schema) => {
        return schema.type === 'response';
      })[0] || {};
      return schema.data ? schema.data.schemaData : {};
    }
  },
  methods: {
    // 获取所有的 schema 数据
    async getAllSchema() {
      const res = await schemaService.getAllSchema(this.interfaceUniqId);
      this.schemas = res.data || [];
    }
  }
}
</script>
