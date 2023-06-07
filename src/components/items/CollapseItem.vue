<script>
    import Card from './Card.vue' 
    export default({
        methods:{
            clickMenuItem(){
                alert("Open panel!");
            },
            createPanel(){

            },
            createCard(){
                
            }
        }
    })
</script>

<template>
    <el-container>
        <el-aside>
            <el-menu :default-openeds="['1', '3']">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><setting /></el-icon>我的资料
                </template>
                <el-menu-item index="1-1" @click="clickMenuItem">查看资料</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
    </el-container>
</template>