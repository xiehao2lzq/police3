<template>
    <div class="dealData">
        <div class="leftNavs">
            <div class="title">
                <span class="point"></span>
                <span class="text">数据感知与数据治理</span>
            </div>
            <div class="navBox">
                <router-link v-for="nav in navs" :key="nav.id" tag="li" :to="nav.path">
                    <span :class="'iconfont'+' '+nav.icon"></span>
                    <span>{{nav.title}}</span>
                </router-link>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
       data () {
           return {
               navs:[
                   {id:1,path:"/dealData/person",icon:"icon-wo",title:"人员感知"},
                   {id:2,path:"/dealData/car",icon:"icon-che",title:"车辆感知"},
                   {id:3,path:"/dealData/device",icon:"icon-shexiangtou",title:"无感采集"}
               ]
           }
       },
    }
</script>

<style lang="scss" scoped>
    .dealData{
        display: flex;
        justify-content: space-between;
    }
    .leftNavs{
        width:334px;
        height:965px;
        background:#07359D;
        border:1px solid rgba(29, 142, 237, 0.69);
        opacity:0.6;
        margin:20px 0 0 20px;
        .title{
            height: 36px;
            display: flex;
            align-items: center;
            span{
                float: left;
                margin-left: 15px;
            }
        }
        .point{
            width:10px;
            height:10px;
            background:linear-gradient(0deg,rgba(35,230,189,1),rgba(35,197,235,1));
            box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.12);
            border-radius:50%;
        }
        .text{
            font-size:18px;
            font-weight:400;
            color:rgba(168,201,251,1);
        }
        li{
            width:260px;
            height:52px;
            margin:15px auto;
            display: flex;
            align-items: center;
            cursor: pointer;
            span{
                display: block;
                font-size: 18px;
                margin-left: 15px;
                color:#fff;
            }
            .iconfont{
                font-size: 20px;
                width:25px;
                margin-right: 15px;
            }
            .icon-wo{
                background:linear-gradient(159deg,rgba(143,234,248,1),rgba(84,164,232,1));
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
                text-fill-color: transparent;
            }
            .icon-che{
                background:linear-gradient(225deg,rgba(255,61,76,1),rgba(255,151,128,1));
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
                text-fill-color: transparent;
            }
            .icon-shexiangtou{
                background:linear-gradient(0deg,rgba(35,230,189,1),rgba(35,197,235,1));
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
                text-fill-color: transparent;
            }

        }
        .router-link-active{
            background:rgba($color: #1E62D5, $alpha: 0.6);
            border-radius: 4px;
            border:1px solid rgba(29, 142, 237, 0.69);
            .iconfont{
                  background:#fff;
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
                text-fill-color: transparent;
            }
        }

    }
</style>