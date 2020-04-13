<template>
    <div class="heighOutOrIn">
        <div class="selectBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                <el-form-item label="小区：">
                    <el-select v-model="formInline.xqCode" style="width:132px;" placeholder=''>
                        <el-option v-for="xqInfo in xqInfos" :key="xqInfo.xqCode" :label="xqInfo.xqName" :value="xqInfo.xqCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="人员类型：">
                    <el-select v-model="formInline.liveType" style="width:132px" placeholder=''>
                        <el-option label="房主及家庭成员" value="1"></el-option>
                        <el-option label="租户" value="2"></el-option>
                        <el-option label="陌生人" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出入频率：">
                    <el-input v-model="formInline.accessNum" style="width:132px" placeholder="请输入数字"></el-input>
                </el-form-item>
                <el-form-item class="select_btn">
                    <el-button type="primary" @click="gainHeighOutOrIn" >查询</el-button>
                    <el-button type="primary" @click="reset" >重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="listbox">
            <div v-for="(item) in listData" :key="item.index">
                <img :src="item.capImage"/>
                <div class="personinfo">
                    <p><span>姓名：{{item.personName}}</span></p>
                    <p><span>居住身份：{{item.liveTypeName}}</span></p>
                    <p><span>联系电话：{{item.phone}}</span></p>
                    <p><span>出入记录：{{item.senseNum}}</span></p>
                    <p style="color:#24CFCB;cursor:pointer" @click="open_info(item.personId)">详情 >></p>
                </div>
                <div class="rightTop">凤凰城</div>
            </div>
        </div>
        <!-- 人员详情弹出层 -->
        <el-dialog title=" " :visible.sync="Dialog_person">
            <el-table :data="personData" fit :row-class-name="tableRowClassName">
                <el-table-column property="image" label="抓拍图" >
                    <template slot-scope="scope">
                        <img :src="scope.row.image"  style="width:80px;height:90px;display:block;margin:0 auto">
                    </template>
                </el-table-column>
                <el-table-column property="capTime" label="时间" ></el-table-column>
                <el-table-column property="capAddress" label="抓拍位置" ></el-table-column>
                <el-table-column property="xqName" label="小区"></el-table-column>
            </el-table>
        </el-dialog>
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
        name:'heighOutOrIn',
        data(){
            return{
                xqInfos:JSON.parse(sessionStorage.getItem("xqInfos")),
                formInline: {
                   xqCode:"",
                   accessNum:"",
                   liveType:"",
                },
                listData:[],
                page: 1,
                limit:9,
                total:0,
                //人员详情弹出层
                Dialog_person:false,
                personData: [
                    
                ]
            }
        },
        created () {
          this.gainHeighOutOrIn()  
        },
        methods:{
            reset(){
                this.formInline={
                   xqCode:"",
                   accessNum:"",
                   liveType:"",
                }
            },
            gainHeighOutOrIn(){
                this.$axios({
                    method:"get",
                    url:"sjwl/webapi/person/sense/highAccess",
                    params:{...this.formInline,page:this.page,limit:this.limit}
                }).then(res=>{
                    if(res.code==="1000"){
                        this.listData = res.data.list
                        this.page = res.data.currentPage
                        this.total = res.data.totalRows
                    }
                })
            },
            //todo 切换页
            handleCurrentChange(val) {
               this.page = val
               this.gainHeighOutOrIn()
            },
            //人员详情弹出层
            open_info(personId){
                this.Dialog_person = true;
                this.$axios({
                    method:"get",
                    url:"sjwl/webapi/person/sense/highAccess/info",
                    params:{
                        limit:10,
                        page:1,
                        personId:personId
                    }
                }).then(res=>{
                    if(res.code==="1000"){
                        this.personData = res.data.list
                    }
                })
            },
            //表格隔行显示颜色设置
            tableRowClassName({row,rowIndex}) {
                if(rowIndex % 2 !==1) {
                    return 'oddrow'
                }
                return ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .heighOutOrIn{
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
        line-height: 33px;
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
    /* el-table 所有内容居中显示 */
    .el-table td, .el-table th.is-leaf, .el-table--enable-row-transition .el-table__body td{
        text-align: center;
        border: none;
    }
    /* 查询部分字体白色 背景蓝色 */
    .heighOutOrIn .el-form-item__label{
        color: white;
    }
    .heighOutOrIn .el-input--small .el-input__inner{
        background-color: #1E62D5;
        border:0;
        color: white;
    }
    .heighOutOrIn .el-button{
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
    /* dialog背景颜色 */
    .heighOutOrIn .el-dialog{
        background:rgba(10,61,151,1);
        border:1px solid rgba(72, 93, 240, 1);
        opacity:0.9;
    }
    /* dialog 中table背景色设置成透明 */
    .heighOutOrIn .el-table__row,.heighOutOrIn .el-dialog__body,.heighOutOrIn .el-dialog__header,.heighOutOrIn .el-table th, .heighOutOrIn .el-table tr,.heighOutOrIn .el-table{
        /* background-color:rgba(10,61,151,1)!important; */
        background-color: transparent;
        border: none;
        color: white;
    }
    /* 鼠标移入table中变色设置 */
    .heighOutOrIn .el-table__body tr:hover > td{
        background-color:transparent !important;
    }
    /* table偶数行颜色 */
    .heighOutOrIn .el-table .oddrow{
        background-color:rgb(30,98,214)!important;
    }
    /* table右上角×设置为白色 */
    .heighOutOrIn .el-dialog__headerbtn .el-dialog__close{
        color: white;
    }
</style>