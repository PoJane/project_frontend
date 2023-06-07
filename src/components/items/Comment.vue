<script>
import { Star } from '@element-plus/icons-vue'

export default ({
    data() {
        return {
            isStar: false,
            Star, 
            //用户详细信息
            userDetail: {
                userBirth: '',
                userId: 0,
                userImage: '',
                userIntro: '',
                userName: '',
                userSex: ''
            },
            //评论信息
            comment:{
                cardId:0,
                commentId:'',
                commentLike:0,
                commentText:'',
                commentTime:'',            
                userId:0
            }
        }
    },
    //接受父组件CardPage.vue的传参
    props:{
        commentProp: {
            cardId: Number,
            commentId: String,
            commentLike: Number,
            commentText: String,
            commentTime: String,
            userId: Number
        }
    },
    //动态监测传参变化
    watch: {
        commentProp: {
            handler(newV) {
                this.comment = JSON.parse(JSON.stringify(newV))
            },
            deep: true
        }
    },
    methods: {
        //获得评论发布者的信息
        
        getCommentAuthor(){
            const id = this.commentProp.userId
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
        }
    },
    mounted() {
        this.getCommentAuthor()
    }
})
</script>

<template>
    <!--评论展示-->
    <el-card>
        <div class="=top">
            <!--发布者头像-->
            <el-avatar :size="40" :src="userDetail.userImage"/>
            <!--评论内容-->
            <el-text truncated>{{ commentProp.commentText }}</el-text>
        </div>

        <div class="bottom">
            <el-text>{{ commentProp.commentTime }}</el-text>
            <!--点赞-->
            <el-popover placement="bottom" trigger="click" :content="likeMsg">
                <template #reference>
                    <el-button type="danger" circle :icon="Star" class="button" size="small" plain>0</el-button>        
                </template>
            </el-popover>
        </div>
    </el-card>
</template>

<style scoped>
.bottom {
    margin-top: 10px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.top{
    margin-top: 10px;
    margin-right: 10px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-card{
    width: 100%;
}
</style>