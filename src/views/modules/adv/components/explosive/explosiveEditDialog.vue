<template>
	<el-dialog title="首页banner编辑" :visible.sync="dialogFormVisible">
		<el-form :model="editFrom" ref="advertform">
			<el-form-item label="分类名称" :label-width="formLabelWidth" prop="kindName">
				<el-input v-model="editFrom.catName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="排列顺序" :label-width="formLabelWidth" prop="kindName">
				<el-input v-model="editFrom.sorts" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="字体颜色" :label-width="formLabelWidth" prop="kindNameColor">
				<div class="block">
					<el-color-picker v-model="editFrom.fontColor"></el-color-picker>
				</div>
			</el-form-item> 
			<el-form-item label="图片路径" :label-width="formLabelWidth">
				<el-col width='400'>
					<img :src="editFrom.url" mode='widthFix' style="width:100%"  @click="ImgClick">
				</el-col>
				<el-alert title="注：首页banner比例为2.14 : 1，建议图片大小为300kb - 400kb" type="error" style="padding:0;margin-top: 5px;"></el-alert>
			</el-form-item>	
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button>取 消</el-button>
			<el-button type="primary" @click='upData'>确 定</el-button>
		</div>
	</el-dialog>
</template>
<script type="text/javascript">
	import Api_adv from '@/api/adv'
	export default {
		props: ['editFrom'],
		data () {
			return {
				dialogFormVisible:false,
				formLabelWidth: '120px',
			}
		},
		methods:{
		  showEditDialog(){
            let that = this; 
            that.dialogFormVisible = true;
          },
          ImgClick(){
          	this.$emit('ImgClick');
          },
          upData(){
          	let that=this
          	Api_adv.catBackGroundUpdate(that.editFrom).then(function(res){
          		if(res.code==0){
          			that.$message.success({
          				showClose: true,
          				message: "更新成功",
          				duration: 2000
          			});	
          			that.dialogFormVisible = false;
          			that.$emit('catBackGroundList');
          		}
          	})
          },
          handleSelectionChange(){

          },
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
