/**
 * vue全局配置
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'

const app=createApp(App)

//将axios挂载至全局
app.config.globalProperties.$http=axios
//axios请求根路径
axios.defaults.baseURL='http://localhost:8081'

/**
 * 路由拦截导航
 * 导航到不被拦截的路由：可前往next
 * 导航到被拦截路由：前往next（有token时），跳转登录页（无token时）
 */
router.beforeEach((to,from,next)=>{
    if(to.meta.requireAuth){ //被拦截
        //从store中获取存储
        var token=store.state.token
        if(token!=null&&token!=''){
            //有token
            console.log('store token: '+token)
            next()
        }else{
            //无token
            console.log(token)
            next('/login')
        }
    }else{
        //未被拦截
        console.log("next")
        next()
    }
})

//挂载
app.use(router)
app.use(VueAxios,axios)
app.use(ElementPlus)
app.use(store)
app.mount('#app')