<template>
    <div>
         <el-card class="box-card">
            <el-row :gutter="24">
                <el-col :span="14" >
                    <div class="filter-container">
                        <el-input v-model="listQuery.searchName" clearable class="filter-item" style="width: 300px;" placeholder="订单编号/商品名称/订单用户/店铺搜索"/>
                    </div>
                </el-col>
                <el-col :span="10"> 
                    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
                    <!-- <el-button class="filter-item" type="success" icon="el-icon-download">导出</el-button> -->
                    <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="handleRemove" :disabled='multipleSelection.length == 0'>删除</el-button>
                </el-col>
            </el-row>  
            <el-row :gutter="24">          
                <el-col :span="10" >
                    <div class="select">
                        <el-select v-model="Statuvalue" placeholder="请选择订单状态" @change='GetStatuOrder'>
                            <el-option v-for="item in Statuoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="10" :offset="4">
                   <div class="block">
                    <el-date-picker  v-model="value7" type="daterange" align="right" @change="handleChange" value-format='timestamp'
                     unlink-panels  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
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
                     <img :src="scope.row.goodThumbnail" width="40">
                </template>
            </el-table-column>
            <el-table-column align="center" label="商品名称" prop="goodName"/>
            <el-table-column align="center" label="店铺名称" prop="shopName"/>
            <el-table-column align="center" label="商品价格" prop="goodsAmount"/>
            <el-table-column align="center" label="支付金额" prop="needPayMoney"/>
            <el-table-column align="center" label="获得积分" prop="gainedpoint"/>
            <el-table-column align="center" label="分享师优惠金额" prop="recommend"/>
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
            <el-table-column align="center" label="订单用户" prop="buyName"/>

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
import API from '@/api/order'

export default {
   name: 'GoodsList',
   components: {Pagination},
  data() {
    return {
        listLoading:false,
        dialogFormVisible:false,
        List:[],
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
        total: 10,
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
      this.getOrderList(this.listQuery);
  },
  methods: {
   async getOrderList(data){
         let that = this;
         that.listLoading = true;
         data == undefined ? data = this.listQuery : data = data
         API.GetOrderList(data).then(res => {
            if(res != undefined){
                console.log("你好查看所有的数据")
                that.List = res.rows;
                that.total = res.total;
            }
            that.listLoading = false;
         }).catch(err => {
            that.$message.error('抱歉，删除失败')
         })
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
             let res = await API.DeleteOrderList(data).catch(err => {
                 that.$message.error('抱歉，删除失败')
             })
             if(res.code == 0){
                 that.getOrderList(this.listQuery);
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


    async handleFilter(){
        let that = this;  
        that.getOrderList(this.listQuery)
    },
    
    //根据订单状态选
    async GetStatuOrder(){
        let that = this;    
        that.listQuery.page = 1;
        that.listQuery.limit = 10;
        let data = Object.assign({},that.listQuery,{status:that.Statuvalue})
        that.getOrderList(data)
    },

    //时间选择
    handleChange(val){
        let that = this;
        let data = Object.assign({},that.listQuery,{beginTime:val[0],endTime:val[1]})
        that.getOrderList(data)
        // console.log("asjdlasjd",val)
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
            let res = await API.batchRemoveOrderList(data).catch(err => {
                this.$message.error("抱歉,删除失败")
            })
            if(res.code == 0){
                this.getOrderList(this.listQuery);
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