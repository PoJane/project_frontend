<script>
import { getPositionDataWithUnit } from 'element-plus';
import Header from './items/Header.vue';
import Comment from './items/Comment.vue';

export default ({
    data() {
        return {
            //卡片id
            id:0,
            //评论数
            count:0,
            //评论数组
            comments:[],
            //发布评论
            newComment:'',
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
        }
    },
    components:{
        Header,Comment
    },
    created(){
        
    },
    methods: {
        //获取路由参数
        getQuery(){
            this.id=this.$router.currentRoute.value.query.cardId
            console.log(this.id)
        },
        //根据id获得卡片
        getCardById(id) {
            const token = this.$store.state.token
            this.axios({
                method: 'get',
                url: '/get_card',
                headers: { 'token': token },
                params: {
                    cardId: id
                }
            }).then(res => {
                //设置卡片内容
                this.card=res.data.data
                //获得点赞数
                this.getCardLike(id)
                //获得评论数
                this.getCommentCount(id)
                
            }).catch(err => {
                console.log(err)
            })
        },
        //获取各卡片点赞数,本vue加载后启用
        getCardLike(id) {
            const token = this.$store.state.token
            this.axios({
                method: 'get',
                url: '/like_count',
                headers: { 'token': token },
                params: {
                    cardId: id
                }
            }).then(res => {
                this.card.cardLike=res.data
                //获取作者信息
                this.getCardAuthor()
            }).catch(err => {
                console.log(err)
            })
        },
        //获取卡片发布者详细信息,mouted启用
        getCardAuthor() {
            const id = this.card.userId
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
                this.userDetail = res.data.data
                //console.log(this.userDetail)
            }).catch(err => {
                console.log(err)
            })
        },
        //根据评论数目和设置所有评论
        setComments(){
            const token = this.$store.state.token
            this.axios({
                method: 'get',
                url: 'get_comments',
                headers: { 'token': token },
                params: {
                    'cardId':this.card.cardId
                }
            }).then(res => {
                //返回数组设置到本组件comments数组
                this.comments=res.data.data
                console.log(this.comments)
            }).catch(err => {
                console.log(err)
            })
        },
        //获取对应卡片评论数，设置评论
        getCommentCount(id){
            const token = this.$store.state.token
            //获取数据库中的卡片数目
            this.axios({
                method: 'get',
                url: 'get_comment_count',
                headers: { 'token': token },
                params:{
                    'cardId':id
                }
            }).then(res => {
                //设置本卡片评论数
                this.count=res.data.data
                //设置评论
                this.setComments()
                
            }).catch(err => {
                console.log(err)
            })
        },
        //发布评论
        createComment(){
            if(this.newComment!=''){
                const token = this.$store.state.token
                this.axios({
                    method: 'post',
                    url: '/add_comment',
                    headers: { 'token': token },
                    data: {
                        'cardId':this.card.cardId,
                        'userId': this.$store.state.user.userId,
                        'commentText':this.newComment
                    }
                }).then(res => {
                    console.log(res)
                    this.newComment=''
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    },
    mounted() {
        this.getQuery()
        this.getCardById(this.id)
    }
})
</script>

<template>
    <Header />
    <el-card>
        <div class="top">
            <!--发布者头像-->
            <el-avatar :size="40" :src="userDetail.userImage"/>
            <!--卡片标题-->
            <span>{{ card.cardHead }}</span>
        </div>
        <div class="middle">
            <!--卡片图片-->
            <el-image :src="card.cardImage" class="image"></el-image>
        </div>
        <div class="middle">
            <!--卡片文本-->
            <el-text>{{ card.cardText }}</el-text>
            </div>
        <div class="bottom">
            <!--创建时间-->
            <el-text>{{ card.cardTime }}</el-text>
            <!--点赞-->
            <el-popover placement="bottom" trigger="click" :content="likeMsg">
                <template #reference>
                    <el-button type="danger" circle :icon="Star" class="button" size="large" @click="clickLike" plain>{{ card.cardLike }}</el-button>        
                </template>
            </el-popover>
        </div>
    </el-card>
    <div>
        <!--展示所有评论-->
        <el-row v-for="(o, i) in comments.length" :key="o" :span="7" :offset="i > 0 ? 5 : 0">
            <Comment :commentProp="comments[i]"/>
        </el-row>
    </div>
    <!--发布评论-->
    <el-card>
        <el-input v-model="newComment" maxlength="50" placeholder="写下评论" show-word-limit type="textarea"/>
        <el-button class="bottom" type="success" @click="createComment()">发布</el-button>
    </el-card>
    

</template>

<style scoped>
.el-card{
    padding-top: 10px;
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
    margin-left: 20%;
    width: 50%;
    display: block;
}
</style>