<template>
 <el-dialog title="首页banner新增" :visible.sync="addFormVisible">
        <el-form :model="addFrom" ref="advertform">
          <el-form-item label="图片路径" :label-width="formLabelWidth">
           <el-col width='400' >
            <i class="el-icon-plus avatar-uploader-icon" @click="ImgClick"></i>
          </el-col>
          <el-alert title="注：首页banner比例为2.8 : 1，建议图片大小为300kb - 400kb" type="error" style="padding:0;margin-top: 5px;"></el-alert>
          </el-form-item>
          <el-form-item label="是否关联商品" :label-width="formLabelWidth" prop="isconnect">
            <el-radio-group v-model="addFrom.isconnect">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="关联商品Id" :label-width="formLabelWidth" prop="associationGoods" v-if="addFrom.isconnect == 1" >
            <div class="inputGoods">
              <el-input v-model="addFrom.associationGoods" autocomplete="off" ></el-input>
              <el-alert title="消息提示的文案" type="info">注：可以根据图片的ID添加链接，若不跳转，输入0;</el-alert>
            </div>
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
  height: 142px;
  line-height:142px;
  text-align: center;
  font-size: 18px;
  border:  1px solid #ddd;
}
</style>
