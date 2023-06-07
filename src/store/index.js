/**
 * vuex 配置
 * 创建store实例
 */
import { createStore } from "vuex";

const store=createStore({
    state(){
        return{
            //用户token
            token:'',
            //后端统一返回结果
            result:{
                code:0,
                data:'',
                name:''
            },
            //用户登录信息
            user:{
                password:'',
                userEmail:'',
                userId:0,
                userName:''
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
            //卡片内容
            card:{
                cardId:0,
                userId:0,
                cardHead:'',
                cardTime:'',
                cardImage:'',
                cardText:'',
                cardLike:0
            },
        }
    },
    getters:{
    },
    mutations:{
        //更新result
        setResult(state,result){
            state.result=result
        },
        //更新user
        setUser(state,user){
            state.user=user;
        },
        //更新token
        setToken(state,token){
            state.token=token
        },
        //更新用户详细信息
        setUserDetail(state,userDetail){
            state.userDetail=userDetail
        },
        //更新卡片
        setCard(state,Card){
            state.card=Card
        },
        //清除store
        resetState(state){
            state.result={code:0,data:'',name:''}
            state.user={password:'',userEmail:'',userId:0,userName:''}
            state.token=''
            localStorage.clear()
        }
    },
    actions:{
    },
    modules:{
    }
})

export default store