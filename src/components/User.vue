<script>
import { ref } from 'vue';
import Header from './items/Header.vue'
import UserLookCard from './items/UserLookCard.vue'
import UserEditCard from './items/UserEditCard.vue'
import AccountLookCard from './items/AccountLookCard.vue'
import AccountEditCard from './items/AccountEditCard.vue';
import { Message,Setting,Menu} from '@element-plus/icons-vue'


export default({
    data(){
        return{
            //用户登录信息
            user: {
                password: '',
                userEmail: '',
                userId: 0,
                userName: ''
            },
            //用户详细信息
            userDetail:{
                userBirth: '',
                userId: 0,
                userImage: '',
                userIntro: '',
                userName: '',
                userSex: ''
            },
            //抽屉引用
            userEditCard_drawer: ref(false),
            userLookCard_drawer:ref(false),
            accountLookCard_drawer:ref(false),
            accountEditCard_drawer:ref(false)
        }
    },
    components:{
        Header,Message,Setting,Menu,UserLookCard,UserEditCard,AccountLookCard,AccountEditCard
    },
    computed:{
    },
    methods:{
        //设置本用户登录信息
        setUser(){
            this.user=this.$store.state.user
        },
        clickItem() {
            this.isActive = !this.isActive
        }
        
    },
    mounted(){
        this.setUser()
    }
})
</script>

<template>
    <Header />
    <div>
        <el-container>
            <el-aside>
                <el-scrollbar>
                    <el-menu :default-openeds="['1', '3']">
                        <el-sub-menu index="1">
                        <template #title>
                            <el-icon><setting /></el-icon>我的资料
                        </template>
                        <el-menu-item-group>
                        <template #title>个人信息</template>
                            <el-menu-item index="1-1" @click="userLookCard_drawer = true">查看资料</el-menu-item>
                            <el-menu-item index="1-2" @click="userEditCard_drawer = true">编辑资料</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="账户信息">
                            <el-menu-item index="1-3" @click="accountLookCard_drawer=true">查看账户</el-menu-item>
                            <el-menu-item index="1-4" @click="accountEditCard_drawer = true">编辑账户</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>

                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><Menu /></el-icon>我的收藏
                        </template>
                        <el-menu-item-group>
                            <template #title>收藏内容</template>
                            <el-menu-item index="2-1">收藏卡片</el-menu-item>
                            <el-menu-item index="2-2">收藏社区</el-menu-item>
                            <el-menu-item index="2-3">收藏评论</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>

                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon><message /></el-icon>我的消息
                        </template>
                        <el-menu-item-group>
                            <template #title>关注内容</template>
                            <el-menu-item index="3-1">收到私信</el-menu-item>
                            <el-menu-item index="3-2">收到消息</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="通知">
                            <el-menu-item index="3-3">获得点赞</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            
            <el-main>
                <UserLookCard v-model="userLookCard_drawer"/>
                <UserEditCard v-model="userEditCard_drawer"/>
                <AccountLookCard v-model="accountLookCard_drawer"/>
                <AccountEditCard v-model="accountEditCard_drawer" />
            </el-main>

        </el-container>
    </div>
</template>

<style>
.active{
    display: block;
}
.not-active{
    display: none;
}
</style>