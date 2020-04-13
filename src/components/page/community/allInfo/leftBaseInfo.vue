<template>
    <div class="leftBaseInfo">
        <div class="header">
            <div class="title">
                <img src="@static/images/title.png" alt="">
                <span>社区基础要素</span>
            </div>
            <div class="router">
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <div class="baseInfo house">
            <div class="left">
                <span class="iconfont icon-fangwu"></span>
                <span>实有房屋</span>
            </div>
            <span>
                {{baseInfo.houseNum}}
            </span>
        </div>
        <div class="baseInfo person">
            <div class="left">
                <span class="iconfont icon-duorenyonghu"></span>
                <span>实有人口</span>
            </div>
            <span>
                {{baseInfo.personNum}}
            </span>
        </div>
        <div class="baseInfo car">
            <div class="left">
                <span class="iconfont icon-che"></span>
                <span>实有车辆</span>
            </div>
            <span>
                {{baseInfo.carNum}}
            </span>
        </div>
        <div class="header">
            <div class="title">
                <img src="@static/images/title.png" alt="">
                <span>今日数据感知</span>
            </div>
        </div>
        <div class="baseInfo personInOrOut">
            <div class="left">
                <span class="iconfont icon-jilu"></span>
                <span>人员出入</span>
            </div>
            <span>
                {{baseInfo.personAccessNum}}
            </span>
        </div>
        <div class="baseInfo carInOrOut">
            <div class="left">
                <span class="iconfont icon-che"></span>
                <span>车辆出入</span>
            </div>
            <span>
                {{baseInfo.carAccessNum}}
            </span>
        </div>
        <div class="baseInfo personPic">
            <div class="left">
                <span class="iconfont icon-wo"></span>
                <span>人脸抓拍</span>
            </div>
            <span>
                {{baseInfo.personCapNum}}
            </span>
        </div>
        <div class="baseInfo carPic">
            <div class="left">
                <span class="iconfont icon-che"></span>
                <span>车辆抓拍</span>
            </div>
            <span>
                {{baseInfo.carCapNum}}
            </span>
        </div>
         <div class="header">
            <div class="title">
                <img src="@static/images/title.png" alt="">
                <span>智慧预警</span>
            </div>
        </div>
        <div class="table"> 
            <el-table
            :data="tableData"
            height="260"
            style="width: 100%"
            >
            <el-table-column prop="captureTime" label="时间"></el-table-column>
            <el-table-column label="地点">
                <template slot-scope="scope">
                <span>{{scope.row.xqName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="alarmType" label="事件"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tableData:[],
                baseInfo:{}
            }
        },
        created () {
            this.table()
            this.gainBaseInfo()
        },
        methods: {
            gainBaseInfo(){
                this.$axios({  
                    method:"get",
                    url:"sjwl/webapi/baseData"
                }).then(res=>{
                    if(res.code==="1000"){
                        this.baseInfo =res.data
                    }
                })
            },
            table(){
                this.$axios({
                method:'get',
                url:"sjwl/webapi/alarm/homeList",
                params:{areaId:0}
                }).then(res=>{
                if(res.code=="1000"){
                    this.tableData = res.data.list
                }
                })
             }
        }
    }
</script>

<style lang="scss" scoped>
    .leftBaseInfo{
        float: left;
        width: 360px;
        height: 956px;
        //background: red;
        margin:20px 0 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .header{
        width: 100%;
        height: 22px;
        position: relative;
        .title{
            width: 227px;
            height: 22px;
            background: linear-gradient(-135deg,transparent 7px,rgba(7, 53, 157,0.6) 0);
            float: left;
            img{
                position: absolute;
                left: -15px;
            }
            span{
                margin-left: 15px;
                line-height: 22px;
                color:rgba(207,226,248,1);
                font-size: 20px;
            }
        }
        .router{
            float:right;
            width:46px;
            height:22px;
            background:#07359D;
            border:1px solid rgba(29, 142, 237, 0.69);
            opacity:0.6;
            border-radius:11px;
            text-align: center;
            cursor: pointer;
        }
    }
    .baseInfo{
            width:360px;
            height:54px;
            background:rgba(9,42,127,1);
            border:1px solid rgba(29, 142, 237, 0.69);
            opacity:0.6;
            border-radius: 4px;
            box-sizing:border-box;
            padding:0 40px;
            display: flex;
            justify-content:space-between ;
            align-items: center;
            span{
                font-size: 24px;
                font-weight: 900;
            }
            .iconfont{
                margin-right: 10px;
            }
        }  
        .house,.personInOrOut,.carPic{
                span{
                    background:linear-gradient(225deg,rgba(24,96,255,1),rgba(55,234,255,1));
                    -webkit-background-clip: text;
                    color: transparent;
                    -webkit-text-fill-color: transparent;
                    text-fill-color: transparent;
                }
            }
        .person,.carInOrOut{
            span{
                background:linear-gradient(225deg,rgba(255,61,76,1),rgba(255,151,128,1));
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
                text-fill-color: transparent;
            }
        }
        .car,.personPic{
            span{
                background:linear-gradient(225deg,rgba(19,196,184,1),rgba(118,233,192,1));
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
                text-fill-color: transparent;
            }
        }
        .table{
            width: 100%;
            height: 260px;
            //background:chocolate;
        } 
</style>