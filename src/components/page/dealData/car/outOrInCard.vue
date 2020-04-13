<template>
    <div class="outOrInCard">
        <div class="selectBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                <el-form-item label="小区：">
                    <el-select v-model="formInline.xqCode" style="width:132px;" placeholder=''>
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房屋类型：">
                    <el-select v-model="formInline.roomType" style="width:132px" placeholder=''>
                        <el-option label="自助" value="1"></el-option>
                        <el-option label="出租" value="2"></el-option>
                        <el-option label="空置" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车主：">
                    <el-input v-model="formInline.personName" style="width:132px"></el-input>
                </el-form-item>
                <el-form-item label="车牌：">
                    <el-select v-model="formInline.carNum" style="width:132px" placeholder=''>
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键字：">
                    <el-input v-model="formInline.likeStr" style="width:162px"></el-input>
                </el-form-item>
                <el-form-item class="select_btn">
                    <el-button type="primary" @click="search()">查询</el-button>
                    <el-button type="primary" @click="clearSearch()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="listbox">
            <div v-for="(item,key) in tableData" :key="key">
                <!-- <img src="@/assets/vscode1.jpg"/>
                <div class="personinfo">
                    <p><span>时间：2020/02/02 09:09:09</span></p>
                    <p><span>车牌：鲁B12345</span></p>
                    <p><span>小区：凤凰城</span></p>
                    <p><span>出入门禁：东门出入口</span></p>
                    <p><span>出入类型：入场</span></p>
                    <p><span>车主姓名：张三</span></p>
                    <p><span>居住身份：业主</span></p>
                </div> -->
                <img :src="item.realCapturePicPath"/>
                <div class="personinfo">
                    <p><span>时间：{{item.capTime}}</span></p>
                    <p><span>车牌：{{item.carNum}}</span></p>
                    <p><span>小区：{{item.xqName}}</span></p>
                    <p><span>出入门禁：{{item.devChnName}}</span></p>
                    <p><span>出入类型：{{item.carDirect}}</span></p>
                    <p><span>车主姓名：{{item.personName}}</span></p>
                    <p><span>居住身份：{{item.liveTypeName}}</span></p>
                </div>
            </div>
        </div>
        <el-pagination
            class="pagination"
            @current-change="handleCurrentChange"
            :current-page="pageData.pageIndex"
            :page-size="pageData.pageSize"
            layout="prev, pager, next,total, jumper"
            :total="pageData.recordCount"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name:'outOrInCard',
        data(){
            return{
                formInline: {
                    xqCode: '',
                    roomType: '',
                    personName:'',
                    carNum:'',
                    likeStr:''
                },
                listData:[1,2,3,4,5,6,7,8],
                pageData:{
                    pageIndex: 1,
                    pageSize:9,
                    pageCount: '',
                    recordCount: 0
                },
                tableData:[]
            }
        },
        created(){
            this.getList()
        },
        methods:{
            //分页
            handleCurrentChange(val) {
                this.pageData.pageIndex = val;
                this.getList()
            },
            //获取列表
            getList(){
                let _this = this;
                _this.$axios({
                    methods:'GET',
                    url:'/sjwl/webapi/tj/carAccess/list',
                    params:{
                        limit:'9',
                        page:_this.pageData.pageIndex,
                        areaId:'0'
                    }
                }).then(res => {
                    if(res.code == 1000){
                        _this.tableData = res.data.list;
                        _this.pageData.pageIndex = res.data.currentPage;
                        _this.pageData.recordCount = res.data.totalRows;
                    }
                })
            },
            //查询
            search(){
                this.pageData.pageIndex = 1;
                this.getList()
            },
            //查询重置
            clearSearch(){
                let _this = this;
                for(let i in _this.formInline){
                    _this.formInline[i] = ''
                }
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
        line-height: 27px;
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
     /* 分页背景色 */
    .pagination .btn-prev,.pagination .el-dialog,.pagination .el-pager li,.pagination .btn-next,.pagination  .el-input__inner{
        background:none !important;
    }
    /* 分页字体颜色 */
    .pagination .btn-prev,.pagination .el-pager>li,.pagination .btn-next,.pagination .el-pagination__total,.pagination .el-pagination__jump,.pagination .el-input__inner{
        color: white !important;
    }
</style>