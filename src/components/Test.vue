<script>
import Header from './items/Header.vue'
import EditArticle from './items/EditArticle.vue'

export default {
    data() {
        return {
            //从服务器接受的消息
            result: {
                code: 0,
                message: "",
                data: ""
            }
        }
    },
    components:{
        Header,EditArticle
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
        getCard(){
            this.axios({
                method:'post',
                url: '/search_card',
                data: {
                    cardHead:"测试"
                }
            }).then(res=>{
                this.result=res.data
                console.log(this.result)
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted:{
        
    }
}
</script>

<template>
</template>

<style>
/*布局容器*/
.el-main{
    color: black;
    text-align: center;
}
.el-footer{
    background-color: whitesmoke;
}

</style>