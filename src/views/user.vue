<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
           <el-input class="searchInput" clearable placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
           </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
       <el-table
      :data="tableData"
      style="width: 100%">
      <!-- 序号 -->
      <el-table-column
      type="index"
      width="50">
    </el-table-column>

      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

  </el-card>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    async loadTableData () {
      //  除啦登陆功能,其他功能的接口都穾加入token 才能请求
      //  header添加token
      const AUTH_TOKEN = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get('users?pagenum=1&pagesize=10')
      console.log(res)
    }
  }
}
</script>
<style>
.box-card{
  height: 100%;
}
.searchArea{
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .searchInput{
  width: 350px;
}
</style>
