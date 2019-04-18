<template>
 <el-dialog title="最新好物分类新增" :visible.sync="addFormVisible">
        <el-form :model="addFrom" ref="advertform">
          <el-form-item label="分类名称" :label-width="formLabelWidth" prop="catName">
              <el-input v-model="addFrom.catName" auto-complete="off" placeholder="请输入分类名称"></el-input>
          </el-form-item>
          <el-form-item label="字体颜色" :label-width="formLabelWidth" prop="fontColor">
            <div class="block">
              <el-color-picker v-model="addFrom.fontColor"></el-color-picker>
            </div>
          </el-form-item> 
          <el-form-item label="图片路径" :label-width="formLabelWidth">
           <el-col width='400' v-if="addFrom.url==''">
            <i class="el-icon-plus avatar-uploader-icon" @click='ImgClick'></i>
          </el-col>
          <el-col width='400' v-else>
           <img :src="addFrom.url" mode='widthFix' style="width:100%" @click='ImgClick' >
          </el-col>
          <el-alert title="注：首页banner比例为2.14 : 1，建议图片大小为300kb - 400kb" type="error" style="padding:0;margin-top: 5px;"></el-alert>
          </el-form-item> 
          <el-form-item label="排序" :label-width="formLabelWidth" prop="catName">
              <el-input v-model="addFrom.sorts" auto-complete="off" placeholder="请输入排列顺序"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click='submit'>确 定</el-button>
        </div>
      </el-dialog>
</template>
<script type="text/javascript">
  import Api_adv from '@/api/adv'
  export default {
    props: ['addFrom'],
    data () {
      return {
        addFormVisible:false,
        formLabelWidth: '120px',
        gridData: [],
      }
    },
    methods:{
      handleSelectionChange(){

      },
      showAddDialog(){
            let that = this;
            that.addFormVisible = true;
      },
      ImgClick(){
        this.$emit('ImgClick');
      },
      submit(){
        let that=this
        Api_adv.catBackGroundAdd(that.addFrom).then(function(res){
          if(res.code==0){
           that.$message.success({
            showClose: true,
            message: "新增成功",
            duration: 2000
          });
           that.addFormVisible = false;
           that.$emit('catBackGroundList');
         }
          console.log(res);
        })
      }
    }
  }
</script>
<style type="text/css" scoped>
.avatar-uploader-icon{
  width:100%;
  height: 187px;
  line-height:187px;
  text-align: center;
  font-size: 18px;
  border:  1px solid #ddd;
}
</style>
