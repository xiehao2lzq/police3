<template>
  <div class="nowPic">
    <div id="map"></div>
    <!-- 左侧查询收缩框 -->
    <div class="left_select_box">
      <div class="InOut_left" @click="toggle_selectbox_left">{{arrow_left}}</div>
      <div :style="{'transition':1.5+'s','margin-left':marginleft + 'px'}">
            <input accept="image/jpeg" name="img" id="upload_file" type="file" @input="upLoad" style="opacity: 0;width:130px" />
            <label class="img_ipt" for="upload_file"></label>
      </div>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :style="{'transition':1.5+'s','margin-left':marginleft + 'px'}"
        :model="formInline"
        size="mini"
      >
        <el-form-item label="小区:">
          <el-select v-model="formInline.xqCode"  placeholder=''>
              <el-option v-for="xqInfo in xqInfos" :key="xqInfo.xqCode" :label="xqInfo.xqName" :value="xqInfo.xqCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="formInline.name" ></el-input>
        </el-form-item>
        <el-form-item label="年龄段:">
          <el-select v-model="formInline.age"  placeholder=''>
              <el-option label="未成年" value="0"></el-option>
              <el-option label="青年" value="1"></el-option>
              <el-option label="中年" value="2"></el-option>
              <el-option label="老年" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="formInline.sex" placeholder=" ">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="口罩:">
          <el-select v-model="formInline.bmask" placeholder=" ">
            <el-option label="有" value="1"></el-option>
            <el-option label="无" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="眼镜:">
          <el-select v-model="formInline.eyeglass" placeholder=" ">
            <el-option label="有" value="1"></el-option>
            <el-option label="无" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="背包:">
          <el-select v-model="formInline.knapsack" placeholder=" ">
            <el-option label="有" value="1"></el-option>
            <el-option label="无" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帽子:">
          <el-select v-model="formInline.hat" placeholder=" ">
            <el-option label="有" value="1"></el-option>
            <el-option label="无" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手提袋:">
          <el-select v-model="formInline.handbag" placeholder=" ">
            <el-option label="有" value="1"></el-option>
            <el-option label="无" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上衣种类:">
          <el-select v-model="formInline.coatType" placeholder=" ">
            <el-option label="短袖" value="0"></el-option>
            <el-option label="长袖" value="1"></el-option>
            <el-option label="连衣裙" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上衣颜色:">
          <el-select v-model="formInline.coatColor" placeholder=" ">
            <el-option label="白" value="0"></el-option>
            <el-option label="黑" value="1"></el-option>
            <el-option label="红" value="2"></el-option>
            <el-option label="绿" value="3"></el-option>
            <el-option label="蓝" value="4"></el-option>
            <el-option label="黄" value="5"></el-option>
            <el-option label="灰" value="6"></el-option>
            <el-option label="条纹" value="7"></el-option>
            <el-option label="黑白" value="8"></el-option>
            <el-option label="红白" value="9"></el-option>
            <el-option label="绿白" value="10"></el-option>
            <el-option label="蓝白" value="11"></el-option>
            <el-option label="黄白" value="12"></el-option>
            <el-option label="紫白" value="13"></el-option>
            <el-option label="红黑" value="14"></el-option>
            <el-option label="绿黑" value="15"></el-option>
            <el-option label="蓝黑" value="16"></el-option>
            <el-option label="黄黑" value="17"></el-option>
            <el-option label="紫黑" value="18"></el-option>
            <el-option label="绿红" value="19"></el-option>
            <el-option label="蓝红" value="110"></el-option>
            <el-option label="黄红" value="111"></el-option>
            <el-option label="紫红" value="112"></el-option>
            <el-option label="蓝绿" value="113"></el-option>
            <el-option label="黄绿" value="114"></el-option>
            <el-option label="紫绿" value="115"></el-option>
            <el-option label="黄蓝" value="116"></el-option>
            <el-option label="紫蓝" value="117"></el-option>
            <el-option label="紫黄" value="118"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="裤子种类:">
          <el-select v-model="formInline.trousersType" placeholder=" ">
            <el-option label="短裤" value="0"></el-option>
            <el-option label="长裤" value="1"></el-option>
            <el-option label="裙子" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="裤子颜色:">
          <el-select v-model="formInline.trousersColor" placeholder=" ">
            <el-option label="白" value="0"></el-option>
            <el-option label="黑" value="1"></el-option>
            <el-option label="红" value="2"></el-option>
            <el-option label="绿" value="3"></el-option>
            <el-option label="蓝" value="4"></el-option>
            <el-option label="黄" value="5"></el-option>
            <el-option label="灰" value="6"></el-option>
            <el-option label="条纹" value="7"></el-option>
            <el-option label="黑白" value="8"></el-option>
            <el-option label="红白" value="9"></el-option>
            <el-option label="绿白" value="10"></el-option>
            <el-option label="蓝白" value="11"></el-option>
            <el-option label="黄白" value="12"></el-option>
            <el-option label="紫白" value="13"></el-option>
            <el-option label="红黑" value="14"></el-option>
            <el-option label="绿黑" value="15"></el-option>
            <el-option label="蓝黑" value="16"></el-option>
            <el-option label="黄黑" value="17"></el-option>
            <el-option label="紫黑" value="18"></el-option>
            <el-option label="绿红" value="19"></el-option>
            <el-option label="蓝红" value="110"></el-option>
            <el-option label="黄红" value="111"></el-option>
            <el-option label="紫红" value="112"></el-option>
            <el-option label="蓝绿" value="113"></el-option>
            <el-option label="黄绿" value="114"></el-option>
            <el-option label="紫绿" value="115"></el-option>
            <el-option label="黄蓝" value="116"></el-option>
            <el-option label="紫蓝" value="117"></el-option>
            <el-option label="紫黄" value="118"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间:">
          <el-date-picker
            style="width:140px"
            v-model="formInline.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择起始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            style="width:140px"
            v-model="formInline.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择截止时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div style="margin-top:15px;" :style="{'transition':1.5+'s','margin-left':marginleft + 'px'}">
        <el-button size="mini" @click="gainNowPic">查询</el-button>
        <el-button size="mini">重置</el-button>
      </div>
      <div style="margin-top:10px;" :style="{'transition':1.5+'s','margin-left':marginleft + 'px'}">
        <el-button size="mini" @click="polyline">规划路线</el-button>
        <el-button size="mini" @click="move">行动轨迹</el-button>
      </div>
    </div>
    <!-- 右侧websocket收缩框 -->
    <div class="right_select_box" :style="right_select_style">
      <div class="InOut_right" @click="toggle_selectbox_right">{{arrow_right}}</div>
      <div class="coverBox">
        <RealTimeList v-for="personPic in personPics" :key="personPic.id" :item="personPic" />
      </div>
    </div>
    <!-- 底部查询结果横向框 -->
    <div class="bottom_box" v-if="bottom_arr.length">
        <el-checkbox-group v-model="bootom_radioarr" @change="change">
            <el-checkbox label="人体" style="color:gray"></el-checkbox>
            <el-checkbox label="人脸" style="color:gray"></el-checkbox>
        </el-checkbox-group>
        
        <el-checkbox-group class="body_box" v-model="bootom_checkarr">
          <el-checkbox class="bottom_item_check" style="color:gray" v-for="(item,index) in bottom_arr" :key="index" :label="index">
              <div  class="body_box_item">
                <img v-if="bootom_radioarr[0]==='人脸'" :src="item.faceImage" />
                <img v-else :src="item.bodyImage" />
                <div class="info">
                  <p>{{item.xqName}}</p>
                  <p>{{item.capTime}}</p>
                </div>
            </div> 
          </el-checkbox>
        </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import RealTimeList from "../realTimeList"
