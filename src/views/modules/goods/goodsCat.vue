<template>
  <div class="membershipManagerment">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-col :span="20">
          <el-button type="success"  icon="el-icon-plus" @click="AddGoodsCat">分类新增</el-button>
          <el-button type="success"  icon="el-icon-circle-close" :disabled="multipleSelection.length == 0" @click="DeleteBatch">批量删除</el-button>
        </el-col>
        <el-col :span="4">
          <el-select v-model="selectOptions" clearable placeholder="请选择">
              <el-option v-for="item in tagarr" :key="item.root" :label="item.name" :value="item.root"></el-option>
          </el-select> 
        </el-col>
      </el-col>
      <el-col :span="24" v-loading="loading"  element-loading-text="正在查询中。。。" >
        <el-table ref="multipleTable" :data="GoodsCatList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center"  prop="name" label="分类名称"></el-table-column>
          <el-table-column align="center"  prop="root" label="是否为根级">
            <template slot-scope="scope">
                <el-tag :type="scope.row.root == 1 ? 'success' : 'error' ">{{ scope.row.root == 1 ? '是' : '否' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center"  prop="ParentName" label="父级Id" ></el-table-column>
          <el-table-column align="center"  prop="sort" label="排序" ></el-table-column>
          <el-table-column align="center"  prop="showed" label="是否展示" >
            <template slot-scope="scope">
                <el-tag :type="scope.row.showed == 1 ? 'success' : 'error' ">{{ scope.row.showed == 1 ? '是' : '否' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center"  prop="img" label="图片" >
            <template slot-scope="scope">
               <img :src="scope.row.img" width="80">
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handlEdit(scope.$index,scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetGoodsCatList" />
      </el-col>
    </el-row>

    <DiaLogShow ref="DiaLogShow" :GoodsCatList='GoodsCatList'/>
  </div>
</template>

<script>
import API from '@/api/goods'
import DiaLogShow from './Component/GoodsCatDialog'
import Pagination from '@/components/Pagination'

  export default {
    components: { DiaLogShow,Pagination},
    data () {
      return {
        loading:false,
        GoodsCatList:[],
        AddDialogShow:false,
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        tagarr:[],
        selectOptions:'全部',
        multipleSelection:[],
      }
    },
    mounted () {
       this.GetGoodsCatList();
    },
    methods: {

      //获取所有的等级
      GetGoodsCatList(){
        let that = this;
        API.GetGoodsCat(Object.assign({},that.listQuery)).then(res => {
          if(res != undefined){
             that.GoodsCatList = res.rows.map(Mres => {
               Mres.ParentName = res.rows.find(f => f.catId == Mres.parentId) == undefined ? "第一级" :  res.rows.find(f => f.catId == Mres.parentId).name
               return Mres
             })
             that.total = res.total
             that.TagArr();
          }else{
             that.$message.error('分类请求失败');
          }
        }).catch(err =>{})
      },

      //处理级别
      TagArr(){
        let that = this;
        let arr = [];
        that.GoodsCatList.map(res => {
            that.tagarr.push(res.root);
        })

        this.tagarr = Array.from(new Set(this.tagarr)).map((res,index) => {
          return {name : `第${index+1}级`,root : res}
          // res.name = `第${index}级`
          // res.root = res
        })

      },

      //删除数据
      handleDelete(index,row){
        let that = this;
        that.loading = true;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API.DeleteGoodsCat({catId:row.catId}).then(res => {
              if(res.code == 0){
                  this.$message({ message: '删除成功', type: 'success'});
                  that.GetGoodsCatList();
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
          arr.push(res.catId)
        })
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API.BatchRemoveGoodsCat({ids:arr.join(',')}).then(res => {
              if(res.code == 0){
                that.GetGoodsCatList();
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

      //添加商品分类
      AddGoodsCat(){
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
