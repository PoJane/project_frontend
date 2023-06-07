<script>
import {Star} from '@element-plus/icons-vue'

export default({
    data(){
        return{
            isStar:false,
            Star,
            //卡片
            card: {
                cardId: 0,
                userId: 0,
                cardHead: '',
                cardTime: '',
                cardImage: '',
                cardText: '',
                cardLike: 0
            },
            //用户详细信息
            userDetail: {
                userBirth: '',
                userId: 0,
                userImage: '',
                userIntro: '',
                userName: '',
                userSex: ''
            },
            //动态点赞、取消点赞
            likeRes:{
                code:0,
                name:'', //消息
                data:'' //点赞数
            },
            likeMsg:'You Click Like!',
        }
    },
    //接受Discover页面的参数
    props:{
        cardProp:{
            cardId:Number,
            userId:Number,
            cardHead:String,
            cardTime:String,
            cardImage:String,
            cardText:String,
            cardLike:Number
        }
    },
    //动态监测传参变化
    watch:{
        cardProp:{
            handler(newV){
                this.card=JSON.parse(JSON.stringify(newV))
            },
            deep:true
        }
    },
    methods:{
        //点赞与取消点赞
        clickLike(){
            const token = this.$store.state.token
            const cid=this.cardProp.cardId
            const uid=this.cardProp.userId
            this.axios({
                method:'get',
                url: '/like',
                headers:{'token':token},
                params: {
                    cardId:cid,
                    userId:uid
                }
            }).then(res=>{
                //获取后端点赞数以及消息
                this.cardProp.cardLike=res.data.data
                this.likeMsg=res.data.name
            }).catch(err=>{
                console.log(err)
            })
            
        },
        //获取卡片发布者详细信息
        getCardAuthor(){
            const id = this.cardProp.userId
            const token = this.$store.state.token
            this.axios({
                method: 'get',
                url: '/show_user',
                headers: { 'token': token },
                params: {
                    'id': id
                }
            }).then(res => {
                //设置到本卡片中
                this.userDetail=res.data.data
                //console.log(this.userDetail)
            }).catch(err => {
                console.log(err)
            })
        },
        //前往发布者主页
        toAuthorDetail(){
            console.log("You click author's avatar!")
        },
        //前往文章详情
        toCardPage(){
            console.log("You click card's main!")
            const id=this.cardProp.cardId
            this.$router.push({
                path:'/get_card',
                query:{
                    cardId:id
                }
            })
        },
        //获取传参id
        getProps(){
            console.log("Card: "+this.cardProp)
        }
    },
    mounted(){
        this.getCardAuthor()
    }
})
</script>

<template>
    <el-card>
        <div class="top">
            <!--发布者头像-->
            <el-avatar :size="40" :src="userDetail.userImage" @click="toAuthorDetail"/>
            <!--卡片标题-->
            <span>{{ cardProp.cardHead }}</span>
        </div>
        <div class="middle" @click="toCardPage">
            <!--卡片图片-->
            <el-image :src="cardProp.cardImage" class="image"></el-image>
            <!--卡片文本-->
            <el-text truncated="10">{{ cardProp.cardText }}</el-text>
        </div>
        <div class="bottom">
            <!--创建时间-->
            <el-text>{{ cardProp.cardTime }}</el-text>
            <!--点赞-->
            <el-popover placement="bottom" trigger="click" :content="likeMsg">
                <template #reference>
                    <el-button type="danger" circle :icon="Star" class="button" size="large" @click="clickLike" plain>{{ cardProp.cardLike }}</el-button>        
                </template>
            </el-popover>
            
        </div>
    </el-card>
</template>

<style>
.el-card{
    padding-bottom: 10px;
}

.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 10px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.middle{
    margin: 10px;
    display: flex;
}

.top{
    margin-top: 10px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
    text-align: center;
}

.image {
    width: 50%;
    display: block;
}
</style>