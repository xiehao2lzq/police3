<template>
    <div class="rightWebsocket">
         <div class="header">
            <div class="title">
                <img src="@static/images/title.png" alt="">
                <span>人脸抓拍</span>
            </div>
            <div class="router">
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <div class="websocket">
            <RealTimeList v-for="personPic in personPics" :key="personPic.id" :item="personPic" />
        </div>
        <div class="header">
            <div class="title">
                <img src="@static/images/title.png" alt="">
                <span>车辆抓拍</span>
            </div>
            <div class="router">
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <div class="websocket">
            <RealTimeList v-for="carPic in carPics" :key="carPic.id" :item="carPic" />
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import RealTimeList from "./realTimeList"
    export default {
        components: {
            RealTimeList
        },
        computed: {
            ...mapState({
                personPics:state=>state.common.personPic
            }),
            ...mapState({
                carPics:state=>state.common.carPic
            })
        }
    }
</script>

<style lang="scss" scoped>
    .rightWebsocket{
        height: 956px;
        width:420px;
        float: left;
        margin:20px 0 0 30px;
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
    .websocket{
        width: 100%;
        height: 420px;
        overflow: hidden;
    }
</style>