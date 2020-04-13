<template>
  <div class="login" @keyup.enter="login({'username':username,'password':password,'verifyCode':'1234'})">
    <div class="formBox" v-if="logined">
      <el-input placeholder="请输入用户名" suffix-icon="el-icon-user-solid" v-model="username"></el-input> 
      <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      <el-button type="primary" @click="login">立即登录</el-button>
    </div>
    <div class="navs" v-else>
        <router-link v-for="nav in navs" :key="nav.id" :to="nav.path">
            <img :src="nav.src" alt="">
        </router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    data () {
        return {
            username:"",
            password:"",
            navs:[
                {id:1,path:"/community",src:require("@static/images/community.png")},
                {id:2,path:"/dealData",src:require("@static/images/information.png")},
                {id:3,path:"/montoring",src:require("@static/images/safety.png")},
                {id:4,path:"/bigData",src:require("@static/images/bigData.png")}
            ],
            ws:null
        }
    },
    computed: {
        ...mapState({
            logined:state=>state.common.logined
        })
    },
    methods:{
       login(){
           
           this.$axios({
               url:"plat/login",
               method:"post",
               data:{
                   "username":this.username,
                   "password":this.password,
                   "verifyCode":"1234"
               }
           }).then(res=>{
               if(res.code=="0100"){
                   let Authorization = `Bearer ${res.data.access_token}`
                   let userId = res.data.userId
                   sessionStorage.setItem("Authorization",Authorization)//token本地缓存
                   sessionStorage.setItem("userId",userId)
                   sessionStorage.setItem("username",this.username)
                   this.$store.state.common.successMsg.unshift(res.msg)
                   this.$store.state.common.logined = false
                   //todo获取所有小区数据
                   this.gainXqInfo()
               }else{
                   this.$store.state.common.errorMsg.unshift(res.msg)
               }
               //console.log(res,"success")
           }).catch(res=>{
               this.$store.state.common.errorMsg.unshift(res.data.message)
               //console.log(res,"error")
           })
       },
       gainXqInfo(){
           this.$axios({
               method:"get",
               url:"sjwl/webapi/xq/list",
           }).then(res=>{
               if(res.code==="1000"){
                   console.log(res.data.list)
                   var xqInfos = res.data.list.map(item=>{
                       return {
                           xqName:item.xqName,
                           xqCode:item.xqCode
                       }
                   })
                   sessionStorage.setItem("xqInfos",JSON.stringify(xqInfos))
               }
           })
       },
    },
    created(){
        if(sessionStorage.getItem("Authorization")){
            this.$store.state.common.logined = false
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
  width: 1920px;
  height: 1080px;
  background: url("../../../static/images/bg.png");
  position: relative;
}
.formBox {
  width: 631px;
  height: 540px;
  padding:120px 100px;
  box-sizing: border-box;
  background: rgba(2, 13, 55, 0.35);
  border-radius: 12px;
  position: absolute;
  top: 100px;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: url("../../../static/images/login.png");
}
.navs{
    display: flex;
    width: 1920px;
    height: 1080px;
    box-sizing:border-box;
    padding:20% 10%;
    justify-content: space-between;
}
</style>