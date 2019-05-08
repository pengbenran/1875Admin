<template>
  <div class="membershipManagerment">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-button type="success"  icon="el-icon-plus" @click="AddMenberLv">等级新增</el-button>
        <el-button type="success"  icon="el-icon-circle-close" :disabled="multipleSelection.length == 0" @click="DeleteBatch">批量删除</el-button>
      </el-col>
      <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
        <el-table ref="multipleTable" :data="distributorLvList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="distributorLvId"  label="分享师等级Id"></el-table-column>
          <el-table-column align="center" prop="name"  label="等级名称"></el-table-column>
          <el-table-column align="center" prop="defaultStatus" label="是否为默认等级">
            <template slot-scope="scope">
                <el-tag :type="scope.row.defaultStatus == 1 ? 'success' : 'error' ">{{ scope.row.defaultStatus == 1 ? '是' : '否' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="inviteNumber" label="升级所需人数" ></el-table-column>
          <el-table-column align="center" prop="description" label="分享师权益" ></el-table-column>
          <el-table-column align="center" prop="distributorImage" label="图片" >
             <template slot-scope="scope">
                <img :src="scope.row.distributorImage" />
             </template>
          </el-table-column>
          <el-table-column  align="center" label="操作" width="200" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handlEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetDistributorLvList" />
      </el-col>
    </el-row>

    <DiaLogShow ref="DiaLogShow"/>
  </div>
</template>

<script>
import API from '@/api/member'
import DiaLogShow from './Component/DistributorLvDialog'
import Pagination from '@/components/Pagination'

  export default {
    components: { DiaLogShow,Pagination},
    data () {
      return {
        loading:false,
        distributorLvList:[],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        multipleSelection:[],
      }
    },
    mounted () {
       this.GetDistributorLvList();
    },
    methods: {

      //获取所有的等级
      GetDistributorLvList(){
        let that = this;
        API.getdistributorLvList(Object.assign({},that.listQuery)).then(res => {
          if(res != undefined){
             console.log("获取一下推荐师等级列表",res)
             that.distributorLvList = res.rows
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
            API.deleteDistributor({distributorLvId:row.distributorLvId}).then(res => {
              if(res.code == 0){
                  this.$message({ message: '删除成功', type: 'success'});
                  that.GetDistributorLvList();
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
          arr.push(res.distributorLvId)
        })
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          API.batchDeleteDistributor({ids:arr.join(',')}).then(res => {
            if(res.code == 0){
              that.GetDistributorLvList();
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
        this.$refs.DiaLogShow.EditDiaLogShow(true,row)
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
