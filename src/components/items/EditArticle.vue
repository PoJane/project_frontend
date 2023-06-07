<script lang="ts">
/**
 * 编辑文章组件
 */
import { reactive,ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

export default ({
    data() {
        //标题输入验证
        var validateHead = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('标题不能为空'));
            } else {
                callback();
            }
        };
        //内容输入验证
        var validateText = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('内容不能为空'));
            } else {
                callback();
            }
        };
        return {
            //用户上传图片url
            imageUrl: '',
            
            //服务器返回结果
            result: {
                code: 0,
                message: "",
                data: ""
            },
            //提交卡片内容
            card: {
                userId: 0,
                cardHead: '',
                cardImage: '',
                cardText: '',
            },
            userDetail:{
                userBirth: '',
                userId: 0,
                userImage: '',
                userIntro: '',
                userName: '',
                userSex: ''
            },
            //表单属性
            form: {
                head: '',
                text: '',
                image:'',
            },
            
            //表单验证规则
            rules: {
                head: [
                    { validator: validateHead, trigger: 'blur' }
                ],
                text:[
                    {validator:validateText,trigger:'blur'}
                ]
            },
        }
    },
    
    components: {
        //图标
        Delete, Download, Plus, ZoomIn

    },
    methods: {
        setUserDetail(){
            this.userDetail=this.$store.state.userDetail
            console.log("In Edit Article:")
            console.log(this.userDetail)
        },
        //上传图片成功
        handleAvatarSuccess(response, uploadFile) {
            
            const token = this.$store.state.token
            this.imageUrl = URL.createObjectURL(uploadFile.raw)
            
            this.axios({
                method: 'post',
                url: 'upload_image',
                headers: { 'token': token, 'Content-Type': 'multipart/form-data;charset=utf-8' },
                data: {
                    'file': uploadFile.raw,
                    'userId': this.userDetail.userId
                }
            }).then(res => {
                //打印服务器返回结果
                console.log(res)
                //图片上传成功
                if (res.data.code == 200) {
                    //接受服务器传回的图片url
                    this.imageUrl = res.data.data
                    
                } else {
                    console.log("上传失败")
                }
            }).catch(err => {
                console.log(err)
            })
        },
        beforeAvatarUpload(rawFile) {
            if (rawFile.size / 1024 / 1024 > 10) {
                console.log("图片大小不能超过10MB!");
                return false
            }
            return true
        },
        //取消发布
        cancleSubmit(){
            const token = this.$store.state.token
            if(this.imageUrl!=''){
                this.axios({
                    method: 'get',
                    url: '/delete_image',
                    headers: { 'token': token },
                    params: {
                        imageUrl: this.imageUrl
                    }
                }).then(res => {
                    console.log(res)
                    
                }).catch(err => {
                    console.log(err)
                })
            }
            //向父组件Discover传参，关闭此对话框
            this.$emit('getVisible', false)  
        },
        //提交表单，发布内容
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const token=this.$store.state.token
                    const head = this.form.head
                    const text = this.form.text
                    const image=this.imageUrl
                    const id=this.$store.state.user.userId
                    this.axios({
                        method: 'post',
                        url: '/create_card',
                        headers:{'token':token},
                        data: {
                            cardHead:head,
                            cardText:text,
                            cardImage:image,
                            userId:id,
                            cardLike:0
                        }
                    }).then(res => {
                        console.log(res)
                        //向父组件Discover传参，关闭此对话框
                        this.$emit('getVisible',false)
                        //重置imageUrl
                        this.imageUrl=''
                        this.form.head=''
                        this.form.text=''
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    mounted(){
        this.setUserDetail()
    }
})
</script>

<template>
    <el-card>
        <el-form :model="form" :rules="rules" ref="form" status-icon label-width="120px" label-position="top">
            <!--文章标题-->
            <el-form-item label="标题" prop="head">
                <el-input v-model="form.head" />
            </el-form-item>
        
            <!--主要内容-->
            <el-form-item label="内容" prop="text">
                <el-input v-model="form.text" type="textarea" />
            </el-form-item>

            <!--上传图片-->
            <el-upload class="avatar-uploader" action="http://localhost:8081/upload_image" list-type="picture-card"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl"/>
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>

            <!--按钮-->
            <el-form-item>
                <el-button type="success" class="button" @click="submitForm('form')" round>发布</el-button>
                <el-button class="button"  round @click="cancleSubmit()">取消</el-button>
            </el-form-item>

            <div class="bottom">
                <el-avatar :size="50" :src="userDetail.userImage"/>
            </div>
        </el-form>
    </el-card>
    
</template>

<style>

.bottom {
    margin-top: 13px;
    margin-bottom: 10px;
    line-height: 12px;
    /*display: flex;*/
    float: right;
    justify-content: space-between;
    align-items: center;
}

.el-form-item{
    margin-top: 10px;
}

.button {
    padding: 0;
    min-height: auto;
}

.time {
    font-size: 12px;
    color: #999;
}
</style>