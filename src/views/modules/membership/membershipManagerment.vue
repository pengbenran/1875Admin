<template>
  <div class="membershipManagerment">
    <el-row :gutter="24">
       <el-col :span="24">
          <el-input v-model="listQuery.searchParam" style="width:180px;" placeholder="请输入用户名搜索"></el-input> <el-button type="success" @click="searchGetMenberData" icon="el-icon-search">用户搜索</el-button>
       </el-col>
       <el-col :span="24"  v-loading="loading"  element-loading-text="正在查询中。。。" >
         <el-table ref="multipleTable" :data="menberList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="face" label="头像"  align="center">
            <template slot-scope="scope">
                 <img :src="scope.row.face" :alt="scope.row.name" width="80">
            </template>
          </el-table-column>
          <el-table-column prop="memberId" label="会员Id"  align="center"></el-table-column>
          <el-table-column prop="name" label="会员名称"  align="center"></el-table-column>
          <el-table-column prop="sex" label="性别"  align="center">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status != 0">{{ scope.row.status == 1 ? '女' : '男' }}</el-tag>
                <el-tag v-else type="success">未知</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="crateTime" label="添加时间"  align="center"></el-table-column>
          <el-table-column prop="region" label="地址"  align="center"></el-table-column>
          <el-table-column prop="lvName" label="等级"  align="center"></el-table-column>
          <el-table-column prop="consumePoint" label="消费积分"  align="center"></el-table-column>
          <el-table-column prop="point" label="剩余积分"  align="center"></el-table-column>
          <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleInfo(scope.$index,scope.row)">详情</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetMenberList" />
       </el-col>
    </el-row>

  </div>
</template>

<script>
import API from '@/api/member'
import Pagination from '@/components/Pagination'
  export default {
    components:{Pagination},
    data () {
      return {
        loading:false,
        menberList:[],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        multipleSelection:[],
      }
    },
    mounted () {
       this.GetMenberList();
    },
    methods: {
      //获取所有的等级
      GetMenberList(){
        let that = this;
        API.getMenberList(Object.assign({},that.listQuery)).then(res => {
          console.log("成功的打印",res)
          if(res != undefined){
            that.menberList = res.rows;
            that.total = res.total;
          }else{
            this.$message.error('会员列表获取失败');
          }
        }).catch(err =>{})
      },

      //删除
      handleDelete(index,row){
        let that = this;
        that.loading = true;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API.deleteMenber({memberId:row.memberId}).then(res => {
              if(res.code == 0){
                  this.$message({ message: '删除成功', type: 'success'});
                  that.GetMenberList();
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

      searchGetMenberData(){
        let that = this;
        that.GetMenberList();
      },

      //多选
      handleSelectionChange(){
        let that = this;
        this.multipleSelection = val;
      },

      //查看详情
      handleInfo(){
        let that = this;
      },
     
    }
  }
</script>

<style lang="scss">
  
</style>
