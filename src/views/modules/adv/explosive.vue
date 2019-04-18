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
            <el-button size="mini" type="primary" @click="showGoodConnectDialog(scope.row.id)">关联商品</el-button>
          </template>
        </el-table-column>
      </el-table>
        <!-- 新增模态框 -->
      <explosiveAddDialog :addFrom='addFrom' ref="explosiveAddDialog" @ImgClick="ImgClick" @catBackGroundList="catBackGroundList"></explosiveAddDialog>
      <!-- 编辑模态框 -->
      <explosiveEditDialog :editFrom='editFrom' ref="explosiveEditDialog" @ImgClick="ImgClick" @catBackGroundList="catBackGroundList"></explosiveEditDialog>
      <!-- 关联商品 -->
      <explosiveGoodConnectDialog ref="explosiveGoodConnectDialog"></explosiveGoodConnectDialog>
      <!-- 图片裁剪 -->
      <uploadImg :proportion="proportion" :type="type" ref='UploadImg' @GetDataImg='GetDataImg'></uploadImg>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import uploadImg from '@/components/UpLoadImg/UpLoadImg'
  import explosiveAddDialog from './components/explosive/explosiveAddDialog'
  import explosiveEditDialog from './components/explosive/explosiveEditDialog'
  import explosiveGoodConnectDialog from './components/thingsExplosiveConnectionDialog'
  import Api_adv from '@/api/adv'
  import Api_goodList from '@/api/goods'
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
        proportion:1.06,
        type:4,
        btnLoading:false,
        formLabelWidth:'120px',
        catBackgroundId:''
      }
    },
    mounted () {
      let that=this
      that.catBackGroundList()
    },
    components: { uploadImg,explosiveEditDialog,explosiveAddDialog,explosiveGoodConnectDialog},
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
            // 关联商品模态框
           showGoodConnectDialog(catBackgroundId){
            let that = this;
            that.catBackgroundId=catBackgroundId
            that.$refs.explosiveGoodConnectDialog.showGoodConnectDialog(that.catBackgroundId)
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
           GetDataImg(ImgUrl){
            let that=this
            that.addFrom.url=ImgUrl
            that.editFrom.url = ImgUrl
          }, 
          ImgClick(){
            let that=this
            that.$refs.UploadImg.showDialog(true)
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
    }
  }
</script>
<style lang="scss">
 
</style>
