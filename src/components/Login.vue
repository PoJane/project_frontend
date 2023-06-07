<script>
import Header from './items/Header.vue'
import { ElMessageBox } from 'element-plus'

export default {
    data() {
        //邮箱验证
        var checkEmail = (rule,value, callback) => {
            var str=value+""
            if (!value) {
                return callback(new Error('邮箱不能为空'));
            }
            setTimeout(() => {
                if (!str.endsWith(".com")||str.indexOf("@")<0) {
                    callback(new Error('请输入正确格式的邮箱!'));
                } else {
                    callback();
                }
            }, 1000);
        };
        //密码输入验证
        var validatePass = (rule,value, callback) => {
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else {
                callback();
            }
        };
        return {
            result: {
                code: 0,
                data: {
                    password: '',
                    userEmail: '',
                    userId: 0,
                    userName: ''
                },
                name: ""
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
            labelPosition: 'top',
            ruleForm: {
                email: '',
                pass:'',
            },
            //表单验证规则
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                email: [
                    { validator: checkEmail, trigger: 'blur' }
                ]
            }
        }
    },
    components:{
        Header
    },
    methods: {
        //获取并存储本用户详细信息
        storeAndSetUserDetail() {
            //获取用户详细信息
            const id = this.result.data.userId
            const token = this.$store.state.token
            this.axios({
                method: 'get',
                url: '/show_user',
                headers: { 'token': token },
                params: {
                    'id': id
                }
            }).then(res => {
                //存储userDetail
                this.$store.commit('setUserDetail', res.data.data)
            }).catch(err => {
                console.log(err)
            })
        },
        //提交表单登录
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const email=this.ruleForm.email
                    const password=this.ruleForm.pass
                    this.axios({
                        method: 'post',
                        url: '/login',
                        data: {
                            userEmail: email,
                            password: password
                        }
                    }).then(res => {
                        this.result=res.data
                        this.result.data=res.data.data
                        if(this.result.code==400){
                            //登录失败
                            this.messageBox('登录失败, 用户名或密码错误!','提示')
                        }else{
                            //存储user和token
                            this.$store.commit("setUser", this.result.data)
                            this.$store.commit("setToken", this.result.name)
                            //存储userDetail
                            this.storeAndSetUserDetail()
                            //登录成功，跳转
                            //this.$router.push('/discover')
                            this.$router.replace('/discover')
                        }
                        console.log(this.$store.state.token)
                        console.log(this.$store.state.user)
                    }).catch(err=>{
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //弹出提示
        messageBox(msg, title) {
            ElMessageBox.alert(msg,title,{
                confirmButtonText:'确认'
            });
        },
        //提交数据测试
        testUser(){
            /*
            'userEmail': 'lingyudie@qq.com',
            'password':'ling123456'
            */
            var _this = this
            const email='lingyudie@qq.com'
            const pass='ling123456'
            _this.axios({
                method: 'post',
                url: '/login',
                data: {
                    userEmail: email,
                    password: pass
                }
            }).then(res => {
                console.log(res)
                _this.result = res.data
            })
        },
        toRegister(){
            this.$router.push('/register')
        }
    }
}
</script>

<template>
    <Header />
    <el-row type="flex" justify="center" align="bottom" id="login">
        <el-col :span="8">
            <el-card shadow="always">
                <el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model.number="ruleForm.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                
                    <el-form-item>
                        <el-button type="success" @click="submitForm('ruleForm')">登录</el-button>
                        <el-button @click="toRegister">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<style>
     
</style>
