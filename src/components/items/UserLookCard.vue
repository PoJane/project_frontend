<script>
import {User,Message,Calendar,EditPen,MagicStick} from '@element-plus/icons-vue'

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
                userId:0,
                userImage: '',
                userIntro: '',
                userName:'',
                userSex:''  
            },
            url:'http://127.0.0.1:5173/14d50461-fde4-4df2-8764-4de1e5c47315',
            src:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
    },
    components:{User,Message,Calendar,EditPen, MagicStick},
    methods: {
        //设置本用户登录信息
        setUser() {
            this.user = this.$store.state.user
        },
        //设置本地用户详细信息
        setUserDetail(){
          this.userDetail=this.$store.state.userDetail
          console.log("UserLook Get:")
          console.log(this.userDetail)
        },
    },
    mounted() {
        this.setUser()
        this.setUserDetail()
    }
})
</script>

<template>
    <el-drawer :with-header="false" size="80%">
      <div>
        <span>查看资料</span>
      </div>
      <el-card shadow="never">
          <!--名片顶层，显示头像和用户id-->
          <div class="top">
              <el-avatar :size="50" :src="userDetail.userImage" fit="fit" />
              <span>{{ user.userId }}</span>
          </div>
          <!--名片信息主体描述列表-->
          <div class="middle">
              <el-descriptions class="margin-top" :column="1" size="large" border>
                  <!--用户名-->
                  <el-descriptions-item>
                      <template #label>
                          <div class="cell-item">
                              <el-icon :style="iconStyle"><user /></el-icon>
                              用户名
                          </div>
                      </template>
                      {{ user.userName }}
                  </el-descriptions-item>

                  <!--邮箱-->
                  <el-descriptions-item>
                      <template #label>
                          <div class="cell-item">
                              <el-icon :style="iconStyle"><Message /></el-icon>
                              邮箱
                          </div>
                      </template>
                      {{ user.userEmail }}
                  </el-descriptions-item>
        
                  <!--性别-->
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle">
                          <MagicStick />
                        </el-icon>
                        性别
                      </div>
                    </template>
                    {{ userDetail.userSex }}
                  </el-descriptions-item>

                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle">
                          <Calendar />
                        </el-icon>
                        生日
                      </div>
                    </template>
                    {{ userDetail.userBirth }}
                  </el-descriptions-item>

                  <!--用户简介-->
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon :style="iconStyle">
                          <EditPen />
                        </el-icon>
                        个性签名
                      </div>
                    </template>
                    <el-tag size="small">Developer</el-tag>
                    {{ userDetail.userIntro }}
                  </el-descriptions-item>
              </el-descriptions>
          </div>

          <!--名片底栏-->
          <div class="bottom">
              <el-button type="success">分享名片</el-button>
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

.middle{
    margin-left: 20%;
    display: flex;
}

.top{
    margin-top: 10px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>