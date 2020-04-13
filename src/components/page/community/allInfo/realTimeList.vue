<template>
  <div class="liBox" :style="style" @click="router(item.id)">
    <li>
      <img v-if="item.msgType=='1'" :src="item.faceImage" alt />
      <img v-else :src="item.capImage" alt />
      <p v-if="item.msgType=='1'">
        <span>姓&ensp;&ensp;&ensp;&ensp;名:</span>
        {{item.name}}
      </p>
      <p v-else>
        <span>车&ensp;&ensp;&ensp;&ensp;牌:</span>
        {{item.carNum}}
      </p>
      <p>
        <span>出入地点:</span>
        {{item.xqName}}
      </p>
      <p>
        <span>抓拍时间:</span>
        {{item.capTime}}
      </p>
    </li>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["item"],
  computed: {
    ...mapState({
      animation: state => state.common.animation //路由跳转后不做动画
    })
  },
  data() {
    return {
      style: {
        height: "0px"
      }
    };
  },
  methods: {
    router(id){
      /* if(id){
         this.$router.push({
        name:"PersonRecord",
        query:{
          id:id
        }
      })
      } */
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.animation) {
        var height = 0;
        var _this = this;
        var timer = setInterval(() => {
          _this.style.height = height + "px";
          if (height == 130) {
            clearInterval(timer);
          }
          height += 13;
        }, 100);
      } else {
        this.style.height = 130 + "px";
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.liBox {
  position: relative;
  width: 100% !important;
  margin-bottom: 10px;
  cursor: pointer;
}
li {
  width: 100%;
  height: 130px;
  border-radius: 4px;
  background: #163d97;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  img {
    width: 100px;
    height: 120px;
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 20px;
    float: left;
  }
  p {
    font-size: 16px;
    margin-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 60%;
    span {
      margin-right: 5px;
    }
  }
}
/* li {
      height: 130px;
      width: 402px!important;;
      background: #E0EDF9;
      overflow: hidden;
      position: absolute;
      right: 0;
      img{
        width:208px;
        height: 180px;
        margin: 10px auto 0;
      }
      p{
        margin-top:10px;
        margin-left:10px;
        color:#333333;
        
      }
    } */
</style>