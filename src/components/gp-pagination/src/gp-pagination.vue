<template>
  <div class="gp-pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :pager-count="5"
      :current-page="+page"
      :page-size="+pageSize"
      :total="+total"
      @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
  import { Pagination } from 'element-ui';
  export default {
    name: 'g-gp-pagination',
    components: {
      ElPagination: Pagination
    },
    props: {
      layout: {
        type: String,
        default: () => 'prev, pager, next'
      },
      pagerCount: {
        type: Number|String,
        default: () => 5
      },
      page: {
        type: Number|String,
        default: () => 1
      },
      pageSize: {
        type: Number|String,
        default: () => 10
      },
      total: {
        type: Number|String,
        default: () => 0
      },
    },
    methods: {
      currentChange(val) {
        this.$emit('currentChange', val);
      }
    }
  };
</script>
