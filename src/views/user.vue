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
           <!-- 绑定添加用户的事件 -->
        <el-button @click="showAddUserDia()" type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 展示添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdduser">
        <el-form :model="formData">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="formData.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="formData.password" autocomplete="off"></el-input>

            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="formData.email" autocomplete="off"></el-input>

            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="formData.mobile" autocomplete="off"></el-input>

            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdduser = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdituser">
        <el-form :model="formData">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input disabled v-model="formData.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="formData.email" autocomplete="off"></el-input>

            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="formData.mobile" autocomplete="off"></el-input>

            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdituser = false">取 消</el-button>
            <el-button type="primary" @click="editUser()">确 定</el-button>
        </div>
    </el-dialog>
     <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleSetrole">
        <el-form :model="formData">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                {{currUserName}}
            </el-form-item>

            <el-form-item label="角色" :label-width="formLabelWidth">
              <!-- el-select的v-model绑定的值如果和el-option的value值 一样
                就显示当前el-option的label
                注意: currRoleId是数值
               -->
                <el-select v-model="currRoleId">
                  <!-- 请选择 -->
                  <el-option disabled label="请选择" :value="-1">

                  </el-option>
                  <!-- 遍历数组 -->
                    <el-option v-for="(item,index) in roles"
                    :label="item.roleName"
                    :key="index"
                    :value="item.id">
                    </el-option>
                </el-select>

            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleSetrole = false">取 消</el-button>
            <el-button type="primary" @click="setRole()">确 定</el-button>
        </div>
    </el-dialog>
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
          <el-table-column label="用户状态" width="180">
            <!-- 单元格内容不是字符串的时候,如果是其他 组件比如是开关,需要在组件的外面加一个容器,名字叫template -->
            <template slot-scope ="scope">
              <!-- slot-scope是用来传值的,scope是随便命名的 -->
              <!-- scope是list scope.row是list中的每一个元素,这里i是{} -->
                <el-switch
                  @change="changeSwitchMgstate(scope.row)"
                  v-model="scope.row.mg_state"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
            </template>  
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" circle
              @click="showEditBox(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" circle
              @click="showDeleBox(scope.row.id)"></el-button>
              <el-button type="success" icon="el-icon-check" size="mini" circle @click="showRoleBox(scope.row)"></el-button> 
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
      searchVal: '',
      // 添加用户对话框的属性
      dialogFormVisibleAdduser: false,
      // 表单数据
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 对话框中input宽度
      formLabelWidth: '100px',
      // 编辑用户对话框属性
      dialogFormVisibleEdituser: false,
      // 分配权限对话框属性
      dialogFormVisibleSetrole: false,
      // 当前用户名
      currUserName: '',
      // 当前的角色名
      currRoleId: -1,
      // 所有角色(主管/测试角色...)
      roles: [],
      // 用户id
      currUserId: -1
    }
  },
  created () {
    this.loadTableData()
  },
  methods: {
    // 分配权限 -发送请求
    async setRole() {
      // 发送请求
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId
      })
      // console.log(res)
      const {
        meta: { status, msg }
      } = res.data
      // 提示框
      this.$message.success(msg)
      // 关闭对话框
      this.dialogFormVisibleSetrole = false
      // users/:id/role   (rid:角色id)
      // 重置
      this.currRoleId = -1

    },
    // 分配权限 - 显示对话框
    async showRoleBox(user) {
      this.currUserId = user.id
      this.currUserName = user.username
      this.dialogFormVisibleSetrole = true
      const res = await this.$http.get('roles')
      // console.log(res)

      const res2 = await this.$http.get(`users/${user.id}`)
      console.log(res2);
      // console.log(res2.data.data.rid)
      // 接口文档有问题!!
      this.currRoleId = res2.data.data.rid


      this.roles = res.data.data
      // console.log(this.roles)
    },
    // 编辑用户 - 发送请求
    async editUser() {
      // 关闭对话框
      this.dialogFormVisibleEdituser = false
      // this.formData.id
      // 发送请求 put
      const res = await this.$http.put(
        `users/${this.formData.id}`,
        this.formData
      )
      // console.log(res)
      this.loadTableData()
      this.$message.success(res.data.meta.msg)
    },
    // 编辑用户 - 显示对话框
    async showEditBox(userId) {
      // 显示对话框
      this.dialogFormVisibleEdituser = true
      // 发送请求
      const res = await this.$http.get(`users/${userId}`)
      // console.log(res)
      this.formData = res.data.data

      // 提示框
    },
    // 添加用户
    async addUser() {
      // 关闭对话框
      this.dialogFormVisibleAdduser = false
      // 发送请求
      const res = await this.$http.post('users', this.formData)
      // console.log(res)
      const {
        meta: { status, msg }
      } = res.data
      // 刷新视图
      this.loadTableData()
      // 提示框
      this.$message.success(msg)
      // 清空表单
      // this.formData.username = ''
      // this.formData = {}
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = ''
        }
      }
    },
    // 显示添加的对话框
    showAddUserDia() {
      this.dialogFormVisibleAdduser = true
    },
    // 列表内的删除功能
     showDeleBox(userId) {
      this.$confirm('Sure?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${userId}`)
          // console.log(res)
          const {
            meta: { msg, status }
          } = res.data
          if (status === 200) {
            // 刷新表格
            this.loadTableData()
            // 提示框
            this.$message({
              type: 'success',
              message: msg
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: msg
          })
        })
    },
    // 用户的状态
    async changeSwitchMgstate (user) {
      // 请求路径：users/:uId/state/:type
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      )
      const {
        meta: { status,msg}
      } = res.data 
      if (status === 200) {
        //提示框
        this.$message.success(msg)
      }else {
      }
    },
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
