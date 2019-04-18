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
           <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"  @pagination="GetGoodsList"/>
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
  import Pagination from '@/components/Pagination'
  import Api_goodList from '@/api/goods'
	export default {
		props: ['type'],
    components: { Pagination},
		data () {
			return {
        goodsConnectFormVisible:false,
        formLabelWidth:'120px',
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:0,
        goodsListData:[],
        connectGood:[],
        multipleSelection:[],
        multipleSelectionAll:[],
      }
		},
    methods:{
      // 获取已经人气关联的商品
      bannerGoodlist(){
        let that=this
        let params={}
        params.type=that.type
        Api_adv.bannerGoodlist(params).then(function(res){
          that.connectGood=res.goodIds
        })
      },
      // 设置选中的方法
      setSelectRow() {
        let that=this
            // 标识当前行的唯一键的名称  
            let selectAllIds = [];
            that.multipleSelectionAll.forEach(row=>{
              selectAllIds.push(row.goodId);
            }) 
            that.$refs.multipleTable.clearSelection(); 
            for(var i = 0; i < that.goodsListData.length; i++) { 
              if (selectAllIds.indexOf(that.goodsListData[i].goodId) >= 0) {
                that.$refs.multipleTable.toggleRowSelection(this.goodsListData[i], true);
              }
            }
          },
          GetGoodsList(){
            let that=this
            that.changePageCoreRecordData()  
            Api_goodList.GoodsList(that.listQuery).then(function(res){
              that.goodsListData=res.rows
              that.total=res.total   
              let selectAllIds=that.multipleSelectionAll.map(item=>{
                return item.goodId
              })
              that.goodsListData.forEach(row=>{
                that.connectGood.map(item=>{
                  if(item==row.goodId&&selectAllIds.indexOf(item)<0){
                    that.multipleSelectionAll.push(row)
                  }
                })
              })
              setTimeout(()=>{
                that.setSelectRow()
              },100)
            })
          }, 
      async showGoodConnectDialog(){
          let that = this;
          that.goodsConnectFormVisible = true;
          that.multipleSelectionAll=[]
          await that.GetGoodsList()
          await that.bannerGoodlist()
          setTimeout(function(){
           that.setSelectRow()
          },500)            
      },
      handleSelectionChange(val){
         let that=this
         that.multipleSelection=val
      },
      submit(){
        let that=this
        that.changePageCoreRecordData()
        let res=that.multipleSelectionAll.map(item=>{
          return item.goodId
        })
        let params={}
        params.goodIds=res.join(',')
        params.type=that.type
        Api_adv.batchSave(params).then(function(res){
          that.$message.success({
              showClose: true,
              message: "关联成功",
              duration: 2000
            });
            that.listQuery.page=1
            that.goodsConnectFormVisible = false;
        })
      },
      changePageCoreRecordData(){
        let that=this
        // 获取所有选择Id
        let selectAllIds = [];
        that.multipleSelectionAll.forEach(row=>{
          selectAllIds.push(row.goodId);
        })
        // 获取当页选中ID
        let selectIds = []
        that.multipleSelection.forEach(row=>{
          selectIds.push(row.goodId);
          if (selectAllIds.indexOf(row.goodId) < 0) {
            that.multipleSelectionAll.push(row)
          }
        })
        let noSelectIds = [];
        // 得到当前页没有选中的id
        that.goodsListData.forEach(row=>{
          if (selectIds.indexOf(row.goodId) < 0) {
            noSelectIds.push(row.goodId);
          }
        })
        noSelectIds.forEach(id=>{
          if (selectAllIds.indexOf(id) >= 0) {
            for(let i = 0; i< that.multipleSelectionAll.length; i ++) {
              if (that.multipleSelectionAll[i].goodId == id) {
                  // 如果总选择中有未被选中的，那么就删除这条
                  that.multipleSelectionAll.splice(i, 1);
                  break;
                }
              }
            }
        })
      },
    }
	}
</script>
<style type="text/css" scoped>

</style>
