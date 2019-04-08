<template>
 <el-dialog title="关联商品" :visible.sync="goodsConnectFormVisible">
        <el-form  ref="advertform">
         <el-form-item label="关联商品:" :label-width="formLabelWidth">
            <el-table ref="multipleTable":data="goodsListData" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="商品名称" prop="goodName">
            </el-table-column>
            <el-table-column label="商品图片">
              <template slot-scope="scope">
               <img :src="scope.row.thumbnail" width="80">
             </template>
            </el-table-column>
           </el-table>
          </el-form-item> 
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
</template>
<script type="text/javascript">
  import Api_adv from '@/api/adv'
	export default {
		props: ['goodsListData','connectGood'],
		data () {
			return {
			 goodsConnectFormVisible:false,
       params:{
        type:3,
        goodIds:''
       },
       formLabelWidth: '120px',
			}
		},
    methods:{
      showGoodConnectDialog(){
          let that = this;
          that.goodsConnectFormVisible = true;
          setTimeout(function(){
            that.connectGood.forEach(row => {
              that.goodsListData.findIndex((item,index)=>{
               if(item.goodId==row){
                that.$refs.multipleTable.toggleRowSelection(that.goodsListData[index]);
              }
            })     
            })
          },500) 
      },
       handleSelectionChange(val){
         let that=this
         let res=[]
         res=val.map(item=>{
          return item.goodId
        })
        that.params.goodIds=res.join(',')
      },
      submit(){
        let that=this
        Api_adv.batchSave(that.params).then(function(res){
          if(res.code==0){
            that.$message.success({
              showClose: true,
              message: "关联成功",
              duration: 2000
            });
            that.goodsConnectFormVisible = false;
          }
        })
      }
    }
	}
</script>
<style type="text/css" scoped>

</style>
