<template>
    <div>
         <el-card class="box-card">
            <el-row :gutter="24">
                <el-col :span="14" >
                    <div class="filter-container">
                        <el-input v-model="searchName" clearable class="filter-item" style="width: 300px;" placeholder="订单编号/商品名称/订单用户/店铺搜索"/>
                    </div>
                </el-col>
                <el-col :span="10"> 
                    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
                    <el-button class="filter-item" type="success" icon="el-icon-download" @click="handleRemove">导出</el-button>
                    <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="handleRemove" :disabled='multipleSelection.length == 0'>删除</el-button>
                </el-col>
            </el-row>  
            <el-row :gutter="24">          
                <el-col :span="5" >
                    <div class="select">
                        <el-select v-model="Statuvalue" placeholder="请选择店铺名称" @change='GetStatuOrder'>
                            <el-option v-for="item in Statuoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="5" >
                    <div class="select">
                        <el-select v-model="Statuvalue" placeholder="请选择订单状态" @change='GetStatuOrder'>
                            <el-option v-for="item in Statuoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="10" :offset="4">
                   <div class="block">
                    <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                    </div>
                </el-col>
            </el-row>      
         </el-card>
        <el-card class="box-card">
        <el-table v-loading="listLoading" :data="List" @selection-change="handleSelectionChange" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" label="订单Id" prop="orderId"/>
            <el-table-column align="center" label="订单编号" prop="sn"/>
            <el-table-column align="center" property="thumbnail" label="图片">
                <template slot-scope="scope">
                     <img :src="scope.row.thumbnail" width="40">
                </template>
            </el-table-column>
            <el-table-column align="center" label="商品名称" prop="goodName"/>
            <el-table-column align="center" label="店铺名称" prop="whetherLvName"/>
            <el-table-column align="center" label="商品价格" prop="goodsAmount"/>
            <el-table-column align="center" label="支付金额" prop="needPayMoney"/>
            <el-table-column align="center" label="获得积分" prop="gainedpoint"/>
            <el-table-column align="center" label="推荐师优惠金额" prop="recommend"/>
            <el-table-column align="center" label="余额支付金额" prop="balance"/>
            <el-table-column align="center" label="订单状态" prop="status">
                <template slot-scope="scope">
                   <el-tag type="success" v-if="scope.row.status == 0">待支付</el-tag>
                   <el-tag type="success" v-if="scope.row.status == 1">待核销</el-tag>
                   <el-tag type="success" v-if="scope.row.status == 2">已核销</el-tag>
                   <el-tag type="success" v-if="scope.row.status == 3">已取消</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" prop="createTime"/>
            <el-table-column align="center" label="订单用户" prop="memberName"/>

            <el-table-column align="center" label="操作" width="180" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                <el-button type="primary" size="mini" v-if="scope.row.status==1">立即核销</el-button>
                <el-button type="primary" size="mini" v-if="scope.row.status==2">已核销</el-button>
                <el-button type="danger" size="mini" @click="deleteList(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-card>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getOrderList" />
    </div>
</template>



<script>
// import Lib from '@/utils/lib'
import Pagination from '@/components/Pagination' 