export default {
  name: "nowPic",
  computed: {
      ...mapState({
          personPics:state=>state.common.personPic
      }),
      ...mapState({
          carPics:state=>state.common.carPic
      })
  },
  components: {
    RealTimeList
  },
  data() {
    return {
      //todo 地图
      map:[],
      //todo 选中的坐标
      bootom_checkarr:[],
      locationArr:[],
      // 左右伸缩框
      arrow_left: "<",
      arrow_right: ">",
      right_select_style: {
        width: 160 + "px"
      },
      marginleft: 0,
      //左侧收缩框数据
      labelPosition: "right",
      //todo 搜索框部分
      xqInfos:JSON.parse(sessionStorage.getItem("xqInfos")),
      formInline: {
        xqCode:"",
        name:"",
        age:"",
        sex:"",
        bmask:"",
        eyeglass:"",
        knapsack:"",
        hat:"",
        handbag:"",
        coatType:"",
        coatColor:"",
        trousersType:"",
        trousersColor:'',
        startTime:"",
        endTime:"",
        page:1,
        limit:100
      },
      src:'',
      //底部查询结果框数据
      bootom_radioarr:['人脸'],
      bottom_arr:[]
    };
  },
  created () {
   this.$nextTick(()=>{
      this.initMap()
   })
  },
  methods: {
    //todo 地图的操作
     /* 高德坐标转百度 */
    bd_encrypt(gg_lng, gg_lat) {
      var X_PI = (Math.PI * 3000.0) / 180.0;
      var x = gg_lng,
        y = gg_lat;
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
      var bd_lng = (z * Math.cos(theta) + 0.0065).toFixed(6) - 0;
      var bd_lat = (z * Math.sin(theta) + 0.006).toFixed(6) - 0;
      return [bd_lng, bd_lat];
      /* {
        bd_lat: bd_lat,
        bd_lng: bd_lng
    }; */
    },
    /* 地图初始化 */
    initMap() {
      // 百度地图
      this.map = new BMap.Map("map", { minZoom: 14, maxZoom: 18 }); //实例化百度地图
      var point = new BMap.Point(120.23168, 35.963083); //声明中心点
      this.map.centerAndZoom(point, 18); //设置中心位置，层级
      this.map.enableScrollWheelZoom(true); //允许拖动缩放
      /* var driving = new BMap.DrivingRoute(this.map, {renderOptions:{map: this.map, autoViewport: true}});
      driving.search(this.linePoints[0], this.linePoints[3],{waypoints:[this.linePoints[1],this.linePoints[2]]});//waypoints表示途经点 */
      //this.polyline();
    },

    polyline() {
      // console.log(this.locationArr);
      this.bootom_checkarr.forEach(item=>{
        this.locationArr.push(this.bottom_arr[item].deviceLocation.split(","))
      })
      var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6, //图标缩放大小
        strokeColor: "#fff", //设置矢量图标的线填充颜色
        strokeWeight: 2 //设置线宽
      });
      //sy.disableMassClear()//不允许清除
      var icons = new BMap.IconSequence(sy, "5%", "5%", false); //设置为true，可以对轨迹进行编辑
       //icons.disableMassClear()//不允许清除
      var PolylineArr = [];
      for (var i = 0; i < this.locationArr.length; i++) {
        /* 去重，字符串转数字 */
        this.locationArr[i][0] = this.locationArr[i][0] * 1;
        this.locationArr[i][1] = this.locationArr[i][1] * 1;
      }
      for (var i = 0; i < this.locationArr.length - 1; i++) {
        /* 去重，字符串转数字 */
        if (
          this.locationArr[i][0] == this.locationArr[i + 1][0] &&
          this.locationArr[i][1] == this.locationArr[i + 1][1]
        ) {
          this.locationArr.splice(i + 1, 1);
          i--;
        }
      }
      if(this.locationArr.length<2){
        this.$store.state.common.errorMsg.unshift("只被一个摄像头抓拍无法规划路线")
        return false
      } 
      
      this.locationArr.forEach(item => {
        var point = this.bd_encrypt(...item);
        PolylineArr.unshift(new BMap.Point(...point));
      });
      /*  console.log( [
          new BMap.Point(120.229497, 35.964368),
          new BMap.Point(120.232551, 35.965624),
          new BMap.Point(120.234393, 35.962411),
          new BMap.Point(120.230296, 35.960738),
          new BMap.Point(120.229607, 35.994378)
        ]); */
      var polyline = new BMap.Polyline(PolylineArr, {
        strokeColor: "#18a45b", //设置颜色
        strokeWeight: 8, //宽度
        strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
        enableEditing: false, //是否启用线编辑，默认为false
        enableClicking: false, //是否响应点击事件，默认为true
        icons: [icons]
      }); //创建折线
      polyline.disableMassClear(); //不被清除
      this.map.addOverlay(polyline);
      let mapViewObj = this.map.getViewport(PolylineArr); //视野自适应
      this.map.centerAndZoom(mapViewObj.center, mapViewObj.zoom);
      this.PolylineArr = PolylineArr
    },
    move(){
      if(this.locationArr.length<2){
        this.$store.state.common.errorMsg.unshift("只被一个摄像头抓拍无法规划路线")
        return false
      } 
      var i = 0;
      //console.log(PolylineArr);
      var timer = setInterval(() => {
        /* console.log(111);
        console.log(PolylineArr); */
        console.log(this.PolylineArr)
        var pt = this.PolylineArr[i];
        var myIcon = new BMap.Icon(
          "./static/images/movePerson.png",
          new BMap.Size(56, 76)
        );
        var moveMarker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        this.map.addOverlay(moveMarker); // 将标注添加到地图中
        if (i == this.PolylineArr.length - 1) {
          clearInterval(timer);
          return false
        }
        setTimeout(() => {
          this.map.removeOverlay(moveMarker);
        }, 500);
        i++;
      }, 500);
    },
    //todo 人脸和身体切换按钮
    change(val){
      this.bootom_radioarr = [val.pop()]
    },
    gainNowPic(){
      if(!this.formInline.name){
        this.$store.state.common.errorMsg.unshift("姓名属于必填项")
        return false
      }
      this.$axios({
        method:"get",
        url:"sjwl/webapi/person/capture/list",
        params:this.formInline
      }).then(res=>{
        if(res.code==="1000"){
          this.bottom_arr = res.data.list
          if(!this.bottom_arr.length){
            this.$store.state.common.errorMsg.unshift("无符合")
          }
        }
      })
    },
    toggle_selectbox_left() {
      let _this = this;
      if (_this.arrow_left == "<") {
        _this.arrow_left = ">";
        _this.marginleft = -252;
      } else if (_this.arrow_left == ">") {
        _this.arrow_left = "<";
        _this.marginleft = 0;
      }
    },
    toggle_selectbox_right() {
      let _this = this;
      if (_this.arrow_right == ">") {
        _this.arrow_right = "<";
        _this.right_select_style.width = 0;
      } else if (_this.arrow_right == "<") {
        _this.arrow_right = ">";
        _this.right_select_style.width = 160 + "px";
      }
    },
    upLoad() {
      var that = this;
      var file = document.getElementById("upload_file").files[0];
      console.log(document.getElementById("upload_file").files);
      if (file.size >= 1024 * 1024) {
        // this.open("<span>图片的大小应小于1M<span/>");
        return false;
      }
      var r = new FileReader(); //本地预览
      r.onload = function() {
        //图片的base64
        that.$store.state.faceCountrl.base64 = r.result;
        that.src = r.result;
      };
      r.readAsDataURL(file); //Base64
    }
  }
};
</script>

