<script lang="ts">
/**
 * 用户上传头像
 */
import { ref } from 'vue'
import { ElMessage, UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

export default ({
    data() {
        return {
            //imageUrl: 'http://127.0.0.1:8081/images/1.png',
            imageUrl:'',
            oldUrl:''
        }
    },
    methods:{
        //删除原头像
        deleteOrgImage(oldUrl){
            const token=this.$store.state.token
            this.axios({
                method:'get',
                url: '/delete_avatar',
                headers:{'token':token},
                params: {
                    imageUrl:oldUrl
                }
            }).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        },
        handleAvatarSuccess(response,uploadFile){
            //console.log(response)
            const token=this.$store.state.token
            this.imageUrl = URL.createObjectURL(uploadFile.raw)
            this.userDetail = this.$store.state.userDetail
            //console.log(uploadFile.raw)
            this.axios({
                method: 'post',
                url: 'upload_avatar',
                headers: { 'token': token, 'Content-Type': 'multipart/form-data;charset=utf-8' },
                data: {
                    'file': uploadFile.raw,
                }
            }).then(res => {
                //打印服务器返回结果
                console.log(res)
                //图片上传成功
                if(res.data.code==200){
                    //接受服务器传回的图片url
                    this.imageUrl = res.data.data

                    //将改变的url传递给父组件UserEditCard
                    this.$emit('getUserImage', this.imageUrl)
                    
                    //删除原头像
                    this.deleteOrgImage(this.oldUrl)
                }else{
                    console.log("上传失败")
                }
            }).catch(err => {
                console.log(err)
            })
        },
       beforeAvatarUpload(rawFile){
            if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error('头像不能超过 2MB!')
                return false
            }
            return true
       }
    },
    mounted(){
        this.imageUrl=this.$store.state.userDetail.userImage
        this.oldUrl=this.$store.state.userDetail.userImage
        console.log(this.oldUrl)
    }
})
</script>

<template>
    <el-upload class="avatar-uploader" action="http://localhost:8081/upload_avatar"
        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