export default {
   name: 'GoodsList',
   components: {Pagination},
  data() {
    return {
        listLoading:false,
        dialogFormVisible:false,
        List:[{adminRemark:null,appointmentStatus:null,balance:0,beginTime:null,buyMobile:null,buyName:null,buyRemark:null,cancelReason:null,catName:null,codeUnionid:"oN-X01AvNfA27s9T9zPxAn9kYDFM",completeTime:null,consumepoint:0,createTime:1553931275293,disabled:null,discount:0.98,endTime:null,gainedpoint:0,goodBookId:null,goodName:"【榕门路】39.9元抢购十二年珠宝老店淡水珍珠胸针",goodsAmount:39.9,goodsId:863018781351936,goodsNum:1,imported:null,index:null,memberId:null,memberLvName:null,memberName:"圆圆*康辉旅游",needPayMoney:30.1,orderAmount:30.1,orderCode:"https://nadou.guqinet.com/pic/121e9735-1058-4fed-b900-c88a6bb47cd5.png",orderId:970,orderType:1,p8:null,p9:null,p10:null,payStatus:null,paymentId:2,paymentName:null,paymentType:1,paymoney:30.1,price:null,recommend:9,remark:null,sendStatus:null,shopId:null,shopsId:null,sn:"1563401595",status:1,thumbnail:"https://image.etuetf.com/advImage/03dfa79f-02ef-4633-baf1-8e9699ee0ef3.jpg"
,unionId:"oN-X01AvNfA27s9T9zPxAn9kYDFM",whetherLvName:"懿如意珠宝"},{adminRemark:null,appointmentStatus:null,balance:0,beginTime:null,buyMobile:null,buyName:null,buyRemark:null,cancelReason:null,catName:null,codeUnionid:"oN-X01AvNfA27s9T9zPxAn9kYDFM",completeTime:null,consumepoint:0,createTime:1553931275293,disabled:null,discount:0.98,endTime:null,gainedpoint:0,goodBookId:null,goodName:"【榕门路】39.9元抢购十二年珠宝老店淡水珍珠胸针",goodsAmount:39.9,goodsId:863018781351936,goodsNum:1,imported:null,index:null,memberId:null,memberLvName:null,memberName:"圆圆*康辉旅游",needPayMoney:30.1,orderAmount:30.1,orderCode:"https://nadou.guqinet.com/pic/121e9735-1058-4fed-b900-c88a6bb47cd5.png",orderId:970,orderType:1,p8:null,p9:null,p10:null,payStatus:null,paymentId:2,paymentName:null,paymentType:1,paymoney:30.1,price:null,recommend:9,remark:null,sendStatus:null,shopId:null,shopsId:null,sn:"1563401595",status:2,thumbnail:"https://image.etuetf.com/advImage/03dfa79f-02ef-4633-baf1-8e9699ee0ef3.jpg"
,unionId:"oN-X01AvNfA27s9T9zPxAn9kYDFM",whetherLvName:"懿如意珠宝"},{adminRemark:null,appointmentStatus:null,balance:0,beginTime:null,buyMobile:null,buyName:null,buyRemark:null,cancelReason:null,catName:null,codeUnionid:"oN-X01AvNfA27s9T9zPxAn9kYDFM",completeTime:null,consumepoint:0,createTime:1553931275293,disabled:null,discount:0.98,endTime:null,gainedpoint:0,goodBookId:null,goodName:"【榕门路】39.9元抢购十二年珠宝老店淡水珍珠胸针",goodsAmount:39.9,goodsId:863018781351936,goodsNum:1,imported:null,index:null,memberId:null,memberLvName:null,memberName:"圆圆*康辉旅游",needPayMoney:30.1,orderAmount:30.1,orderCode:"https://nadou.guqinet.com/pic/121e9735-1058-4fed-b900-c88a6bb47cd5.png",orderId:970,orderType:1,p8:null,p9:null,p10:null,payStatus:null,paymentId:2,paymentName:null,paymentType:1,paymoney:30.1,price:null,recommend:9,remark:null,sendStatus:null,shopId:null,shopsId:null,sn:"1563401595",status:3,thumbnail:"https://image.etuetf.com/advImage/03dfa79f-02ef-4633-baf1-8e9699ee0ef3.jpg"
,unionId:"oN-X01AvNfA27s9T9zPxAn9kYDFM",whetherLvName:"懿如意珠宝"},{adminRemark:null,appointmentStatus:null,balance:0,beginTime:null,buyMobile:null,buyName:null,buyRemark:null,cancelReason:null,catName:null,codeUnionid:"oN-X01AvNfA27s9T9zPxAn9kYDFM",completeTime:null,consumepoint:0,createTime:1553931275293,disabled:null,discount:0.98,endTime:null,gainedpoint:0,goodBookId:null,goodName:"【榕门路】39.9元抢购十二年珠宝老店淡水珍珠胸针",goodsAmount:39.9,goodsId:863018781351936,goodsNum:1,imported:null,index:null,memberId:null,memberLvName:null,memberName:"圆圆*康辉旅游",needPayMoney:30.1,orderAmount:30.1,orderCode:"https://nadou.guqinet.com/pic/121e9735-1058-4fed-b900-c88a6bb47cd5.png",orderId:970,orderType:1,p8:null,p9:null,p10:null,payStatus:null,paymentId:2,paymentName:null,paymentType:1,paymoney:30.1,price:null,recommend:9,remark:null,sendStatus:null,shopId:null,shopsId:null,sn:"1563401595",status:0,thumbnail:"https://image.etuetf.com/advImage/03dfa79f-02ef-4633-baf1-8e9699ee0ef3.jpg"
,unionId:"oN-X01AvNfA27s9T9zPxAn9kYDFM",whetherLvName:"懿如意珠宝"}],
        Statuoptions:[{
          value: 0,
          label: '待支付'
        },{
          value: 1,
          label: '待核销'
        }, {
          value: 2,
          label: '已核销'
        },{
          value: 3,
          label: '已取消'
        }],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
         value6: '',
        value7: '',
        Statuvalue:'',
        searchName:'',
        total: 5,
        listQuery: {
            page: 1,
            limit: 10,
        },
       radioStatusList:[{name:'代付款',id:0},{name:'待核销',id:1},{name:'已核销',id:2},{name:'已取消',id:3}],
       form:{status:0},
       multipleSelection:[],
       formLabelWidth: '120px',
       
    }
  },
  created() {
      // this.getOrderList();
  },
  methods: {
   async getOrderList(){
       //   let that = this;
       //   that.listLoading = true;
       //   let res = await API_ord.get_OrderList(that.listQuery).catch(err => {
       //       this.$message.error('抱歉，订单列表未请求到')
       //   })
       //   if(res != undefined){
       //      that.List = res.rows.map(v => {
       //          v.createTime = Lib.dade_Time(v.createTime)
       //          return v;
       //      });
       //      that.total = res.total;
       //   }else{
       //      that.listLoading = false;
       //   }
       // that.listLoading = false;
    },

    async deleteList(index,row){
         let that = this;
        //  let res = await 
        let conRes = await that.$confirm('是否确定删除？','提示',{
             confirmButtonText:'确定',
             cancelButtonText:' 取消',
             type:'warning'
         }).catch(() => {
             that.$message({
                 type: 'info',
                 message: '已取消删除'
             });
         });
         if(conRes == 'confirm'){
             that.listLoading = true;
             let data = {orderId:row.orderId}
             let res = await API_ord.remove_Order(data).catch(err => {
                 that.$message.error('抱歉，删除失败')
             })
             if(res.code == 0){
                 that.getOrderList();
                 that.$message({
                     message:'删除成功',
                     type:'success'
                 })
             }else{
                 that.$message.error('抱歉，删除失败')
             }
            that.listLoading = false;
         }
    },

    //点击编辑修改了订单状态
    async editList(index,row){
         let that = this;
         that.form.status = row.status
         that.form.orderId =  row.orderId
         that.dialogFormVisible = true;

    },
    async editSubmit(){
        let that = this;
        that.dialogFormVisible = false
        that.listLoading = true;
        // let data = Object.assign({},that.form,{orderId:row.orderId})
        let res = await API_ord.update_Order(that.form).catch(err => {
             this.$message.error("抱歉，修改失败")
        })
        if(res.code == 0){
            that.getOrderList();
            that.$message({
                message:'修改成功',
                type:'success'
            })
        }
        that.listLoading = false;
    },

    async handleFilter(){
        let that = this;  
        that.listQuery.page = 1;
        that.listQuery.limit = 10;
        let data = Object.assign({},that.listQuery,{searchName:that.searchName})
        that.GetData(data)
    },
    
    //根据订单状态选
    async GetStatuOrder(){
        let that = this;    
        that.listQuery.page = 1;
        that.listQuery.limit = 10;
        let data = Object.assign({},that.listQuery,{status:that.Statuvalue})
        that.GetData(data)
    },

    async GetData(data){
        let that = this;
        that.listLoading = true;
        let res = await API_ord.get_OrderList(data).catch(err => {
           this.$message.error('抱歉，订单列表未请求到')
        })
        if(res != undefined){
            that.List = res.rows.map(v => {
            v.createTime = Lib.dade_Time(v.createTime)
            return v;
        });
        that.total = res.total;
        }
        that.listLoading = false;
    },

    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //多选删除
    async handleRemove(){
       let that = this;
        //  let res = await 
        let conRes = await that.$confirm('是否确定删除？','提示',{
             confirmButtonText:'确定',
             cancelButtonText:' 取消',
             type:'warning'
         }).catch(() => {
             that.$message({
                 type: 'info',
                 message: '已取消删除'
             });
         });
         if(conRes == 'confirm'){
             that.listLoading = true;
            let idsarr = []
            this.multipleSelection.map(v => {
                idsarr.push(v.orderId);
            })
            let data = {ids:idsarr.join(',')}
            console.log(idsarr.join(','),"你好世界1231323")
            let res = await API_ord.batchRemove_Order(data).catch(err => {
                this.$message.error("抱歉,删除失败")
            })
            if(res.code == 0){
                this.getOrderList();
                that.$message({
                    message:'删除成功',
                    type:'success'
                })
            }else{
                this.$message.error("抱歉,删除失败")       
            }
            that.listLoading = false;
         }
    }



  }
}
</script>
<style>
  .avatar-uploaders {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .conlse .avatar-uploader-icon{
     position: absolute;top: 0;right: 5px; height: 25px;width: 25px;color: #fff;   z-index: 10;
  }

  .avatar-uploaders:hover {
    border-color: #409EFF;
  }
  .avatar-uploaders{
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px!important;
    text-align: center;
  }
  .avatar{
    width: 178px;
    height: 178px;
    display: block;
  }
   .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>