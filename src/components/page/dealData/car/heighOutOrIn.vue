<template>
    <div class="heighOutOrIn">
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
                <el-form-item label="车牌：">
                    <el-input v-model="formInline.carNum" style="width:132px"></el-input>
                </el-form-item>
                <el-form-item label="关键字：">
                    <el-input v-model="formInline.likeStr" style="width:132px"></el-input>
                </el-form-item>
                <el-form-item class="select_btn">
                    <el-button type="primary" @click="search()">查询</el-button>
                    <el-button type="primary" @click="clearSearch()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="listbox">
            <div v-for="(item,key) in tableData" :key="key">
                <img :src="item.image"/>
                <div class="personinfo">
                    <p><span>车牌：{{item.carNum}}</span></p>
                    <p><span>车主：{{item.ownerName}}</span></p>
                    <p><span>电话：{{item.phone}}</span></p>
                    <p><span>房屋信息：{{item.roomName}}</span></p>
                    <p><span>出入次数：{{item.senseNum}}</span></p>
                    <p style="color:#24CFCB;cursor:pointer" @click="open_info(item.carNum)">查看详情 >></p>
                </div>
                <div class="rightTop">{{item.xqName}}</div>
            </div>
        </div>
        <!-- 弹出层详情 -->
        <el-dialog title=" " :visible.sync="Dialog_car">
            <div class="table">
                <el-table :data="infoList" fit :row-class-name="tableRowClassName">
                    <el-table-column property="headimg" label="抓拍图" >
                        <template slot-scope="scope">
                            <img :src="scope.row.capImage"  style="width:80px;height:90px;display:block;margin:0 auto">
                        </template>
                    </el-table-column>
                    <el-table-column property="capTime" label="时间" ></el-table-column>
                    <el-table-column property="capAddress" label="抓拍位置" ></el-table-column>
                    <el-table-column property="xqName" label="小区"></el-table-column>
                </el-table>
            </div>
        </el-dialog>
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
        name:'heighOutOrIn',
        data(){
            return{
                formInline: {
                    xqCode: '',
                    roomType: '',
                    carNum:'',
                    likeStr:''
                },
                listData:[1,2,3,4,5,6,7,8],
                tableData:[],
                infoList:[],
                //人员详情弹出层
                Dialog_car:false,
                pageData:{
                    pageIndex: 1,
                    pageSize:9,
                    pageCount: '',
                    recordCount: 0
                },
                personData: [
                    {
                        headimg:'static/img/vscode1.jpg',
                        date: '2016-05-02',
                        name: '18号楼东西向',
                        address: '凤凰城'
                    }, {
                        headimg:'static/img/vscode1.jpg',
                        date: '2016-05-04',
                        name: '18号楼东西向',
                        address: '凤凰城'
                    }, {
                        headimg:'static/img/vscode1.jpg',
                        date: '2016-05-01',
                        name: '18号楼东西向',
                        address: '凤凰城'
                    }, {
                        headimg:'static/img/vscode1.jpg',
                        date: '2016-05-03',
                        name: '18号楼东西向',
                        address: '凤凰城'
                    }
                ]
            }
        },
        created(){
            let _this = this;
            _this.getList()
        },
        methods:{
            //分页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //人员详情弹出层
            open_info(carNum){
                let _this = this;
                _this.Dialog_car = true;
                _this.$axios({
                    methods:'GET',
                    url:'/sjwl/webapi/car/sense/highAccess/info',
                    params:{
                        carNum:carNum
                    }
                }).then(res => {
                    if(res.code == 1000){
                        _this.infoList = res.data.list;
                    }
                })
            },
            //表格隔行显示颜色设置
            tableRowClassName({row,rowIndex}) {
                if(rowIndex % 2 !==1) {
                    return 'oddrow'
                }
                return ''
            },
            getList(){
                let _this = this;
                _this.$axios({
                    methods:'GET',
                    url:'/sjwl/webapi/car/sense/highAccess',
                    params:{
                        limit:'10',
                        page:'1',
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
        line-height: 30px;
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
    .el-form-item__label{
        color: white;
    }
    .el-input--small .el-input__inner{
        background-color: #1E62D5;
        border:0;
        color: white;
    }
    .el-button{
        background-color: #1E62D5;
        width: 80px;
        height: 30px;
        border: 0;
    }
     /* 分页背景色 */
    .pagination .btn-prev,.pagination .el-dialog,.pagination .el-pager li,.pagination .btn-next,.pagination .el-input__inner{
        background:none !important;
    }
    /* 分页字体颜色 */
    .btn-prev,.el-pager>li,.btn-next,.el-pagination__total,.el-pagination__jump,.pagination .el-input__inner{
        color: white !important;
    }

    /* table偶数行颜色 */
    .heighOutOrIn .el-table .oddrow{
        background-color:rgb(30,98,214)!important;
    }
    /* 鼠标移入table中变色设置 */
    .heighOutOrIn .el-table__body tr:hover > td{
        background-color:transparent !important;
    }
    /* table右上角×设置为白色 */
    .heighOutOrIn .el-dialog__headerbtn .el-dialog__close{
        color: white;
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
    /* el-table 所有内容居中显示 */
    .el-table td, .el-table th.is-leaf, .el-table--enable-row-transition .el-table__body td{
        text-align: center;
        border: none;
    }
</style>