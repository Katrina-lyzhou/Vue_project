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
        <!-- 需要获取搜索框内的数据 -->
           <el-input class="searchInput" clearable placeholder="请输入内容"
           v-model="searchVal">
           <!-- 绑定点击事件,触发搜索 -->
            <el-button slot="append" icon="el-icon-search"
             @click="checkUser()"></el-button>
           </el-input>
        <el-button type="success">添加用户</el-button>
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
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizechange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,4,6,8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      // 添加加载动画
      loading: true,
      // 声明分页的相关的变量
      pagenum:1,
      pagesize:2,
      currentPage: 1,
      total: 0,
      // 获取用户列表的搜索值
      searchVal: ''
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    // 用户搜索的事件调用
    checkUser () {
      this.loadTableData()
    },
    // 分页的相关方法
    // 1.每页多少数据的变化的变化
    handleSizechange(val) {
     console.log(`每页 ${val}条`)
     this.pagesize = val
     this.loadTableData()
    },
    // 2.翻页的变化
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.loadTableData()
    },
    async loadTableData () {
      // 在发送请求之前,转圈
      this.loading = true
      //  除啦登陆功能,其他功能的接口都穾加入token 才能请求
      //  header添加token
      const AUTH_TOKEN = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${
          this.searchVal}`)
      // console.log(res)
      this.total = res.data.data.total
      const {
        meta: {msg, status}, 
        data: {users}
        } = res.data
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
