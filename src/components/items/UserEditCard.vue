<script>
import { ElDrawer,ElMessage } from 'element-plus'
import UploadAvatar from './UploadAvatar.vue'
import { ref } from 'vue'

export default ({
    data() {
        return {
            //用户登录信息
            user: {
                password: '',
                userEmail: '',
                userId: 0,
                userName: ''
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
            //element表单属性
            labelPosition: 'left',
            ruleForm: {
                userBirth: '',
                userId: 0,
                userImage: '',
                userIntro: '',
                userName: '',
                userSex: ''
            },
            //接受用户头像传参
            tempUrl:''
        }
    },
    components: {
        UploadAvatar
    },
    methods: {
        //获取本地存储的userDetail,赋予本组件
        setUserDetail() {
            this.userDetail = this.$store.state.userDetail
            console.log(this.userDetail)
        },
        //编辑用户信息
        updateUserDetail(){
            this.changeUserDetail()
            console.log(this.userDetail)
            const token=this.$store.state.token
            const birth=this.userDetail.userBirth
            const intro= this.userDetail.userIntro
            const name= this.userDetail.userName
            const sex= this.userDetail.userSex
            const id= this.$store.state.userDetail.userId
            const image=this.userDetail.userImage
            
            //向后端提交修改
            this.axios({
                method:'post',
                url: 'update_detail',
                headers:{'token':token},
                data: {
                    userId:id,
                    userBirth:birth,
                    userIntro: intro,
                    userName: name,
                    userSex: sex,
                    userImage:image
                }
            }).then(res=>{
                console.log(res.data)
                if(res.data.code==200){
                    //同步到本地存储
                    this.$store.commit('setUserDetail',this.userDetail)
                }
            }).catch(err=>{
                console.log(err)
            })   
        },
        changeUserDetail() {
            //根据表单所填内容改变
            if(this.ruleForm.userBirth!=''){
                this.userDetail.userBirth= this.ruleForm.userBirth
            }
            if(this.ruleForm.userIntro!=''){
                this.userDetail.userIntro = this.ruleForm.userIntro
            }
            if (this.ruleForm.userName != '') {
                this.userDetail.userName = this.ruleForm.userName
            }
            if (this.ruleForm.userSex != '') {
                this.userDetail.userSex = this.ruleForm.userSex                
            }
            if(this.tempUrl!=''){
                this.userDetail.userImage=this.tempUrl
            }
            
        },
        //获取子组件传递的头像url
        getUrl(url){
            this.tempUrl=url
            console.log("tempUrl:")
            console.log(this.tempUrl)
        },
        //弹出提示
        messageBox(msg, title) {
            ElMessageBox.alert(msg, title, {
                confirmButtonText: '确认'
            });
        },
    },
    mounted() {
        this.setUserDetail()
    }
})
</script>

<template>
    <el-drawer :with-header="false" size="80%">
        <span>编辑资料</span>
        <el-card shadow="never">
            <el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <!--用户名-->
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName" clearable :placeholder="userDetail.userName"></el-input>
                </el-form-item>
                <!--性别-->
                <el-form-item label="性别" prop="userSex">
                    <el-radio-group v-model="userDetail.userSex">
                        <el-radio label="男" />
                        <el-radio label="女" />
                        <el-radio label="保密" />
                    </el-radio-group>
                </el-form-item>
                <!--生日-->
                <el-form-item label="生日" prop="userBirth">
                    <el-date-picker v-model="ruleForm.userBirth" type="date" :placeholder="userDetail.userBirth" :size="size"/>
                </el-form-item>
                <!--签名-->
                <el-form-item label="个性签名" prop="desc">
                    <el-input v-model="ruleForm.userIntro" type="textarea" :placeholder="userDetail.userIntro"/>
                </el-form-item>
                <!--编辑头像-->
                <el-form-item label="上传头像" prop="userImage">
                    <!--上传头像组件，接受传参-->
                    <UploadAvatar @getUserImage="getUrl"/>
                    <span>{{ tempUrl }}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="updateUserDetail">提交修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>
      </el-drawer>
</template>

<style>
.bottom {
    margin-top: 10px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.middle {
    margin-left: 20%;
    display: flex;
}

.top {
    margin-top: 10px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}</style>