<style lang="scss" scoped>
//容器样式
.nowPic {
  width: 1530px;
  padding-top: 15px;
  position: relative;
  overflow: hidden;
}
//地图大小样式
#map {
  width: 1530px;
  height: 925px
}

// 左侧搜索框-收缩
.left_select_box {
  // width: 252px;
  height: 714px;
  background: rgba(7, 53, 157, 0.82);
  opacity: 0.9;
  position: absolute;
  top: 15px;
  transition: 1.5s;
  padding: 5px;
}
.InOut_left {
  width: 19px;
  height: 111px;
  background: rgba(7, 53, 157, 0.82);
  opacity: 0.9;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  position: absolute;
  right: -19px;
  top: 300px;
  cursor: pointer;
  text-align: center;
  line-height: 111px;
  font-size: 25px;
}
.img_ipt{
    width: 100px;
    height: 100px;
    background:rgba(235, 237, 240, 0.9);
    border-radius:3px;
    background-image: url(../../../../assets/head_img.png);
    background-size: 80px 80px;
    background-position: 10px 20px;
    background-repeat: no-repeat;
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
}
//右侧滚动块-收缩
.right_select_box {
  height: 720px;
  background: rgba(7, 53, 157, 0.82);
  opacity: 0.9;
  position: absolute;
  top: 15px;
  right: 0;
  transition: 1.5s;
  padding-right: 10px;
}
.coverBox{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.InOut_right {
  width: 19px;
  height: 111px;
  background: rgba(7, 53, 157, 0.82);
  opacity: 0.9;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  position: absolute;
  left: -18px;
  top: 300px;
  cursor: pointer;
  text-align: center;
  line-height: 111px;
  font-size: 25px;
}
//底部box
.bottom_box {
  width: 1542px;
  height: 206px;
  background: rgba(7, 53, 157, 0.92);
  opacity: 0.9;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 20px;
}
.bottom_box .body_box{
    width: 1542px;
    height: 168px;
    margin-top: 12px;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.body_box .body_box_item{
    position: relative;
    margin-right: 10px;
}
.body_box_item>img{
    width: 140px;
    height: 158px;
}
.body_box_item .info{
  width:100%;
  height:34px;
  background:rgba(51,51,51,0.72);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: absolute;
  bottom: 0;
  p{
    line-height: 17px;
    color:#fff;
  }
}
</style>
<style>
/* 左侧收缩框element样式 */
.el-form-item__label {
  color: white;
}
.el-input--mini .el-input__inner {
  background-color: #1e62d5;
  border: 0;
  color: white;
}
.left_select_box .el-form-item__content {
  width: 140px;
  height: 30px;
}
.left_select_box .el-form-item__label {
  color: white;
}
/* 左侧收缩框下方四个按钮样式 */
.left_select_box .el-button--mini {
  width: 110px;
  height: 32px;
  color: white;
  background: rgba(39, 105, 216, 1);
  border: 1px solid rgba(48, 93, 212, 1);
  border-radius: 3px;
}
/* 左侧收缩框每一条上下间隙 */
.left_select_box .el-form-item--mini.el-form-item,
.left_select_box .el-form-item--small.el-form-item {
  margin-bottom: 2px;
}
/* 下方查询结果包裹框中每一条item中check位置更改为右上角 */
.bottom_item_check .el-checkbox__input{
    position: absolute;
    right: 12px;
    top: 3px;
}
</style>