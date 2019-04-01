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
      <el-table :data="bannerList" highlight-current-row style="width: 100%;">
        <el-table-column label="编号" prop="bannerId">
        </el-table-column>
        <el-table-column prop="sort" label="排序">
        </el-table-column>
        <el-table-column  label="banner图片"  width="300">
          <template slot-scope="scope">
            <img  :src="scope.row.img" width="200" style="margin-left: 8px">
          </template>
        </el-table-column>
        <el-table-column prop="isconnect" label="是否关联商品">
        </el-table-column>
        <el-table-column prop="associationGoods" label="关联商品ID">
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeMemberLevel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加界面 -->
      <bannerAddDialog :addFrom='addFrom' ref="bannerAddDialog" @ImgClick="ImgClick"></bannerAddDialog>
      <!-- 编辑界面 -->
      <bannerEditDialog :editFrom='editFrom' ref="bannerEditDialog" @ImgClick="ImgClick"></bannerEditDialog>
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
  import bannerEditDialog from './components/bannerEditDialog'
  import bannerAddDialog from './components/bannerAddDialog'
  export default {
    data () {
      return {
        bannerList:[
        {bannerId:1,associationGoods:'2323',img:'https://image.etuetf.com/advImage/62a214ee-87be-4e7e-b537-2573a549cf7a.jpg',isconnect:1,sort:1},
        {bannerId:2,associationGoods:'2323',img:'https://image.etuetf.com/advImage/7ca09e27-039d-4615-adbb-db7307474095.jpg',isconnect:1,sort:2},
        {bannerId:3,associationGoods:'2323',img:'https://image.etuetf.com/advImage/97f99ca6-b8bf-4d73-84f7-d5c1484dfe29.jpg',isconnect:1,sort:3}],
        editFrom:{},
        addFrom:{
          bannerId:'',
          associationGoods:'',
          img:'',
          isconnect:1,
          sort:1
        },
        showCropper:false,
        proportion:2.8,
        btnLoading:false,
      }
    },
    mounted () {
      
    },
    components: { cropper,bannerEditDialog,bannerAddDialog},
    methods: {
          //编辑
          showEditDialog(index,row){
            let that = this;
            that.editFrom = row;
            that.$refs.bannerEditDialog.showEditDialog()
          },
          // 新增
          showAddDialog(){
            let that = this;
            that.$refs.bannerAddDialog.showAddDialog()
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
    // async submitClick(){
    //   let that = this;
    //   that.form.src = this.imgList.join(',')
    //   that.form.recommendimg =  this.tjImgList.join(',')
    //   that.listLoading = true;
    //   if(that.btntijiaoVisible){ //修改提交
    //     let res = await API_adver.update_advert(that.form).catch(err => {
    //         this.$message.error('抱歉，您的网络错误')
    //     })
    //      if(res.code == 0){
    //         this.getAdvert();
    //         that.dialogFormVisible = false;
    //         that.listLoading = false;
    //         this.$message({
    //           message: '修改成功',
    //           type: 'success'
    //         });
    //     }else{
    //         this.getAdvert();
    //         that.dialogFormVisible = false;
    //         that.listLoading = false;
    //         this.$message({
    //           message: '修改失败',
    //           type: 'success'
    //         });

    //     }

    //   }else{ //信息上传
    //     let res = await API_adver.save_advert(that.form).catch(err => {
    //         this.$message.error('抱歉，您的网络错误')
    //     })
    //     if(res.code == 0){
    //         this.getAdvert();
    //         that.dialogFormVisible = false;
    //         that.listLoading = false;
    //         this.$message({
    //           message: '添加成功',
    //           type: 'success'
    //         });
    //     }else{
    //         this.getAdvert();
    //         that.dialogFormVisible = false;
    //         that.listLoading = false;
    //         this.$message({
    //           message: '添加失败',
    //           type: 'success'
    //         });
    //     }
    //   }
    // },
    }
  }
</script>

<style lang="scss">
 
</style>
