<template>
  <div class="nowPic">
    <div id="map"></div>
    <!-- 左侧查询收缩框 -->
    <div class="left_select_box">
      <div class="InOut_left" @click="toggle_selectbox_left">{{arrow_left}}</div>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :style="{'transition':1.5+'s','margin-left':marginleft + 'px'}"
        :model="form"
        size="mini"
      >
        <el-form-item label="小区:">
          <el-select v-model="form.xqCode"  placeholder=''>
              <el-option v-for="xqInfo in xqInfos" :key="xqInfo.xqCode" :label="xqInfo.xqName" :value="xqInfo.xqCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌:">
          <el-input v-model="form.carNum" ></el-input>
        </el-form-item>
        <el-form-item label="颜色:">
          <el-select v-model="form.carColorName"  placeholder=''>
            <el-option v-for="(item,key) in colorArr" :key="key" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型:">
          <el-select v-model="form.carTypeName"  placeholder=''>
            <el-option v-for="(item,key) in carTypeArr" :key="key" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌:">
          <el-select  v-model="form.carBrandName" @focus="Clear"  filterable clearable  remote  reserve-keyword  placeholder="请输入关键词"  :remote-method="remoteMethod"  :loading="loading">
            <el-option  v-for="(item,key) in carBrandArr"  :key="key" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间:">
          <el-date-picker
            style="width:140px"
            v-model="form.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder=" ">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            style="width:140px"
            v-model="form.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder=" ">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div style="margin-top:400px;" :style="{'transition':1.5+'s','margin-left':marginleft + 'px'}">
        <el-button size="mini" @click="getList">查询</el-button>
        <el-button size="mini">重置</el-button>
      </div>
      <div style="margin-top:10px;" :style="{'transition':1.5+'s','margin-left':marginleft + 'px'}">
        <el-button size="mini" @click="polyline">规划路线</el-button>
        <el-button size="mini" @click="move">行动轨迹</el-button>
      </div>
    </div>
    <!-- 右侧websocket收缩框 -->
    <div class="right_select_contain" :style="right_select_style">
      <div class="InOut_right" @click="toggle_selectbox_right">{{arrow_right}}</div>
      <div class="right_select_box" :style="right_select_style">
        <RealTimeList v-for="carPic in carPics" :key="carPic.id" :item="carPic" />
      </div>
    </div>
    <!-- 底部查询结果横向框 -->
    <div class="bottom_box" v-if="bottom_arr.length">
        <!-- <el-checkbox-group v-model="bootom_radioarr">
            <el-checkbox label="人体" style="color:gray"></el-checkbox>
            <el-checkbox label="人脸" style="color:gray"></el-checkbox>
        </el-checkbox-group> -->
        <el-checkbox-group class="body_box" v-model="bootom_checkarr" @change="bottom_allcheck_change">
          <el-checkbox class="bottom_item_check" :label="item" style="color:gray" v-for="(item) in bottom_arr" :key="item.index">
            <div  class="body_box_item" >
              <img :src="item.capImage" />
              <div class="info">
                <p>{{item.capAddress}}</p>
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
      // todo地图
      map:null,
      // 左右伸缩框
      arrow_left: "<",
      arrow_right: ">",
      right_select_style: {
        width: 160 + "px"
      },
      marginleft: 0,
      //左侧收缩框数据
      labelPosition: "right",
      form: {
        xqCode: "",
        carNum:"",
        carColorName:"",
        carTypeName:"",
        carBrandName:"",
        startTime:'',
        endTime:''
      },
      xqInfos:JSON.parse(sessionStorage.getItem("xqInfos")),
      // 车辆颜色
      colorArr:['不限','黑色','白色','红色','黄色','蓝色','棕色','银色','绿色','灰色'],
      //车辆类型
      carTypeArr:['不限','轿车','客车','SUV','卡车','消防车','吊车','面包车','货车'],
      //车辆品牌
      carBrandArr:[],
      loading:false,
      src:'',
      bootom_checkarr:[],
      bottom_arr:[],//选中的坐标
      locationArr:[]//划线的坐标
    };
  },
  created(){
    this.$nextTick(()=>{
      this.initMap()
    })
  },
  methods: {
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
      // console.log((this.bottom_arr));
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
          "./static/images/moveCar.png",
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
    //获取列表
    getList(){
      let _this = this;
      _this.$axios({
        methods:'GET',
        url:'/sjwl/webapi/car/capture/query',
        params:{
          limit:'1000',
          page:'1',
          areaId:'0'
        }
      }).then(res => {
        if(res.code == 1000){
          _this.bottom_arr = res.data.list;
        }
      })
    },
    //车辆品牌智能查询
    remoteMethod(query) {
        let _this = this;
        if (query !== '') {
          // this.loading = true;
          _this.$axios({
            methods:'GET',
            url:'/sjwl/webapi/car/brandName',
            params:{
              likeStr:query
            }
          }).then(res => {
            if(res.code == 1000){
              _this.carBrandArr = res.data.map((item) => {
                return {
                  value:item.brandName,
                  label:item.brandName
                }
              });
            }
          })
        }else {
          this.carBrandArr = [];
        }
    },
    Clear(){
			this.carBrandArr =[];
		},
    bottom_allcheck_change(e){
      console.log(e)
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
  height: 925px;
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
//右侧滚动块-收缩
.right_select_contain{
  height: 720px;
  background: rgba(7, 53, 157, 0.82);
  opacity: 0.9;
  position: absolute;
  top: 15px;
  right: 0;
  transition: 1.5s;
  padding-right: 10px;
}
.right_select_box {
  height: 720px;
  position: absolute;
  top: 0px;
  right: 0;
  transition: 1.5s;
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
    margin-top: 22px;
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
    color: #fff;
  }
}
</style>
<style>
/* 左侧收缩框element样式 */
.nowPic .el-form-item__label {
  color: white;
}
.nowPic .el-input--mini .el-input__inner {
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
.left_select_box .el-select__input.is-mini{
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