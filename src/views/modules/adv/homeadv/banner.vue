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
        <el-table-column label="编号" prop="id">
        </el-table-column>
        <el-table-column prop="sorts" label="排序">
        </el-table-column>
        <el-table-column  label="banner图片"  width="300">
          <template slot-scope="scope">
            <img  :src="scope.row.url" width="200" style="margin-left: 8px">
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否关联商品">
        </el-table-column>
        <el-table-column prop="goodId" label="关联商品ID">
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeMemberLevel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加界面 -->
      <bannerAddDialog :addFrom='addFrom' ref="bannerAddDialog" @ImgClick="ImgClick" @getHomeBanner="getHomeBanner"></bannerAddDialog>
      <!-- 编辑界面 -->
      <bannerEditDialog :editFrom='editFrom' ref="bannerEditDialog" @ImgClick="ImgClick" @getHomeBanner="getHomeBanner"></bannerEditDialog>
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
  import bannerEditDialog from './components/bannerEditDialog'
  import bannerAddDialog from './components/bannerAddDialog'
  import Api_adv from '@/api/adv'
  export default {
    data () {
      return {
        bannerList:[],
        editFrom:{},
        addFrom:{
          goodId:'',
          type:1,
          url:'',
          status:1,
          sorts:''
        },
        showCropper:false,
        proportion:2.8,
        type:2,
        btnLoading:false,
      }
    },
    mounted () {
      let that=this
      that.getHomeBanner()
    },
    components: { cropper,bannerEditDialog,bannerAddDialog},
    methods: {
      // 获取首页banner
      getHomeBanner(){
        let params={}
        let that=this
        that.addFrom={goodId:'',type:1,url:'',status:1,sorts:''}
        params.type=1
        Api_adv.HomeBannerList(params).then(function(res){
          that.bannerList=res.rows
        })
      },
      // 删除首页banner
      removeMemberLevel(index,row){
        let that=this
        Api_adv.HomeBannerDel(row).then(function(res){
          if(res.code==0){
            that.$message.success({
              showClose: true,
              message: "删除成功",
              duration: 2000
            }); 
            that.getHomeBanner()
          }
        })
      },
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
      if(data != undefined){
      this.showCropper = false
      this.btnLoading = false;
      this.addFrom.url=data.url
      this.editFrom.url = data.url
      }
      else{
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
