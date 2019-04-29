<template>
  <div class="orderStatistics">
      <el-card class="box-card">
        <el-row :gutter="24">
            <el-col :span="14" >
                <div class="filter-container">
                    <el-input v-model="listQuery.searchParam" clearable class="filter-item" style="width: 300px;" placeholder="商品名称/分类名称/店铺搜索"/>
                </div>
            </el-col>
            <el-col :span="10"> 
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
                <!-- <el-button class="filter-item" type="success" icon="el-icon-download">导出</el-button> -->
                <!-- <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="handleRemove" :disabled='multipleSelection.length == 0'>批量审核</el-button> -->
            </el-col>
        </el-row>      
      </el-card>

      <el-card class="box-card">
        <el-table v-loading="listLoading" :data="List" @selection-change="handleSelectionChange" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" label="Id" prop="pennyId"/>
          <el-table-column align="center" label="商品Id" prop="goodId"/>
          <el-table-column align="center" label="商品名称" prop="goodName"/>
          <el-table-column align="center" label="图片" prop="status">
              <template slot-scope="scope">
                <img :src="scope.row.thumbnail" width="55"/>
              </template>
          </el-table-column>
          <el-table-column align="center" label="库存" prop="inventory"/>
          <el-table-column align="center" label="店铺名称" prop="shopName"/>
          <el-table-column align="center" label="已售" prop="sales"/>
          <el-table-column align="center" label="添加时间" prop="createTime"/>
          <el-table-column align="center" label="参与人数" prop="finishNumber"/>
          <el-table-column align="center" label="参与金额" prop="joinAmount"/>
          <el-table-column align="center" label="时间间隔" prop="timeInterval">
              <template slot-scope="scope">
                  <el-tag type="success">{{scope.row.timeInterval}}天</el-tag>
              </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="ShowEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteList(scope.$index,scope.row)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-card>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetDataList" />
        <ShowDialog ref='ShowDialog'/>
  </div>
</template>
<script>
import API from '@/api/member'
import API_g from '@/api/goods'
import Pagination from '@/components/Pagination' 
import ShowDialog from '../Component/MoneyDialog'
  export default {
    components:{Pagination,ShowDialog},
    data () {
      return {
        List:[],
        listLoading:false,
        listQuery: {
          page: 1,
          limit: 10,
        },
        total:8,
        multipleSelection:[],
      }
    },
    mounted () {
      this.GetDataList();
    },
    methods: { 
      GetDataList(){
        let that = this;
        that.listLoading = true;
        API_g.YiMoneyShopList(this.listQuery).then(res => {
          console.log("查看所有的数据",res)
          if(res != undefined){
            that.List = res.rows;
            that.total = res.total;
          }else{
            that.$message.error('抱歉，删除失败')            
          }
          that.listLoading = false;
        }).catch(err => {
            that.$message.error('抱歉，删除失败')   
        })
      },

      //删除
      async deleteList(index,row){
        let that = this;
        let data;
        let conRes = await that.$confirm('是否确认删除？','提示',{
             confirmButtonText:'确认',
             cancelButtonText:'取消',
             type:'warning'
         }).catch(() => {
             that.$message({
                 type: 'info',
                 message: '已取消删除'
             });
         });
         if(conRes == 'confirm'){
            data = {pennyId:row.pennyId}
            that.Que(data)
         }
      },

      async Que(data){
         let that = this;
         that.listLoading = true;
         let res = await API_g.DeleteYiMoneyShopList(data).catch(err => {
                 that.$message.error('抱歉，删除失败')
             })
             if(res.code == 0){
                 that.GetDataList();
                 that.$message({
                     message:'删除成功',
                     type:'success'
                 })
             }else{
                 that.$message.error('抱歉，删除失败')
             }
          that.listLoading = false;
      },



      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //查找
      handleFilter(){
         this.GetDataList();
      },

  

      //点击编辑
      ShowEdit(index,row){
          this.$refs.ShowDialog.EditDiaLogShow(true,row)
      }
    }
  }
</script>

<style lang="scss">
  
</style>
