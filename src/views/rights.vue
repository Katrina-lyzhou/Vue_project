<template>
    <el-card class="box-card">
        <!-- 设置面包屑,传值 -->
        <my-bread level1="权限管理" level2="权限列表"></my-bread>
         <!-- 表格 -->
        <el-table
            class="table"
            :data="list"
            height="500"
            border
            style="width: 100%">
            <el-table-column
            type="index"
            label="#"
            width="80">
            </el-table-column>
            <el-table-column
            prop="authName"
            label="权限名称"
            width="100">
            </el-table-column>
            <el-table-column
            prop="path"
            label="路径"
            width="80">
            </el-table-column>
            <el-table-column
            prop="level"
            label="层级"
            width="80">
             <!-- level==='0' 一级 -->
                <template slot-scope="scope">
                    <!-- scope.row.level -->
                    <span v-if="scope.row.level==='0'">一级</span>
                    <span v-else-if="scope.row.level==='1'">二级</span>
                    <span v-else-if="scope.row.level==='2'">三级</span>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
   
  
</template>
<script>
export default {
    data () {
        return {
            list:[]
        }
    },
    created () {
        this.loadTableData()
    },
    methods: {
        async loadTableData() {
            // 请求路径：rights/:type get

            // 需要验证token  一次性的设置,见http.js
            const res = await this.$http.get(`rights/list`)
            console.log(res)
            this.list = res.data.data
        }
    }
}
</script>
<style>
.box-card {
  height: 100%;
}
.table{
  margin-top: 20px;
}
</style>
