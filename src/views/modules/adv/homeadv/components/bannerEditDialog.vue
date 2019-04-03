<template>
	<el-dialog title="首页banner编辑" :visible.sync="dialogFormVisible">
		<el-form :model="editFrom" ref="advertform">
			<el-form-item label="图片路径" :label-width="formLabelWidth">
				<el-col width='400'>
					<img :src="editFrom.url" mode='widthFix' style="width:100%"  @click="ImgClick">
				</el-col>
				<el-alert title="注：首页banner比例为2.8 : 1，建议图片大小为300kb - 400kb" type="error" style="padding:0;margin-top: 5px;"></el-alert>
			</el-form-item>
			<el-form-item label="是否关联商品" :label-width="formLabelWidth" prop="isconnect">
				<el-radio-group v-model="editFrom.status">
					<el-radio :label="1">是</el-radio>
					<el-radio :label="0">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="关联商品Id" :label-width="formLabelWidth" prop="goodId" v-if="editFrom.status == 1" >
				<div class="inputGoods">
					<el-input v-model="editFrom.goodId" autocomplete="off"></el-input>
				</div>
			</el-form-item> 
			<el-form-item label="排序" :label-width="formLabelWidth" >
            <div class="inputGoods">
              <el-input v-model="editFrom.sorts"  autocomplete="off" placeholder="请输入排列顺序"></el-input>
            </div>
          </el-form-item> 
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button>取 消</el-button>
			<el-button type="primary" @click="upData">确 定</el-button>
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
          	Api_adv.HomeBannerUpdate(that.editFrom).then(function(res){
          		if(res.code==0){
          			that.$message.success({
          				showClose: true,
          				message: "更新成功",
          				duration: 2000
          			});	
          			that.dialogFormVisible = false;
          			that.$emit('getHomeBanner');
          		}
          		else{
          			that.$message.error({
          				showClose: true,
          				message: "更新失败",
          				duration: 2000
          			});
          		}
          	})
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
