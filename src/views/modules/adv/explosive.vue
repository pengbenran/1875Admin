<template>
    <div class="banner">
    <el-row class="warp">
    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="kindList" highlight-current-row style="width: 100%;">
        <el-table-column label="编号" prop="id">
        </el-table-column>
        <el-table-column label="排序" prop="sorts">
        </el-table-column>
        <el-table-column  label="分类背景图片"  width="300">
          <template slot-scope="scope">
            <img  :src="scope.row.url" width="200" style="margin-left: 8px">
          </template>
        </el-table-column>
        <el-table-column prop="catName" label="分类名称">
        </el-table-column>
        <el-table-column prop="fontColor" label="分类字体颜色">
        </el-table-column>
        <el-table-column label="操作" :width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removecatBackLevel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <!-- 新增模态框 -->
      <explosiveAddDialog :addFrom='addFrom' ref="explosiveAddDialog" @ImgClick="ImgClick" @catBackGroundList="catBackGroundList"></explosiveAddDialog>
      <!-- 编辑模态框 -->
      <explosiveEditDialog :editFrom='editFrom' ref="explosiveEditDialog" @ImgClick="ImgClick" @catBackGroundList="catBackGroundList"></explosiveEditDialog>
      <!-- 图片裁剪 -->
      <div class="app-main-content" >
        <el-dialog :visible.sync="showCropper" title="封面裁图" width="70%">
          <cropper id="avatarCrop" ref="cropper" @cropper-success="cropperSuccessHandle" :proportion="proportion" :type="type"></cropper>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelCropper">取 消</el-button>
            <el-button type="primary" @click="toCropper" :disabled='btnLoading'><i class="el-icon-loading" v-if="btnLoading" ></i> 确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import cropper from '@/components/Cropper/index'
   import explosiveAddDialog from './components/explosive/explosiveAddDialog'
  import explosiveEditDialog from './components/explosive/explosiveEditDialog'
  import Api_adv from '@/api/adv'
  export default {
    data () {
      return {
        kindList:[],
        editFrom:{},
        addFrom:{
          catName:'',
          type:2,
          url:'',
          fontColor:'',
          sorts:''
        },
        showCropper:false,
        proportion:2.8,
        type:4,
        btnLoading:false,
        formLabelWidth:'120px'
      }
    },
    mounted () {
      let that=this
      that.catBackGroundList()
    },
    components: { cropper,explosiveEditDialog,explosiveAddDialog},
    methods: {
          //编辑
          showEditDialog(index,row){
            let that = this;
            that.editFrom = row;
            that.$refs.explosiveEditDialog.showEditDialog()
          },
          // 新增
          showAddDialog(){
            let that = this;
            that.$refs.explosiveAddDialog.showAddDialog()
          },
           //父组件调用子组件裁剪方法
           toCropper(){
             this.btnLoading = true;
             this.$refs.cropper.submit();
           },
           catBackGroundList(){
            let params={}
            let that=this
            that.addFrom={catName:'',type:2,url:'', fontColor:'',sorts:''},
            params.type=2
            Api_adv.catBackGroundList(params).then(function(res){
              that.kindList=res.rows
            })
           },
          cancelCropper(){
            this.showCropper = false
            this.$refs.cropper.cropDone();
          },
          //子组件裁剪方法成功执行后与父组件通信
          cropperSuccessHandle(data){
             //返回data
             if(data != undefined){
              this.showCropper = false
              this.btnLoading = false;
              this.addFrom.url = data.url
              this.editFrom.url=data.url
              }
         },
          // 删除首页banner
          removecatBackLevel(index,row){
            let that=this
            Api_adv.catBackGroundDel(row).then(function(res){
              if(res.code==0){
                that.$message.success({
                  showClose: true,
                  message: "删除成功",
                  duration: 2000
                }); 
                that.catBackGroundList()
              }
            })
          },
         ImgClick(){
            this.showCropper = true;
         }  
    }
  }
</script>

<style lang="scss">
 
</style>
