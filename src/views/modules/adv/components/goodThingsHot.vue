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
        <el-table-column prop="fontColor" label="分类主题颜色">
        </el-table-column>
        <el-table-column label="操作" :width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removecatBackLevel(scope.$index,scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="showGoodConnectDialog(scope.row.id)">关联商品</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增模态框 -->
      <goodThingsHotAddDialog :addFrom='addFrom' ref="goodThingsHotAddDialog" @ImgClick="ImgClick" @catBackGroundList="catBackGroundList"></goodThingsHotAddDialog>
      <!-- 编辑模态框 -->
      <goodThingsHotEditDialog :editFrom='editFrom' ref="goodThingsHotEditDialog" @ImgClick="ImgClick" @catBackGroundList="catBackGroundList"></goodThingsHotEditDialog>
      <!-- 关联商品模态框 -->
      <goodThingsHotGoodConnectDialog  ref="goodThingsHotGoodConnectDialog"></goodThingsHotGoodConnectDialog>
      <!-- 图片裁剪 -->
      <uploadImg :proportion="proportion" :type="type" ref='UploadImg' @GetDataImg='GetDataImg'></uploadImg>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import goodThingsHotAddDialog from './goodThings/goodThingsHotAddDialog'
  import goodThingsHotEditDialog from './goodThings/goodThingsHotEditDialog'
  import goodThingsHotGoodConnectDialog from './thingsExplosiveConnectionDialog'
  import uploadImg from '@/components/UpLoadImg/UpLoadImg'
  import Api_adv from '@/api/adv'
  export default {
    data () {
      return {
        kindList:[],
        editFrom:{},
        addFrom:{
          catName:'',
          type:1,
          url:'',
          fontColor:'',
          sorts:''
        },
        showCropper:false,
        proportion:2.14,
        type:4,
        btnLoading:false,
        formLabelWidth:'120px',
        connectGood:[],
        catBackgroundId:''
      }
    },
    mounted () {
      let that=this
      that.catBackGroundList()
    },
    components: {uploadImg,goodThingsHotAddDialog,goodThingsHotEditDialog,goodThingsHotGoodConnectDialog},
    methods: {
          //编辑
          showEditDialog(index,row){
            let that = this;
            that.editFrom = row;
            that.$refs.goodThingsHotEditDialog.showEditDialog()
          },
           // 关联商品模态框
           showGoodConnectDialog(catBackgroundId){
            let that = this;
            that.catBackgroundId=catBackgroundId
            that.$refs.goodThingsHotGoodConnectDialog.showGoodConnectDialog(that.catBackgroundId)
          },
          // 新增
          showAddDialog(){
            let that = this;
            that.$refs.goodThingsHotAddDialog.showAddDialog()
          }, 
          catBackGroundList(){
            let params={}
            let that=this
            that.addFrom={catName:'',type:1,url:'', fontColor:'',sorts:''},
            params.type=1
            Api_adv.catBackGroundList(params).then(function(res){
              that.kindList=res.rows
            })
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
          GetDataImg(ImgUrl){
            this.addFrom.url = ImgUrl
            this.editFrom.url=ImgUrl
          },
         ImgClick(){
          this.$refs.UploadImg.showDialog(true)
         }  
    }
  }
</script>

<style lang="scss">
 
</style>
