<template>
  <div class="memberUpLog">
    <el-row :gutter="24">
       <el-col :span="24">
          <el-input v-model="listQuery.searchParam" style="width:180px;" placeholder="请输入会员名称搜索"></el-input> <el-button type="success" @click="searchGetMenberData" icon="el-icon-search">搜索</el-button>
       </el-col>
       <el-col :span="24"  v-loading="loading"  element-loading-text="正在查询中。。。" >
         <el-table ref="multipleTable" :data="menberUpLogList" tooltip-effect="dark" style="width: 100%">
         <!-- <el-table-column type="selection" width="55"></el-table-column>
           <el-table-column prop="face" label="头像"  align="center">
            <template slot-scope="scope">
                 <img :src="scope.row.face" :alt="scope.row.name" width="80">
            </template>
          </el-table-column> -->
          <el-table-column prop="memberId" label="会员Id"  align="center"></el-table-column>
          <el-table-column prop="memberName" label="会员名称"  align="center"></el-table-column>
          <el-table-column prop="lvName" label="等级名称"  align="center"></el-table-column>
          <el-table-column prop="oldLv" label="原等级Id"  align="center"></el-table-column>
          <el-table-column prop="oldName" label="原等级名称"  align="center"></el-table-column>
          <el-table-column prop="addTime" label="升级时间"  align="center"></el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetMenberUpLogList" />
       </el-col>
    </el-row>

  </div>
</template>

<script>
import API from '@/api/systemLog'
import Pagination from '@/components/Pagination'
  export default {
    components:{Pagination},
    data () {
      return {
        loading:false,
        menberUpLogList:[],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        multipleSelection:[],
      }
    },
    mounted () {
       this.GetMenberUpLogList();
    },
    methods: {
      //获取所有的等级
      GetMenberUpLogList(){
        let that = this;
        API.memberUpLog(Object.assign({},that.listQuery)).then(res => {
          console.log("成功的打印",res)
          if(res != undefined){
            that.menberUpLogList = res.rows;
            that.total = res.total;
          }else{
            this.$message.error('会员升级日志列表获取失败');
          }
        }).catch(err =>{})
      },
      searchGetMenberData(){
        let that = this;
        that.GetMenberUpLogList();
      }
    }
  }
</script>

<style lang="scss">
  
</style>
