<template>
  <div class="membershipManagerment">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-button type="success"  icon="el-icon-plus" @click="AddMenberLv">店铺新增</el-button>
        <el-button type="success"  icon="el-icon-circle-close" :disabled="multipleSelection.length == 0" @click="DeleteBatch">批量删除</el-button>
      </el-col>
      <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
        <el-table ref="multipleTable" :data="shopList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="shopName"  label="店铺名称"></el-table-column>
          <!-- <el-table-column align="center" prop="shopImg"  label="店铺图片">
             <template slot-scope="scope">
                <img :src="scope.row.shopImg" width="60"/>
             </template>
          </el-table-column> -->
          <el-table-column align="center" prop="bossName" label="老板名称"></el-table-column>
          <el-table-column align="center" prop="bossPhone" label="老板电话"></el-table-column>
          <el-table-column  align="center" label="操作" width="220" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handlShop(scope.$index,scope.row)" icon="el-icon-plus"></el-button>
                <el-button type="primary" size="mini" @click="handlEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetShopListData" />
      </el-col>
    </el-row>

    <DiaLogShow ref="DiaLogShow"/>
  </div>
</template>

<script>
import API from '@/api/goods'
import DiaLogShow from './Component/ShopListDialog'
import Pagination from '@/components/Pagination'

  export default {
    components: { DiaLogShow,Pagination},
    data () {
      return {
        loading:false,
        shopList:[],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        multipleSelection:[],
      }
    },
    mounted () {
       this.GetShopListData();
    },
    methods: {

      //获取所有的等级
      GetShopListData(){
        let that = this;
        API.GetShopList(Object.assign({},that.listQuery)).then(res => {
          if(res != undefined){
             console.log("获取一下推荐师等级列表",res)
             that.shopList = res.rows
             that.total = res.total
          }else{
             this.$message.error('抱歉推荐师等级未获取到');
          }
        }).catch(err =>{})
      },

      //删除数据
      handleDelete(index,row){
        let that = this;
        that.loading = true;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API.DeleteShop({shopId:row.shopId}).then(res => {
              if(res.code == 0){
                  this.$message({ message: '删除成功', type: 'success'});
                  that.GetShopListData();
              }else{
                  this.$message.error('删除失败');
              }
              that.loading = false;
            }).catch(err => {})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });        
          that.loading = false;  
        });
      },

      //批量删除
      DeleteBatch(){
        let that = this;
        let arr = [];
        that.loading = true;
        that.multipleSelection.map(res => {
          arr.push(res.shopId)
        })
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          API.BatchRemoveShop({ids:arr.join(',')}).then(res => {
            if(res.code == 0){
              that.GetShopListData();
              this.$message({ message: '批量删除成功', type: 'success'});
            }else{
              this.$message.error('删除失败');
            }
            that.loading = false;
          }).catch(err => {this.$message.error('删除失败');})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });        
          that.loading = false;  
        });

      },

      //添加等级
      AddMenberLv(){
        let that = this;
        this.$refs.DiaLogShow.DiaLogShow(true)
      },
      
      //编辑数据 index下标、row指定当前条数据
      handlEdit(index,row){
        let that = this;
        console.log("点击编辑参数数据",row)
        this.$refs.DiaLogShow.EditDiaLogShow(true,row)
      },

      //显示绑定会员
      handlShop(index,row){
        this.$refs.DiaLogShow.ShopDiaLogShow(true,row)
      },

      //获取选择哪条
      handleSelectionChange(val){
        let that = this;
        this.multipleSelection = val;
      },
     
    }
  }
</script>

<style lang="scss">
  
</style>
