<template>
    <div class="suspectedInPerson">
       <div class="selectBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                <el-form-item label="小区：">
                    <el-select v-model="formInline.xqCode" style="width:132px;" placeholder=''>
                        <el-option v-for="xqInfo in xqInfos" :key="xqInfo.xqCode" :label="xqInfo.xqName" :value="xqInfo.xqCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-select v-model="formInline.sex" style="width:132px;" placeholder=''>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄段：">
                    <el-select v-model="formInline.age" style="width:132px" placeholder=''>
                        <el-option label="未成年" value="0"></el-option>
                        <el-option label="青年" value="1"></el-option>
                        <el-option label="中年" value="2"></el-option>
                        <el-option label="老年" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="近15天抓拍次数：">
                    <el-input v-model="formInline.daySmall" style="width:132px"></el-input>
                </el-form-item>
                <el-form-item label="关键字：">
                    <el-input v-model="formInline.likeStr" style="width:132px"></el-input>
                </el-form-item>
                <el-form-item class="select_btn">
                    <el-button type="primary" @click="gainSuspectedInPerson" >查询</el-button>
                    <el-button type="primary" @click="reset" >重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="listbox" >
            <div v-for="(item,key) in listData" :key="key">
                <img :src="item.faceImage"/>
                <div class="personinfo">
                    <p><span>性别：{{item.sex}}</span></p>
                    <p><span>年龄段：{{item.age}}</span></p>
                    <p><span>近15天抓拍天数：{{item.capDays}}</span></p>
                    <p style="color:#24CFCB;cursor:pointer">抓拍详情 >></p>
                </div>
                <div class="rightTop">{{item.xqName}}</div>
            </div>
        </div>
        <el-pagination
            class="pagination"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="limit"
            layout="prev, pager, next,total, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name:'suspectedInPerson',
        data(){
            return{
                xqInfos:JSON.parse(sessionStorage.getItem("xqInfos")),
                formInline: {
                   xqCode:"",
                   daySmall:"",
                   likeStr:"",
                   sex:"",
                   age:""
                },
                listData:[],
                page:1,
                limit:9,
                total:0
            }
        },
        created () {
          this.gainSuspectedInPerson()  
        },
        methods:{
            reset(){
                this.formInline = {
                   xqCode:"",
                   daySmall:"",
                   likeStr:"",
                   sex:"",
                   age:""
                }
            },
            gainSuspectedInPerson(){
                this.$axios({
                    method:"get",
                    url:"sjwl/webapi/person/added/list",
                    params:{
                        ...this.formInline,
                        page:this.page,
                        limit:this.limit
                    }
                }).then(res=>{
                    if(res.code==="1000"){
                        this.listData = res.data.list
                        this.page = res.data.currentPage
                        this.total = res.data.totalRows
                    }
                })
            },
             //分页
            handleCurrentChange(val) {
                this.page = val
                this.gainSuspectedInPerson()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .suspectedInPerson{
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
    //list
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
        position: relative;
        background-color: rgba(12,61,163,0.8);
    }
    .listbox>div>img{
        width: 160px;
        height: 180px;
        margin-top: 25px;
    }
    .listbox>div>.personinfo{
        margin:25px 0 0 15px
    }
    .listbox>div>div>p{
        line-height: 32px;
    }
    .rightTop{
        width: 86px;
        height: 32px;
        color: white;
        background-color:#24CFCB;
        border-radius: 0 0 10px 10px;
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
        line-height: 32px;
    }
    // 分页位置
    .pagination{
        position: absolute;
        right: 30px;
        bottom: 10px;
    }
</style>
<style>
     /* 查询部分字体白色 背景蓝色 */
    .suspectedInPerson .el-form-item__label{
        color: white;
    }
    .suspectedInPerson .el-input--small .el-input__inner{
        background-color: #1E62D5;
        border:0;
        color: white;
    }
    .suspectedInPerson .el-button{
        background-color: #1E62D5;
        width: 80px;
        height: 30px;
        border: 0;
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