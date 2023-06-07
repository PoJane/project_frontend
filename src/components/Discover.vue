<script>
import {computed,ref } from 'vue'
import { Search,Plus } from '@element-plus/icons-vue'
import Header from './items/Header.vue'
import Card from './items/Card.vue'
import EditArticle from './items/EditArticle.vue'

const count = ref(10)
const loading = ref(false)
const noMore = computed(() => count.value >= 20)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
    loading.value = true
    setTimeout(() => {
        count.value += 2
        loading.value = false
    }, 2000)
}

export default {
    data() {
        return {
            //从服务器接受的消息
            result: {
                code: 0,
                message: "",
                data: ""
            },
            //时间
            currentDate: ref(new Date()),
            //搜索框输入文本
            inputStr: ref(''),
            //无限列表参数
            count:ref(10),
            loading:ref(false),
            //展示内容长度
            length:ref(5),
            //默认显示
            dialogFormVisible : ref(false),
            //cards索引
            index:ref(0),
            //卡片对象结构
            card: {
                cardId: 0,
                userId: 0,
                cardHead: '',
                cardTime: '',
                cardImage: '',
                cardText: '',
                cardLike: 0
            },
            //card数组,存放获得的卡片
            cards:[],
            //图标
            Search,Plus
        }
    },
    components:{
        Header,Card,EditArticle
    },
    methods: {
        //获取各卡片点赞数
        getCardLike(id,i) {
            const token = this.$store.state.token
            this.axios({
                method: 'get',
                url: '/like_count',
                headers: { 'token': token },
                params: {
                    cardId: id
                }
            }).then(res => {
                this.cards[i].cardLike=res.data
            }).catch(err => {
                console.log(err)
            })
        },
        //设置卡片数组里的卡片
        setCards(len){
            const token = this.$store.state.token
            this.axios({
                method:'get',
                url: 'get_cards',
                headers: { 'token': token },
                params: {
                    length:len
                }
            }).then(res=>{
                //返回数组设置到本组件cards数组
                this.cards=res.data.data
                for(let i=0;i<len;i++){
                    this.getCardLike(this.cards[i].cardId,i)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        //获取卡片数目
        getCards(){
            const token = this.$store.state.token
            //获取数据库中的卡片数目
            this.axios({
                method:'get',
                url: 'get_count',
                headers:{'token':token},
            }).then(res=>{
                this.length=res.data.data
                //获得卡片，设置到数组
                this.setCards(this.length)
            }).catch(err=>{
                console.log(err)
            })
        },
        //获取对话框状态
        getDialogFormVisible(visible){
            this.dialogFormVisible=visible
        }
    },
    mounted(){
        this.getCards()
    }
}
</script>

<template>
    <Header />
    <div class="common-layout">
        <el-affix :offset="120">
            <el-button type="success" @click="dialogFormVisible=true" circle :icon="Plus" size="large"></el-button>
        </el-affix>
            <el-dialog v-model="dialogFormVisible" title="编辑文章">
                <EditArticle @getVisible="getDialogFormVisible"/>        
            </el-dialog>
        <el-container>
            <!--首页头组件-->
            <!--首页主体内容-->
            <el-main>
                <h1>Discover</h1>
                <!--延迟加载内容-->
                <!--<el-row v-for="(o, index) in 5" :key="o" :span="7" :offset="index > 0 ? 5 : 0">-->
                <!--</el-row>-->
                <el-row v-for="(o,i) in cards.length" :key="o" :span="7" :offset="i>0?5:0">
                    <!--<Card :id="index+1"/>-->
                    <Card :cardProp="cards[i]"/>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<style>
    .el-main{
        color: black;
        text-align: center;
        height: 100%;
    }

/*无限列表*/
    .infinite-list-wrapper {
    height: 100%;
    text-align: center;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
</style>