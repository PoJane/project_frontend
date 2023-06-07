<script>
import { ElDrawer } from 'element-plus'
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
            //element表单属性
            labelPosition: 'left',
            ruleForm: {
                password: '',
                userEmail: '',
            },
        }
    },
    components: {
    },
    methods: {
        setUser(){
            this.user=this.$store.state.user
        }
    },
    mounted() {
        this.setUser()
    }
})
</script>

<template>
    <el-drawer :with-header="false" size="80%">
        <span>编辑资料</span>
        <el-card shadow="never">
            <el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                label-width="100px" class="demo-ruleForm">
                <!--邮箱-->
                <el-form-item label="邮箱" prop="userEmail">
                    <el-input v-model="ruleForm.userEmail" clearable :placeholder="user.userEmail"></el-input>
                </el-form-item>

                <!--密码-->
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="success">提交修改</el-button>
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