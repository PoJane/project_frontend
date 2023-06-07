<script>
import { User, Message,EditPen } from '@element-plus/icons-vue'

export default ({
    data() {
        return {
            //用户登录信息
            user: {
                password: '',
                userEmail: '',
                userId: 0,
                userName: ''
            }
        }
    },
    components: { User, Message,EditPen },
    methods: {
        //设置本用户登录信息
        setUser() {
            this.user = this.$store.state.user
        },
    },
    mounted() {
        this.setUser()
    }
})
</script>

<template>
    <el-drawer :with-header="false" size="80%">
        <div>
            <span>账户信息</span>
        </div>
        <el-card shadow="never">
            <!--名片信息主体描述列表-->
            <div class="middle">
                <el-descriptions class="margin-top" :column="1" size="large" border>
                    <!--用户id-->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <user />
                                </el-icon>
                                UID
                            </div>
                        </template>
                        {{ user.userId }}
                    </el-descriptions-item>

                    <!--用户名-->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <EditPen />
                                </el-icon>
                                用户名
                            </div>
                        </template>
                        {{ user.userName }}
                    </el-descriptions-item>

                    <!--邮箱-->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <Message />
                                </el-icon>
                                邮箱
                            </div>
                        </template>
                        {{ user.userEmail }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
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