<template>
    <div class="outOrInCard">
        <div class="selectBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                <el-form-item label="小区：">
                    <el-select v-model="formInline.xqCode" style="width:132px;" placeholder=''>
                        <el-option v-for="xqInfo in xqInfos" :key="xqInfo.xqCode" :label="xqInfo.xqName" :value="xqInfo.xqCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间：">
                    <el-date-picker v-model="formInline.time" style="width:392px;" @change="date_change" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input v-model="formInline.personName" style="width:92px"></el-input>
                </el-form-item>
                <el-form-item label="居住身份：">
                    <el-select v-model="formInline.liveType" style="width:132px" placeholder=''>
                        <el-option label="房主及家庭成员" value="1"></el-option>
                        <el-option label="租户" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键字：">
                    <el-input v-model="formInline.likeStr" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item class="select_btn">
                    <el-button type="primary" @click="gainOutOrInCard" >查询</el-button>
                    <el-button type="primary" @click="reset" >重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="listbox">
            <div v-for="(item) in listData" :key="item.index">
                <img :src="item.capImage"/>
                <div>
                    <p><span>姓名：{{item.xqName}}</span></p>
                    <p><span>电话：{{item.phone}}</span></p>
                    <p><span>证件号码：{{item.paperNum}}</span></p>
                    <p><span>小区：{{item.xqName}}</span></p>
                    <p><span>房号：{{item.roomName}}</span></p>
                    <p><span>居住身份：{{item.liveTypeName}}</span></p>
                    <p><span>出人类型：{{item.access}}</span></p>
                    <p><span>出入门禁：{{item.deviceName}}</span></p>
                </div>
            </div>
        </div>
        <el-pagination
            class="pagination"
            @current-change="handleCurrentChange"
            :current-page="page"
            layout="prev, pager, next,total, jumper"
            :total="total"
            :page-size="limit"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name:'outOrInCard',
        data(){
            return{
                xqInfos:JSON.parse(sessionStorage.getItem("xqInfos")),
                formInline: {
                   xqCode:"",
                   personName:"",
                   time:'',
                   likeStr:"",
                   liveType:"",
                   startTime:"",
                   endTime:""
                },
                listData:[],
                page: 1,
                limit:9,
                total:0
            }
        },
        created () {
          this.gainOutOrInCard()
        },
        methods:{
            //todo 出入记录
            gainOutOrInCard(){
                if(!this.formInline.time){
                   this.formInline.startTime = this.formInline.time[0]
                   this.formInline.endTime = this.formInline.time[1]
                }
                this.$axios({
                    method:"get",
                    url:"sjwl/webapi/person/access",
                    params:{...this.formInline,page:this.page,limit:this.limit}
                }).then(res=>{
                    if(res.code==="1000"){
                        this.listData = res.data.list
                        this.total = res.data.totalRows
                        this.page = res.data.currentPage
                    }
                    console.log(res)
                })
            },
            // todo 重置
            reset(){
                this.formInline = {
                   xqCode:"",
                   personName:"",
                   time:'',
                   likeStr:"",
                   liveType:"",
                   startTime:"",
                   endTime:""
                }
            },
            handleCurrentChange(val) {
                this.page = val
                this.gainOutOrInCard()
            },
            date_change(e){
                console.log(e)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .outOrInCard{
        padding-top: 15px;
    }
    .selectBox{
        width: 1512px;
        height: 80px;
        border: 1px solid rgba($color:  #1D8EED, $alpha: 0.7);
        padding-top: 22px;
        padding-left: 20px;
    }
    .select_btn{
        float: right;
    }
    .listbox{
        width: 1512px;
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
    }
    .listbox>div{
        width: 486px;
        height: 230px;
        border: 1px solid rgba($color:  #1D8EED, $alpha: 0.7);
        margin-top: 20px;
        margin-right: 18px;
        display: flex;
        padding-left: 20px;
        background-color: rgba(12,61,163,0.8);
    }
    .listbox>div>img{
        width: 160px;
        height: 180px;
        margin-top: 25px;
    }
    .listbox>div>div{
        margin:25px 0 0 15px
    }
    .listbox>div>div>p{
        line-height: 23px;
    }
    .pagination{
        position: absolute;
        right: 30px;
        bottom: 10px;
    }
</style>
<style>
    .outOrInCard .el-input--small .el-input__inner{
        color:#000!important;
    }
    .outOrInCard .el-form-item__label{
        color: white;
    }
    .outOrInCard .el-input--small .el-input__inner{
        background-color: #1E62D5;
        border:0;
        color: white;
    }
    .outOrInCard .el-button{
        background-color: #1E62D5;
        width: 80px;
        height: 30px;
        border: 0;
    }
    .outOrInCard .el-range-editor--small.el-input__inner,.outOrInCard .el-range-input{
        background-color: #1E62D5;
        color: white;
        border: none;
    }
    /* 分页背景色 */
    .el-pagination .btn-prev,.el-pagination .el-dialog,.el-pagination .el-pager li,.el-pagination .btn-next,.el-pagination .el-input__inner{
        background:none !important;
    }
    /* 分页字体颜色 */
    .btn-prev,.el-pager>li,.btn-next,.el-pagination__total,.el-pagination__jump,.el-input__inner{
        color: white !important;
    }
</style>