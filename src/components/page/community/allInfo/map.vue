<template>
    <div class="map">
        <div id="map">

        </div>
        <div class="switchMap">
            <div class="SwitchBox">
                <el-checkbox-group v-model="checkboxGroup" size="medium" @change="handleCheckedChange">
                    <el-checkbox label="小区" border></el-checkbox>
                    <el-checkbox label="房屋" border></el-checkbox>
                    <el-checkbox label="监控" border></el-checkbox>
                    <el-checkbox label="人脸" border></el-checkbox>
                    <el-checkbox label="车辆" border></el-checkbox>
                </el-checkbox-group>
                <ul v-show="listInfo.type==minCheck">
                    <div>
                    <li v-for="item in listInfo.list" :key="item.index" @click="playOrHouse(listInfo.type,item)">
                        <img :src="listInfo.iconPng" alt />
                        <span>{{item.name}}</span>
                    </li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                map:null,
                checkboxGroup: ["小区"],
                minCheck: "小区", //最少要选一个
                iconList: [
                    {
                    iconPng: require("@static/images/communityIcon.png"),
                    name: "小区"
                    },
                    {
                    iconPng: require("@static/images/homeIcon.png"),
                    name: "房屋"
                    },
                    {
                    iconPng: require("@static/images/monitoringIcon.png"),
                    name: "监控"
                    },
                    {
                    iconPng: require("@static/images/faceIcon.png"),
                    name: "人脸"
                    },
                    {
                    iconPng: require("@static/images/carIcon.png"),
                    name: "车辆"
                    }
                ],
                listInfo: {
                    list: []
                },
                 communityPolygon: [],
                houseListInfo: {
                    houseMarker: [],
                    buildingNo: [],
                    buildingCode: []
                },
                monitoringListInfo: {
                    monitoringMarker: [],
                    gbCode: [],
                    gbCodeseq:[]
                },
                FaceMarker: [],
                carMarker: []
            }
        },
        methods:{
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
            this.map = new BMap.Map("map", { minZoom: 8, maxZoom: 18 }); //实例化百度地图
            var point = new BMap.Point(120.23168,35.963083);//声明中心点
            this.map.centerAndZoom(point, 17);//设置中心位置，层级
            this.map.enableScrollWheelZoom(true); //允许拖动缩放
            this.communityInfo();
            },
            //小区数据，画图
            communityInfo() {
            this.$axios({
                method: "get",
                url: "/sjwl/webapi/xq/list",
                params: {
                areaId: 0,
                page: 1,
                limit: 10000
                }
            }).then(res => {
                //console.log(res);
                if (res.code == 1000) {
                //this.info = res.data.data
                if (this.map.getOverlays()) {
                    this.map.clearOverlays(); //添加之前先清空
                }
                /* 数据整合存储 */
                this.communityPolygon = []
                res.data.list.forEach(item => {
                    var location = this.bd_encrypt(
                    item.location.split(",")[0],
                    item.location.split(",")[1]
                    );
                    this.communityPolygon.push({
                    location: location,
                    polygonArr: eval("(" + "[" + item.locationArea + "]" + ")"), //可以用json.parse
                    xqName: item.xqName,
                    xqCode: item.xqCode
                    });
                    this.listInfo.list.push({
                    xqName: item.xqName,
                    xqCode: item.xqCode,
                    name: item.xqName
                    });
                    Object.assign(this.listInfo, {
                    type: "小区",
                    iconPng: require("@static/images/communityIcon.png")
                });
                    //console.log(this.bd_encrypt(item.location.split(",")[0],item.location.split(",")[1]))
                });
                /* 循环渲染每个小区 */
                this.communityPolygon.forEach(item => {
                    this.community(item);
                });
                }
            });
            },
            community(item) {
            /* 多边型框选小区 */
            //添加文本标签
            var point = new BMap.Point(...item.location);
            var opts = {
                position: point, // 指定文本标注所在的地理位置
                offset: new BMap.Size(-30, -20) //设置文本偏移量
            };
            var label = new BMap.Label(item.xqName, opts); // 创建文本标注对象
            label.setStyle({
                color: "#fff",
                fontSize: "18px",
                height: "48px",
                /* width: "80px", */
                lineHeight: "48px",
                border: 0,
                borderRadius: "10px",
                padding: "0 10px",
                background: "#24CFCB",
                zIndex: "100000",
                textAlign: "center",
                marginLeft:"-30px"
            });
            label.customData = { xqCode: item.xqCode }; //自定义参数id,很关键百度不支持直接传参，闭包策略不适用
            label.addEventListener("click", this.communityRouter);
            this.map.addOverlay(label);
            var polygonArr = [];
            for (var i = 0; i < item.polygonArr.length; i++) {
                /* 坐标转换 */
                var BMapPolygonArr = this.bd_encrypt(
                item.polygonArr[i][0],
                item.polygonArr[i][1]
                );
                polygonArr.push(new BMap.Point(...BMapPolygonArr));
            }
            var polygon = new BMap.Polygon(polygonArr, {
                strokeColor: "blue",
                strokeWeight: 2,
                strokeOpacity: 0.5,
                fillColor: "skyblue"
            }); //创建多边形
            //!polygon.customData = { xqCode: item.xqCode }; //自定义参数id,很关键百度不支持直接传参，闭包策略不适用
            //!polygon.addEventListener("click", this.communityRouter);
            this.map.addOverlay(polygon); //增加多边形
            let mapViewObj = this.map.getViewport(polygonArr); //视野自适应
            this.map.centerAndZoom(mapViewObj.center,  mapViewObj.zoom);
            //this.map.setViewport(point);
            },
            //请求楼房数据，画图
            houseInfo() {
            this.$axios({
                method: "get",
                url: "/sjwl/webapi/building/list"
            }).then(res => {
                if (res.code == 1000) {
                //this.info = res.data.data
                this.houseListInfo.houseMarker = []
                /* 坐标转换 */
                res.data.list.forEach(item => {
                    var marker = this.bd_encrypt(
                    item.buildingLocation.split(",")[0],
                    item.buildingLocation.split(",")[1]
                    );
                    this.houseListInfo.houseMarker.push(marker);
                    this.houseListInfo.buildingNo.push(item.buildingName);
                    this.houseListInfo.buildingCode.push(item.buildingCode);
                });
                res.data.list.forEach(item => {
                    this.listInfo.list.push({
                    //xqName: item.xqName,
                    buildingName: item.buildingName,
                    name:item.buildingName,
                    buildingCode:item.buildingCode
                    });
                });
                Object.assign(this.listInfo, {
                    type: "房屋",
                    iconPng: require("@static/images/homeIcon.png")
                });
                /* 一次性渲染所有楼栋 */
                this.house();
                }
                //console.log(res);
            });
            },
            house() {
            //先清空
            this.map.clearOverlays();
            var houseMarkerArr = [];
            for (var i = 0; i < this.houseListInfo.houseMarker.length; i++) {
                houseMarkerArr.push(new BMap.Point(...this.houseListInfo.houseMarker[i]));
                var pt = new BMap.Point(...this.houseListInfo.houseMarker[i]);
                var myIcon = new BMap.Icon(
                "./static/images/mapHome.png",
                new BMap.Size(38, 76)
                );
                var houseMarker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
                //houseMarker.customData = { buildingCode: this.houseListInfo.buildingCode[i] }; //自定义参数id,很关键百度不支持直接传参，闭包策略不适用
                //houseMarker.addEventListener("click", this.houseList);
                this.map.addOverlay(houseMarker); // 将标注添加到地图中
            }
            //this.map.setViewport(houseMarkerArr);//两种方法都可自适应
            let mapViewObj = this.map.getViewport(houseMarkerArr); //视野自适应
            this.map.centerAndZoom(mapViewObj.center,  mapViewObj.zoom);
            },
            monitoringInfo(deviceType) {
            this.$axios({
                method: "get",
                url: "/sjwl/webapi/capture",
                params: {
                areaId: 0,
                deviceType: deviceType,
                xqCode:""
                }
            }).then(res => {
                console.log(res)
                if (res.code == 1000) {
                //this.info = res.data.data
                switch (deviceType) {
                    case "":
                        this.monitoringListInfo.monitoringMarker = [];
                        /* 坐标转换 */
                        res.data.forEach(item => {
                            var marker = this.bd_encrypt(
                            item.deviceLocation.split(",")[0],
                            item.deviceLocation.split(",")[1]
                            );
                            this.monitoringListInfo.monitoringMarker.push(marker);
                            this.monitoringListInfo.gbCode.push(item.gbCode);
                            this.monitoringListInfo.gbCodeseq.push(item.gbCodeseq);
                            this.listInfo.list = [];
                            res.data.forEach(item => {
                                this.listInfo.list.push({
                                name: item.deviceName,
                                gbCode:item.gbCode,//调视频用
                                gbCodeseq:item.gbCodeseq
                                });
                            });
                            Object.assign(this.listInfo, {
                                type: "监控",
                                iconPng: require("@static/images/monitoringIcon.png")
                            });
                        });
                        break;
                    case "0":
                         this.FaceMarker = [];
                        /* 坐标转换 */
                        res.data.forEach(item => {
                            var marker = this.bd_encrypt(
                            item.deviceLocation.split(",")[0],
                            item.deviceLocation.split(",")[1]
                            );
                            this.FaceMarker.push(marker);
                        });
                        this.listInfo.list = [];
                        res.data.forEach(item => {
                            this.listInfo.list.push({
                            name: item.deviceName
                            });
                        });
                        Object.assign(this.listInfo, {
                            type: "人脸",
                            iconPng: require("@static/images/faceIcon.png")
                        });
                        break;
                    case "1":
                        this.carMarker = [];
                        /* 坐标转换 */
                        res.data.forEach(item => {
                            var marker = this.bd_encrypt(
                            item.deviceLocation.split(",")[0],
                            item.deviceLocation.split(",")[1]
                            );
                            this.carMarker.push(marker);
                        });
                        this.listInfo.list = [];
                        res.data.forEach(item => {
                            this.listInfo.list.push({
                            name: item.deviceName
                            });
                        });
                        Object.assign(this.listInfo, {
                            type: "车辆",
                            iconPng: require("@static/images/carIcon.png")
                        });
                        break;
                    default:
                        break;
                }
                
                /* 一次性渲染所有摄像头 */
                this.monitoring(deviceType);
                }
            });
            },
            monitoring(deviceType) {
                //先清空
            this.map.clearOverlays();
            switch (deviceType) {
                case "":
                    var monitoringMarkerArr = [];
                    for (
                        var i = 0;
                        i < this.monitoringListInfo.monitoringMarker.length;
                        i++
                    ) {
                        monitoringMarkerArr.push(
                        new BMap.Point(...this.monitoringListInfo.monitoringMarker[i])
                        );
                        var pt = new BMap.Point(...this.monitoringListInfo.monitoringMarker[i]);
                        var myIcon = new BMap.Icon(
                        "./static/images/mapMonitoring.png",
                        new BMap.Size(38, 76)
                        );
                        var monitoringMarker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
                        //!绑定部分
                        /* monitoringMarker.customData = {
                        gbCode: this.monitoringListInfo.gbCode[i],
                        gbCodeseq:this.monitoringListInfo.gbCodeseq[i],
                        }; //自定义参数id,很关键百度不支持直接传参，闭包策略不适用
                        monitoringMarker.addEventListener("click", this.playVideo); */
                        this.map.addOverlay(monitoringMarker); // 将标注添加到地图中
                    }
                    //this.map.setViewport(houseMarkerArr);//两种方法都可自适应
                    var mapViewObj = this.map.getViewport(monitoringMarkerArr); //视野自适应
                    this.map.centerAndZoom(mapViewObj.center, mapViewObj.zoom);
                    break;
                case "0":
                    var FaceMarkerArr = [];
                    for (var i = 0; i < this.FaceMarker.length; i++) {
                        FaceMarkerArr.push(new BMap.Point(...this.FaceMarker[i]));
                        var pt = new BMap.Point(...this.FaceMarker[i]);
                        var myIcon = new BMap.Icon(
                        "./static/images/mapFace.png",
                        new BMap.Size(38, 76)
                        );
                        var FaceMarker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
                        this.map.addOverlay(FaceMarker); // 将标注添加到地图中
                    }
                    //this.map.setViewport(houseMarkerArr);//两种方法都可自适应
                    var mapViewObj = this.map.getViewport(FaceMarkerArr); //视野自适应
                    this.map.centerAndZoom(mapViewObj.center,  mapViewObj.zoom);
                    break;
                case "1":
                    var carMarkerArr = [];
                    for (var i = 0; i < this.carMarker.length; i++) {
                        carMarkerArr.push(new BMap.Point(...this.carMarker[i]));
                        var pt = new BMap.Point(...this.carMarker[i]);
                        var myIcon = new BMap.Icon(
                        "./static/images/mapCar.png",
                        new BMap.Size(38, 76)
                        );
                        var carMarker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
                        this.map.addOverlay(carMarker); // 将标注添加到地图中
                    }
                    //this.map.setViewport(houseMarkerArr);//两种方法都可自适应
                    var mapViewObj = this.map.getViewport(carMarkerArr); //视野自适应
                    this.map.centerAndZoom(mapViewObj.center,  mapViewObj.zoom);
                    break;
                default:
                    break;
            }
            },
            //切换选项
            handleCheckedChange(value) {
                //console.log(value.length)
                if (value.length > 1) {
                    this.minCheck = value[1];
                    this.checkboxGroup = [value.pop()];
                    /* 切换的时候切换列表内容以及请求相应数据 */
                    this.select();
                } else {
                    this.checkboxGroup = [this.minCheck];
                }
            },
            select() {
                switch (this.minCheck) {
                    case "小区":
                    this.communityInfo();
                    break;
                    case "房屋":
                    this.houseInfo();
                    break;
                    case "监控":
                    this.monitoringInfo("");
                    break;
                    case "人脸":
                    this.monitoringInfo("0");
                    break;
                    case "车辆":
                    this.monitoringInfo("1");
                    break;
                    default:
                    break;
                }
            }
        },
        mounted () {
            this.$nextTick(()=>{
                this.initMap()
            })
        }
    }
</script>

<style lang="scss" scoped>
    .map{
        height: 956px;
        width: 1048px;
        float: left;
        margin:20px 0 0 20px;
    }
    #map{
        width: 100%;
        height:625px;
    }
    .switchMap{
        width: 100%;
        height: 310px;
        margin-top:22px;
        overflow: hidden;
        .SwitchBox{
        ul {
        width: 100%;
        height: 270px;
        overflow: auto;
        //background:red;
        margin-top: 15px;
        li {
            height: 60px;
            float: left;
            width: 25%;
            //background:blueviolet;
            line-height: 60px;
            overflow: hidden;
            cursor: pointer;
            img {
            float: left;
            margin: 15px 20px 0 35px;
            }
            span {
            font-size: 16px;
            }
        }
        }
        } 
    }
</style>