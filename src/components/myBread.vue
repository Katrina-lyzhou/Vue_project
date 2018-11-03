<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    // 给面包屑命名
    name: 'my-bread',
    props: ['level1','level2']
}
</script>
<style>
    
</style>