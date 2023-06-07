/**
 * 路由配置
 * path: 页面url--component: 对应组件
 * meta: requireAuth: 未登录时是否需要拦截
 */
import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Discover from '../components/Discover.vue'
import User from '../components/User.vue'
import Community from '../components/Community.vue'
import Test from '../components/Test.vue'
import CardPage from '../components/CardPage.vue'
import UserDetail from '../components/UserDetail.vue'

const router=createRouter({
    history:createWebHistory(),
    routes:[
        //主页路由
        {
            path:'/home',
            component:Home
        },
        //登录路由
        {
            path:'/login',
            component:Login
        },
        //注册路由
        {
            path:'/register',
            component:Register
        },
        //用户信息页面
        {
            path:'/user',
            component:User,
            meta:{
                requireAuth:true
            }
        },
        //内容主页路由
        {
            path:'/discover',
            component:Discover,
            meta:{
                requireAuth:true
            }
        },
        //内容详情路由
        {
            path:'/get_card',
            component:CardPage
        },
        //社区路由
        {
            path:'/community',
            component:Community,
            meta:{
                requireAuth:true
            }
        },
        //测试页面
        {
            path:'/test',
            component:Test
        }

    ]
})
export default router