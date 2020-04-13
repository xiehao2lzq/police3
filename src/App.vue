<template>
  <div id="app">
    <Header v-if="!(this.$route.name==='Login')"/>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from "vuex"
import Header from "./components/common/header"
export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      ws:null  
    }
  },
  computed: {
    ...mapState({
      successMsg:state=>state.common.successMsg
    }),
    ...mapState({
      errorMsg:state=>state.common.errorMsg
    }),
    ...mapState({
        logined:state=>state.common.logined
    })
  },
  watch:{
    successMsg(){
      this.$message({
          message: this.successMsg[0],
          type: 'success'
        });
    },
    errorMsg(){
      this.$message.error(this.errorMsg[0]);
    },
    logined(){
            this.qxrequest()
        }
  },
  created(){
        if((!this.ws)&&sessionStorage.getItem("Authorization")){
            this.qxrequest()
        }
    },
  methods: {
    qxrequest() {
      //确定登录权限
      this.$axios
        .get("http://"+"10.10.6.54"+":9015/wpi", {
          params: {
            areaId: 0,
            //xqCode: this.xqCode,   
            tokenId: sessionStorage.getItem("Authorization").split(" ")[1],
            userId: sessionStorage.getItem("userId")
          }
        })
        .then(res => {
          console.log(res)
          if(res.code==="1000"){
            //设置延时链接websocket
             this.connect(sessionStorage.getItem("Authorization").split(" ")[1]) 
          }else{
            this.$store.state.common.errorMsg.unshift(res.data.msg+"无法确认身份请重新登录");
            /* setTimeout(()=>{
              this.qxrequest()
            },5000) */
          }
        });
    },
    connect(tokenId){
      if ("WebSocket" in window) {
        this.ws = new WebSocket(
          "ws://"+ "10.10.6.54"  +":9015/socketServer/" + tokenId
        );
      } else if ("MozWebSocket" in window) {
        this.ws = new MozWebSocket(
          "ws://"+"10.10.6.54"+":9015/socketServer/" + tokenId
        );
      } else {
        this.$store.state.common.errorMsg.unshift("该浏览器不支持websocket");
      }
      var _this =this
       this.ws.onmessage = function(e) {
         var newData = JSON.parse(e.data);
         //console.log(newData)
         _this.$store.state.common.animation = true;   
         switch (newData.msgType) {
           case '1':
             _this.$store.state.common.personPic.push(newData)
             break;
           case '2':
             _this.$store.state.common.carPic.push(newData)
             break;
           default:
             break;
         }      
       }
       this.ws.onopen = function(evt) {
        console.log("WebSocket链接成功");
      }
      this.ws.onclose = function() {
        console.log("WebSocket连接关闭");
      };
    },
  }
}
</script>

<style>

</style>
