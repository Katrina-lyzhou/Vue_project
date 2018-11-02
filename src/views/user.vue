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
     <!-- 添加加载动画loading -->
       <el-table
          v-loading="loading"
          :data="list"
          style="width: 100%">
          <!-- 序号 -->
          <el-table-column type="index" label="#" width="100">
          </el-table-column>
          <el-table-column prop="username" label="姓名" width="80">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="moblie" label="电话" width="180">
          </el-table-column>
          <el-table-column label="创建日期" width="180">
            <template slot-scope="scope">
              {{scope.row.create_time | fmtDate}}
            </template>
          </el-table-column>
          <el-table-column prop="mg_state" label="用户状态" width="180">
            <!-- 单元格内容不是字符串的时候,如果是其他 组件比如是开关,需要在组件的外面加一个容器,名字叫template -->
            <template slot-scope ="scope">
              <!-- slot-scope是用来传值的,scope是随便命名的 -->
              <!-- scope是list scope.row是list中的每一个元素,这里i是{} -->
                <el-switch
                  v-model="scope.row.mg_state"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
            </template>  
          </el-table-column>
          <el-table-column prop="date" label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
              <el-button type="success" icon="el-icon-check" size="mini" circle></el-button> 
            </template>
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
      list: [],
      // 添加加载动画
      loading: true
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    async loadTableData () {
      // 在发送请求之前,转圈
      this.loading = true
      //  除啦登陆功能,其他功能的接口都穾加入token 才能请求
      //  header添加token
      const AUTH_TOKEN = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?pagenum=1&pagesize=10`)
      console.log(res)
      const {meta:{msg, status}, data:{users}} = res.data
      if (status === 200) {
        // 如果请求成功以后不加载
        this.loading = false
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
