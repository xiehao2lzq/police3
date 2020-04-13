<template>
    <div class="car">
        <div class="navs">
            <router-link v-for="nav in navs" :key="nav.id" :to="nav.path" tag="li">
                {{nav.title}}
            </router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                navs:[
                    {id:"1",path:"/dealData/car/nowPic",title:"实时抓拍"},
                    {id:"2",path:"/dealData/car/outOrInCard",title:"出入记录"},
                    {id:"3",path:"/dealData/car/heighOutOrIn",title:"高频出入车辆"}
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
    .car{
        width:1530px;
        height: 956px;
        margin:20px 20px 0 0px;
        position: relative;
    }
    .navs{
        height: 25px;
        width: 100%;
        display: flex;
        align-items: center;
        box-sizing:border-box;
        padding-left: 20px;
        li{
            cursor: pointer;
            padding: 5px 20px;
            margin:0 10px;
            font-size: 16px;
        }
        .router-link-active{
             border-bottom: 3px solid rgba($color: #328CE5, $alpha: 1);
             background-image: linear-gradient(to top,rgba($color: #328CE5, $alpha: 0.7),rgba($color: #328CE5, $alpha: 0) );
        }
    }
</style>