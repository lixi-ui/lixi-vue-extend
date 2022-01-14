<template>
  <div class="gp-pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :pager-count="5"
      :current-page="page"
      :page-size="pageSize"
      :total="total"
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
        type: Number,
        default: () => 5
      },
      page: {
        type: Number,
        default: () => 1
      },
      pageSize: {
        type: Number,
        default: () => 10
      },
      total: {
        type: Number,
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

<style scoped lang="scss">
  @import 'src/asset/scss/common.scss';
  @media only screen and (max-width: 1023px) {
    .gp-pagination{
      text-align: right;
      ::v-deep .el-pagination{
        padding: 0;
        .btn-prev, .btn-next, .el-pager li{
          font-size: r(13);
          font-weight: 400;
          width: r(32);
          min-width: r(32);
          height: r(32);
          line-height: r(30);
          border-radius: 50%;
          background-color: #fff;
          border: r(1) solid #CCCCCC;
          .el-icon{
            font-size: r(18);
          }
          &.active{
            border-color: $mainColor;
          }
        }
      }
    }
  }
  @media only screen and (min-width: 1024px) {
    .gp-pagination {
      text-align: right;
      ::v-deep .el-pagination{
        padding: 0;
        .btn-prev, .btn-next, .el-pager li{
          font-size: 13px;
          font-weight: 400;
          width: 36px;
          height: 36px;
          line-height: 34px;
          border-radius: 50%;
          border: 1px solid #CCCCCC;
          background-color: #fff;
          &.active{
            border-color: $mainColor;
          }
          .el-icon{
            font-size: 18px;
          }
        }
      }
    }
  }
</style>