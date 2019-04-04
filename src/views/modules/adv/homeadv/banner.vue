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
      <uploadImg :proportion="proportion" :type="type" ref='UploadImg' @GetDataImg='GetDataImg'></uploadImg>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import bannerEditDialog from './components/bannerEditDialog'
  import bannerAddDialog from './components/bannerAddDialog'
  import uploadImg from '@/components/UpLoadImg/UpLoadImg'
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
        proportion:2.8,
        type:2,
        btnLoading:false,
      }
    },
    mounted () {
      let that=this
      that.getHomeBanner()
    },
    components: { uploadImg,bannerEditDialog,bannerAddDialog},
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
      GetDataImg(ImgUrl){
        let that=this
        this.addFrom.url=ImgUrl
        this.editFrom.url = ImgUrl
      },
      ImgClick(){
        let that=this
        that.$refs.UploadImg.showDialog(true)
      }  
    }
  }
</script>

<style lang="scss">
 
</style>
