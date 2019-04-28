<template>
  <div class="membershipManagerment">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-button type="success"  icon="el-icon-plus" @click="AddMenberLv">等级新增</el-button>
        <el-button type="success"  icon="el-icon-circle-close" :disabled="multipleSelection.length == 0" @click="DeleteBatch">批量删除</el-button>
      </el-col>
      <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
        <el-table ref="multipleTable" :data="menberLvList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column  align="center"  type="selection" width="55"></el-table-column>
          <el-table-column  align="center"  prop="name" label="等级名称" width="120"></el-table-column>
          <el-table-column  align="center"  prop="defaultLv" label="是否为默认等级" width="120">
            <template slot-scope="scope">
                <el-tag :type="scope.row.defaultLv == 1 ? 'success' : 'error' ">{{ scope.row.defaultLv == 1 ? '是' : '否' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column  align="center"  prop="discount" label="折扣大小" ></el-table-column>
          <el-table-column  align="center"  prop="rank" label="等级大小" ></el-table-column>
          <el-table-column  align="center"  prop="type" label="升级方式" >
            <template slot-scope="scope">
                <el-tag :type="scope.row.type == 1 ? 'success' : 'error' ">{{ scope.row.type == 1 ? '消费金额' : '购物数量' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column  align="center"  prop="upgradePoint" label="达到等级所需积分" ></el-table-column>
          <el-table-column  align="center"  prop="givePoint" label="达到等级赠送积分" ></el-table-column>
          <el-table-column  align="center"  prop="givePoint" label="图片">
             <template slot-scope="scope">
                <img :src="scope.row.memberImage" width="60"/>
             </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handlEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetMenberLvList" />
      </el-col>
    </el-row>

    <DiaLogShow ref="DiaLogShow"/>
  </div>
</template>

<script>
import API from '@/api/member'
import DiaLogShow from './Component/MenberLvDialog'
import Pagination from '@/components/Pagination'

  export default {
    components: { DiaLogShow,Pagination},
    data () {
      return {
        loading:false,
        menberLvList:[],
        AddDialogShow:false,
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        multipleSelection:[],
      }
    },
    mounted () {
       this.GetMenberLvList();
    },
    methods: {

      //获取所有的等级
      GetMenberLvList(){
        let that = this;
        API.getMenberLvList(Object.assign({},that.listQuery)).then(res => {
          if(res != undefined){
             that.menberLvList = res.rows
             that.total = res.total
          }else{
           
          }
        }).catch(err =>{})
      },

      //删除数据
      handleDelete(index,row){
        let that = this;
        that.loading = true;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API.deleteMenberLv({lvId:row.lvId}).then(res => {
              if(res.code == 0){
                  this.$message({ message: '删除成功', type: 'success'});
                  that.GetMenberLvList();
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
          arr.push(res.lvId)
        })
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API.batchDeleteMenberLv({ids:arr.join(',')}).then(res => {
              if(res.code == 0){
                that.GetMenberLvList();
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
