<script>
import {ref} from 'vue'
import Header from './items/Header.vue'
export default {
    data() {
        return {
            //从服务器接受的消息
            result: {
                code: 0,
                message: "",
                data: ""
            },
            //走马灯显示图片
            srcList: [
                ' http://localhost:8081/images/1/1685772934986.png',
                ' http://localhost:8081/images/1/1685773125375.png',
                ' http://localhost:8081/images/100000005/1685773578732.png',
                'http://localhost:8081/images/100000005/1685774815486.png',
                ' http://localhost:8081/images/100000005/1685775044695.png',
                'http://localhost:8081/images/100000005/1685776044526.png',
            ],
            //时间
            currentDate:ref(new Date()),
        }
    },
    components:{
        Header
    },
    methods: {
        //从后端api获取数据至result，此处无请求参数
        showResult() {
            var _this = this
            _this.$http.get('/home')
                .then(res => {
                    console.log(res)
                    _this.result = res.data
                })
                .catch(err => {
                    console.error(err);
                })
        },
        //Login菜单栏登录路由跳转
        toLogin(){
            this.$router.push("/login")
        },
        //跳转注册
        toRegister(){
            this.$router.push("/register")
        }
    }
}
</script>

<template>
    <div>
        <el-container>
            <!--首页头组件-->
            <Header />
            <!--首页主体内容-->
            <el-main>
                <h1>Home</h1>
                <!--走马灯卡片展示-->
                <el-carousel :interval="3000" type="card" height="400px">
                    <el-carousel-item v-for="i in srcList.length" :key="i"> 
                        <el-image class="image" :src="srcList[i-1]" fit="fill"/>
                    </el-carousel-item>
                </el-carousel>
                <!--登录注册按钮-->
                <el-row justify="center">
                    <el-button size="large" type="success" round @click="toLogin">Sign In</el-button>
                    <el-button size="large" type="success" round @click="toRegister">Sign Up</el-button>
                </el-row>
            </el-main>
            <!--首页尾-->
            <el-footer>
                <div>
                    <el-text>About</el-text>
                </div>
                <div>
                    <el-text>Web课程大作业---Spring Boot+Vue社区交流网站</el-text>
                </div>
                <div>
                    <el-text>作者: 1191200314凌玉蝶, ???&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp班级: 数媒2003</el-text>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<style scoped>
/*布局容器*/
.el-main{
    color: black;
    text-align: center;
}
.el-footer{
    background-color: whitesmoke;
    margin: 10px;
}

/*走马灯卡片展示*/
.el-carousel__item h3{
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/*走马灯展示图片*/
.image {
    width: 100%;
    height: 100%;
    display: block;
}

/*登录注册按钮行*/
.button-row{
    text-align: center;
}

</style>