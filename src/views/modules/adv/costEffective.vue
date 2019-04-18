<template>
    <div class="banner">
    <el-row class="warp">
    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
            <el-button type="success" @click="showGoodConnectDialog">关联商品</el-button>
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
      <costEffectiveAddDialog :addFrom='addFrom' ref="costEffectiveAddDialog" @ImgClick="ImgClick" @getHomeBanner="getHomeBanner"></costEffectiveAddDialog>
      <!-- 编辑界面 -->
      <costEffectiveEditDialog :editFrom='editFrom' ref="costEffectiveEditDialog" @ImgClick="ImgClick" @getHomeBanner="getHomeBanner"></costEffectiveEditDialog>
      <!-- 关联商品 -->
      <costEffectiveGoodConnectDialog  ref="costEffectiveGoodConnectDialog" :type='connectType'></costEffectiveGoodConnectDialog>
      <!-- 图片裁剪 -->
      <uploadImg :proportion="proportion" :type="type" ref='UploadImg' @GetDataImg='GetDataImg'></uploadImg>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import uploadImg from '@/components/UpLoadImg/UpLoadImg'
  import costEffectiveAddDialog from './components/costEffective/costEffectiveAddDialog'
  import costEffectiveEditDialog from './components/costEffective/costEffectiveEditDialog'
  import costEffectiveGoodConnectDialog from './components/thingsCostEffecticeConnectionDialog'
  import Api_adv from '@/api/adv'
  import Api_goodList from '@/api/goods'
  export default {
    data () {
      return {
        bannerList:[],
        editFrom:{},
        addFrom:{
          goodId:'',
          type:3,
          url:'',
          status:1,
          sorts:''
        },
        showCropper:false,
        proportion:2.8,
        type:2,
        formLabelWidth:'120px',
        btnLoading:false,
        connectType:3,
        catBackgroundId:''
      }
    },
    mounted () {
      let that=this
      that.getHomeBanner()
    },
    components: { uploadImg,costEffectiveAddDialog,costEffectiveEditDialog,costEffectiveGoodConnectDialog},
    methods: { 
      // 获取首页banner
      getHomeBanner(){
        let params={}
        let that=this
        that.addFrom={goodId:'',type:3,url:'',status:1,sorts:''}
        params.type=3
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
        that.$refs.costEffectiveEditDialog.showEditDialog()
      },
      // 新增
      showAddDialog(){
        let that = this;
        that.$refs.costEffectiveAddDialog.showAddDialog()
      },
      showGoodConnectDialog(){
        let that = this;
        that.$refs.costEffectiveGoodConnectDialog.showGoodConnectDialog()
      },
      GetDataImg(ImgUrl){
        let that=this
        that.addFrom.url=ImgUrl
        that.editFrom.url = ImgUrl
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
