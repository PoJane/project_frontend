<script>
    export default({
        data(){
            return{
                userImage: this.$store.state.userDetail.userImage,
                userName: this.$store.state.userDetail.userName
            }
        },
        methods:{
            //Explore-Discover菜单栏路由跳转
            toDiscover() {
                this.$router.push("/discover")
            },
            //跳转至社区
            toCommunity() {
                this.$router.push("/community")
            },
            //跳转至用户页
            toUser() {
                this.$router.push("/user")
            }
    }
    })
</script>

<template>
        <!--首页头-->
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <!--Home图标-->
                <el-menu-item index="1">Home</el-menu-item>
                <!--子级菜单-->
                <el-sub-menu index="2">
                    <template #title>Explore</template>
                        <el-menu-item index="2-1" @click="toUser">User</el-menu-item>
                        <el-menu-item index="2-2" @click="toDiscover">Discover</el-menu-item>
                        <el-menu-item index="2-3" @click="toCommunity">Community</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="3">
                    <el-avatar :size="50" :src="userImage" fit="fit" />
                </el-menu-item>
                <el-menu-item index="4">{{ userName }}</el-menu-item>
                
            </el-menu>
        </el-header>
</template>

<style>
/*布局容器*/
.el-header{
    background-color:green;
    width: 100%;
}
</style>