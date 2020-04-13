<template>
    <div class="suspectedOutPerson">
        <div class="selectBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                <el-form-item label="小区：">
                    <el-select v-model="formInline.xqCode" style="width:132px;" placeholder=''>
                        <el-option v-for="xqInfo in xqInfos" :key="xqInfo.xqCode" :label="xqInfo.xqName" :value="xqInfo.xqCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="未感知时长：">
                    <el-input v-model="formInline.daySmall" style="width:182px" placeholder='请输入数字'></el-input>
                </el-form-item>
                <el-form-item label="关键字：">
                    <el-input v-model="formInline.likeStr" style="width:182px"></el-input>
                </el-form-item>
                <el-form-item class="select_btn">
                    <el-button type="primary" @click="gainSuspectedOutPerson" >查询</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tabList">
            <div @click="tabClick(1)" :class="[tabNo==1? 'tabClick' : '']">人员列表</div>
            <div @click="tabClick(2)" :class="[tabNo==2? 'tabClick' : '']">处理记录</div>
            <div @click="tabClick(3)" :class="[tabNo==3? 'tabClick' : '']">迁出人员</div>
        </div>
        <!-- 人员列表 -->
        <div v-if="tabNo==1">
            <div class="listbox" >
                <div v-for="(item,key) in listData" :key="key">
                    <img :src="item.image"/>
                    <div class="personinfo">
                        <p><span>姓名：{{item.name}}</span></p>
                        <p><span>联系电话：{{item.phone}}</span></p>
                        <p><span>末次感知：{{item.lastCapTime}}</span></p>
                        <p><span>未感知时长：{{item.noSenceTime+"天"}}</span></p>
                        <p style="margin-top:20px">
                            <el-button style="background:rgba(181,181,181,1);color:white;border:none;width:76px;height:32px" @click="overlook(item.ownerId,item.xqCode)">忽略</el-button>
                            <el-button style="background:rgba(36,207,203,1);color:white;border:none;width:76px;height:32px;margin-left:50px" @click="personOut(item.ownerId,item.xqCode)">迁出</el-button>
                        </p>
                    </div>
                    <div class="rightTop">{{item.xqName}}</div>
                </div>
            </div>
            <el-pagination
                class="pagination"
                @current-change="handleCurrentChange1"
                :current-page="pageData1.page"
                :page-size="pageData1.limit"
                layout="prev, pager, next,total, jumper"
                :total="pageData1.total"
            >
            </el-pagination>
        </div>
        <!-- 处理记录 -->
        <div v-if="tabNo==2">
            <div class="listbox" >
                <div v-for="(item,key) in listData" :key="key">
                    <img :src="item.image"/>
                    <div class="personinfo">
                        <p><span>姓名：{{item.name}}</span></p>
                        <p><span>联系电话：{{item.phone}}</span></p>
                        <p><span>末次感知：{{item.lastCapTime}}</span></p>
                        <p><span>处理时间：{{item.handleTime}}</span></p>
                        <p><span>操作：{{item.handleContent}}</span></p>
                        <p><span>操作账号：{{item.handleUser}}</span></p>
                    </div>
                    <div class="rightTop">凤凰城</div>
                </div>
            </div>
            <el-pagination
                class="pagination"
                @current-change="handleCurrentChange2"
                :current-page="pageData1.page"
                :page-size="pageData2.limit"
                layout="prev, pager, next,total, jumper"
                :total="pageData2.total"
            >
            </el-pagination>
        </div>
        <!-- 迁出人员 -->
        <div v-if="tabNo==3">
            <div class="listbox" >
                <div v-for="(item,key) in listData" :key="key">
                    <img :src="item.image"/>
                    <div class="personinfo">
                        <p><span>姓名：{{item.name}}</span></p>
                        <p><span>联系电话：{{item.phone}}</span></p>
                        <p><span>身份证：{{item.paperNumber}}</span></p>
                        <p><span>迁出时间：{{item.quitTime}}</span></p>
                        <p><span>操作账号：{{item.handleUser}}</span></p>
                    </div>
                    <div class="rightTop">凤凰城</div>
                </div>
            </div>
            <el-pagination
                class="pagination"
                @current-change="handleCurrentChange3"
                :current-page="pageData3.page"
                :page-size="pageData3.limit"
                layout="prev, pager, next,total, jumper"
                :total="pageData3.total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name:'suspectedOutPerson',
        data(){
            return{
                xqInfos:JSON.parse(sessionStorage.getItem("xqInfos")),
                formInline: {
                   xqCode:"",
                   daySmall:"",
                   likeStr:"",
                },
                tabNo:1,
                listData:[],
                pageData1:{
                    page:1,
                    limit:9,
                    total:0
                },
                pageData2:{
                    page:1,
                    limit:9,
                    total:0
                },
                pageData3:{
                    page:1,
                    limit:9,
                    total:0
                }
            }
        },
        created () {
          this.gainSuspectedOutPerson()  
        },
        methods:{
            overlook(ownerId,xqCode){
                this.$axios({
                    method:'post',
                    url:"sjwl/webapi/person/quit/ignore",
                    data:{
                        "ownerId":ownerId,
                        "xqCode":xqCode
                    }
                }).then(res=>{
                    if(res.code==="1000"){
                        this.$store.state.common.successMsg.unshift(res.msg)
                        this.gainSuspectedOutPerson()
                    }
                })
            },
            personOut(ownerId,xqCode){
                this.$axios({
                    method:'post',
                    url:"sjwl/webapi/person/quit/delete",
                    data:{
                        "ownerId":ownerId,
                        "xqCode":xqCode
                    }
                }).then(res=>{
                    if(res.code==="1000"){
                        this.$store.state.common.successMsg.unshift(res.msg)
                        this.gainSuspectedOutPerson()
                    }
                })
            },
            reset(){
                this.formInline={
                   xqCode:"",
                   daySmall:"",
                   likeStr:""
                }
            },
            gainSuspectedOutPerson(){
                this.$axios({
                    method:"get",
                    url:"sjwl/webapi/person/quit/list",
                    params:{
                        ...this.formInline,
                        page:this.pageData1.page,
                        limit:this.pageData1.limit
                    }
                }).then(res=>{
                    if(res.code==="1000"){
                        this.listData = res.data.list
                        this.pageData1.page = res.data.currentPage
                        this.pageData1.total = res.data.totalRows
                        //console.log(res)
                    }
                })
            },
            gainHandleList(){
                this.$axios({
                    method:"get",
                    url:"sjwl/webapi/person/quit/handle/list",
                    params:{
                        ...this.formInline,
                        page:this.pageData2.page,
                        limit:this.pageData2.limit
                    }
                }).then(res=>{
                    if(res.code==="1000"){
                        this.listData = res.data.list
                        this.pageData2.page = res.data.currentPage
                        this.pageData2.total = res.data.totalRows
                        //console.log(res)
                    }
                })
            },
            gainOutPersonList(){
                this.$axios({
                    method:"get",
                    url:"sjwl/webapi/person/quit/delete/list",
                    params:{
                        ...this.formInline,
                        page:this.pageData3.page,
                        limit:this.pageData3.limit
                    }
                }).then(res=>{
                    if(res.code==="1000"){
                        this.listData = res.data.list
                        this.pageData3.page = res.data.currentPage
                        this.pageData3.total = res.data.totalRows
                        //console.log(res)
                    }
                })
            },
            tabClick(num){
                this.tabNo = num;
            },
            //分页
            handleCurrentChange1(val) {
                //console.log(val)
                this.pageData1.page = val
                this.gainSuspectedOutPerson()
            },
            handleCurrentChange2(val) {
                this.pageData2.page = val
                this.gainHandleList()
            },
            handleCurrentChange3(val) {
                this.pageData3.page = val
                this.gainOutPersonList()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .suspectedOutPerson{
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
    .tabList{
        width: 300px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 0 0 20px;
    }
    .tabList>div{
        color: rgba(168, 198, 248, 1);
        font-size: 16px;
        cursor: pointer;
    }
    .tabClick{
        color: white!important;
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
    .suspectedOutPerson .el-form-item__label{
        color: white;
    }
    .suspectedOutPerson .el-input--small .el-input__inner{
        background-color: #1E62D5;
        border:0;
        color: white;
    }
    .suspectedOutPerson .el-button{
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