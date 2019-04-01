<template>
 <el-dialog title="首页banner新增" :visible.sync="addFormVisible">
        <el-form :model="addFrom" ref="advertform">
          <el-form-item label="分类名称" :label-width="formLabelWidth" prop="kindName">
              <el-input v-model="addFrom.kindName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字体颜色" :label-width="formLabelWidth" prop="kindNameColor">
            <div class="block">
              <el-color-picker v-model="addFrom.kindNameColor"></el-color-picker>
            </div>
          </el-form-item> 
          <el-form-item label="图片路径" :label-width="formLabelWidth">
           <el-col width='400' >
            <i class="el-icon-plus avatar-uploader-icon" @click="ImgClick"></i>
          </el-col>
          <el-alert title="注：首页banner比例为2.14 : 1，建议图片大小为300kb - 400kb" type="error" style="padding:0;margin-top: 5px;"></el-alert>
          </el-form-item>     
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
</template>
<script type="text/javascript">
	export default {
		props: ['addFrom'],
		data () {
			return {
				addFormVisible:false,
				formLabelWidth: '120px',
			}
		},
    methods:{
      showAddDialog(){
            let that = this;
            that.addFormVisible = true;
      },
      ImgClick(){
            this.$emit('ImgClick');
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
