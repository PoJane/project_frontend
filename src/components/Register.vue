<script>
import Header from './items/Header.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
    data() {
        //邮箱验证
        var checkEmail = (rule, value, callback) => {
            var str = value + ""
            if (!value) {
                return callback(new Error('邮箱不能为空'));
            }
            setTimeout(() => {
                if (!str.endsWith(".com") || str.indexOf("@") < 0) {
                    callback(new Error('请输入正确格式的邮箱!'));
                } else {
                    callback();
                }
            }, 1000);
        };
        //第一次密码输入验证
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        //第二次密码输入验证
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            result: {
                code: 0,
                message: "",
                data: ""
            },
            //element表单属性
            labelPosition: 'top',
            ruleForm: {
                email: '',
                pass: '',
                checkPass: ''
            },
            //element密码验证
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
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
        //提交表单注册
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const email = this.ruleForm.email
                    const password = this.ruleForm.pass
                    const name=email
                    //TODO：添加注册成功提示!
                    this.axios({
                        method: 'post',
                        url: '/register',
                        data: {
                            userName:name,
                            userEmail: email,
                            password: password
                        }
                    }).then(res => {
                        this.result=res.data
                        if(this.result.code==200){
                            this.messageBox('注册成功, 是否跳转至登录页?','提示','即将跳转','已取消跳转')
                        }else{
                            this.messageBox('注册失败,邮箱已被注册!','提示','请确认邮箱','请确认邮箱')
                        }
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetFields(formName) {
            this.$refs[formName].resetFields();
        },
        //弹出提示
        messageBox(msg,title,confirm,cancel){
            ElMessageBox.confirm(
                msg,
                title,
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    ElMessage({
                        type: 'success',
                        message: confirm,
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: cancel,
                    })
                })
        }
        ,
        //提交数据测试
        testUser() {
            /*
            'userEmail': 'lingyudie@qq.com',
            'password':'ling123456'
            */
            var _this = this
            const email = 'lingyudie@qq.com'
            const pass = 'ling123456'
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
        }
    }
}
</script>

<template>
    <Header />
    <el-row type="flex" justify="center" align="bottom" id="login">
        <el-col :span="8">
            <el-card shadow="always">
                <el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                    label-width="100px" class="demo-ruleForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model.number="ruleForm.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码"
                            show-password></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="success" @click="submitForm('ruleForm')">注册</el-button>
                        <el-button @click="resetFields('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<style>

</style>
