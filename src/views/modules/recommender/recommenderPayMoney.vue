<template>
  <div class="membershipManagerment">
    <el-row :gutter="24">
      <el-col :span="24">
          <el-col :span="22">
               <el-input v-model="listQuery.searchParam" style="width:220px" placeholder="请输入内容"></el-input>
               <el-button type="success"  icon="el-icon-search" @click="searchGetData">批量删除</el-button>
          </el-col>
          <el-col :span="2">
              <el-button type="success"  icon="el-icon-circle-close" :disabled="multipleSelection.length == 0" @click="DeleteBatch">批量删除</el-button>
          </el-col>
      </el-col>
      <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
        <el-table ref="multipleTable" :data="WithdrawApplyList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="distributorLvId"  label="分享师等级Id"></el-table-column>
          <el-table-column align="center" prop="name"  label="分享师名称"></el-table-column>
          <el-table-column align="center" prop="status" label="提现状态">
            <template slot-scope="scope">
                <el-tag :type="success" v-if="scope.row.status == 1">未审核</el-tag>
                <el-tag :type="success" v-if="scope.row.status == 2">已通过</el-tag>
                <el-tag :type="success" v-if="scope.row.status == 3">未通过</el-tag>
                <el-tag :type="success" v-if="scope.row.status == 4">已取消</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="mobile" label="手机号码" ></el-table-column>
          <el-table-column align="center" prop="username" label="审核人" ></el-table-column>
          <el-table-column align="center" prop="amount" label="提现金额" ></el-table-column>
          <el-table-column align="center" prop="applyTime" label="申请时间" ></el-table-column>
          <el-table-column align="center" prop="auditTime" label="审核时间" ></el-table-column>
          <el-table-column  align="center" label="操作" width="200" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetWithdrawApplyList" />
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
        WithdrawApplyList:[],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        multipleSelection:[],
      }
    },
    mounted () {
       this.GetWithdrawApplyList();
    },
    methods: {

      //获取所有的等级
      GetWithdrawApplyList(){
        let that = this;
        API.getWithdrawApplyList(Object.assign({},that.listQuery)).then(res => {
          if(res != undefined){
             that.WithdrawApplyList = res.rows
             that.total = res.total
          }else{
             this.$message.error('抱歉推荐师提现未获取到');
          }
        }).catch(err =>{})
      },

      //删除数据
      handleDelete(index,row){
        let that = this;
        that.loading = true;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API.deleteWithdrawApplyList({withdrawId:row.withdrawId}).then(res => {
              if(res.code == 0){
                  this.$message({ message: '删除成功', type: 'success'});
                  that.GetWithdrawApplyList();
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
          arr.push(res.withdrawId)
        })
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          API.batchDeleteWithdrawApplyList({ids:arr.join(',')}).then(res => {
            if(res.code == 0){
              that.GetWithdrawApplyList();
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

      //获取选择哪条
      handleSelectionChange(val){
        let that = this;
        this.multipleSelection = val;
      },

      //搜索
      searchGetData(){
        this.GetWithdrawApplyList();
      },
     
    }
  }
</script>

<style lang="scss">
  
</style>
