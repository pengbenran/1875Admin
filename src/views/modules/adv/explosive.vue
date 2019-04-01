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
        <el-table-column label="编号" prop="kindId">
        </el-table-column>
        <el-table-column  label="分类背景图片"  width="300">
          <template slot-scope="scope">
            <img  :src="scope.row.img" width="200" style="margin-left: 8px">
          </template>
        </el-table-column>
        <el-table-column prop="kindName" label="分类名称">
        </el-table-column>
        <el-table-column prop="kindNameColor" label="分类字体颜色">
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeMemberLevel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增模态框 -->
      <explosiveAddDialog :addFrom='addFrom' ref="explosiveAddDialog"></explosiveAddDialog>
      <!-- 编辑模态框 -->
      <explosiveEditDialog :editFrom='editFrom' ref="explosiveEditDialog"></explosiveEditDialog>
      <!-- 图片裁剪 -->
      <div class="app-main-content" >
        <el-dialog :visible.sync="showCropper" title="封面裁图" width="70%">
          <cropper id="avatarCrop" ref="cropper" @cropper-success="cropperSuccessHandle" :proportion="proportion"></cropper>
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
  export default {
    data () {
      return {
        kindList:[
        {kindId:1,kindName:'美食大咖',img:'/static/img/hot1bg.jpg',kindNameColor:'#F10D0D'},
        {kindId:2,kindName:'高端玩家',img:'/static/img/hot1bg.jpg',kindNameColor:'#2C0505'},
        {kindId:3,kindName:'女神范儿',img:'/static/img/hot1bg.jpg',kindNameColor:'#322E2E'}],
        editFrom:{},
        addFrom:{
          kindId:'',
          kindName:'',
          img:'',
          kindNameColor:''
        },
        showCropper:false,
        proportion:2.8,
        btnLoading:false,
      }
    },
    mounted () {
      
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
              // this.form.src = data.msg
              if(this.caseIndex == 1){
                this.imgList[this.selectIndex] = data.msg
              // this.imgList.push(data.msg)
              }else if (this.caseIndex == 2) {
               this.tjImgList[this.selectIndex] = data.msg
              }
              }else{
                this.$message.error('抱歉，您的网络错误');
              }
         },
         ImgClick(){
            this.showCropper = true;
         }  
    }
  }
</script>

<style lang="scss">
 
</style>
