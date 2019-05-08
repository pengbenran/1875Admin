<template>
  <div class="membershipManagerment">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-button type="success"  icon="el-icon-plus" @click="AddMenberLv">字典数据新增</el-button>
        <el-button type="success"  icon="el-icon-circle-close" :disabled="multipleSelection.length == 0" @click="DeleteBatch">批量删除</el-button>
      </el-col>
      <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
        <el-table ref="multipleTable" :data="DictionaryLists" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="name"  label="标签名"></el-table-column>
          <el-table-column align="center" prop="value"  label="数据值"></el-table-column>
          <el-table-column align="center" prop="type" label="类型">
            <template slot-scope="scope">
                <el-tag type="success">{{ scope.row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sort" label="排序" ></el-table-column>
          <el-table-column  align="center" label="操作" width="250" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handlEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                <el-dropdown trigger="click" @command="ClickCommand($event,scope.row)">
                  <span class="el-dropdown-link">
                    <el-button type="success" size="mini"  icon="el-icon-plus"></el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-plus" command='1'>添加</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-plus" command='2'>查看</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
             </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="DictionaryListData" />
      </el-col>
    </el-row>

    <DiaLogShow ref="DiaLogShow"/>
  </div>
</template>

<script>
import API from '@/api/sys'
import DiaLogShow from './Component/DictionaryDialog'
import Pagination from '@/components/Pagination'

  export default {
    components: { DiaLogShow,Pagination},
    data () {
      return {
        loading:false,
        DictionaryLists:[],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        multipleSelection:[],
      }
    },
    mounted () {
       this.DictionaryListData();
    },
    methods: {
      //获取所有的等级
      DictionaryListData(){
        let that = this;
        API.DictionaryList(Object.assign({},that.listQuery)).then(res => {
          if(res != undefined){
             console.log("获取一下推荐师等级列表",res)
             that.DictionaryLists = res.rows
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
            API.DeleteDictionary({id:row.id}).then(res => {
              if(res.code == 0){
                  this.$message({ message: '删除成功', type: 'success'});
                  that.DictionaryListData();
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
          arr.push(res.id)
        })
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          API.BatchRemoveDictionary({ids:arr.join(',')}).then(res => {
            if(res.code == 0){
              that.DictionaryListData();
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

      //添加子级
      ClickCommand(e,row){
         if(e == 1){
           this.$refs.DiaLogShow.DiaLogShow(true,row)
         }else{
            this.$refs.DiaLogShow.GetDataList(true,row);
         }
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
