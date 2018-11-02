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
          :data="list"
          style="width: 100%">
          <!-- 序号 -->
          <el-table-column
          type="index"
          label="#"
          width="100">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            prop="moblie"
            label="电话"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date_time"
            label="创建日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="mg_state"
            label="用户状态"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="操作"
            width="300">
          </el-table-column>
    </el-table>

  </el-card>
</template>
<script>
export default {
  data () {
    return {
      // tableData: [{
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1517 弄'
      // }, {
      //   date: '2016-05-01',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1519 弄'
      // }, {
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1516 弄'
      // }]
      list: []
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    async loadTableData () {
      this.loading = true
      //  除啦登陆功能,其他功能的接口都穾加入token 才能请求
      //  header添加token
      const AUTH_TOKEN = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?pagenum=1&pagesize=10`)
      console.log(res)
      const {meta:{msg, status}, data:{users}} = res.data
      if (status === 200) {
        this.list = users
        console.log(this.list)
      }
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
