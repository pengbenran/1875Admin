<template>
 <el-dialog title="关联商品" :visible.sync="goodsConnectFormVisible">
        <el-form :model="goodsListData" ref="advertform">
         <el-form-item label="关联商品:" :label-width="formLabelWidth" prop="kindName">
            <el-table ref="multipleTable":data="goodsListData" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="商品名称" prop="name">
            </el-table-column>
            <el-table-column prop="address" label="商品图片"></el-table-column>
           </el-table>
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
		props: ['goodsListData'],
		data () {
			return {
			 goodsConnectFormVisible:false
			}
		},
    methods:{
      showGoodConnectDialog(){
          let that = this;
          that.goodsConnectFormVisible = true;
      }
    }
	}
</script>
<style type="text/css" scoped>

</style>
