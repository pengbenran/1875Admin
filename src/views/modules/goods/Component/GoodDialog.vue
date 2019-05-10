<template>
   <div>
       <section>
            <el-dialog title="转入一分钱抢" :visible.sync="AddShow">
                 <el-form :model="AddData"  :rules="AddDatarules" ref="AddruleForm">
                    <el-form-item label="参与金额" :label-width="formLabelWidth"  prop="joinAmount">
                        <el-input v-model="AddData.joinAmount" placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="完成人数" :label-width="formLabelWidth"  prop="finishNumber">
                        <el-input v-model="AddData.finishNumber" placeholder="请输入内容" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="活动天数" :label-width="formLabelWidth"  prop="timeInterval">
                        <el-input v-model="AddData.timeInterval" placeholder="请输入内容" autocomplete="off">
                             <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                 </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="AddShow = false">取 消</el-button>
                    <el-button type="primary" @click="addData">确 定</el-button>
                </div>
            </el-dialog>
       </section>
   </div>    
</template>
<script>
import API from "@/api/goods";
export default {
    data (){
        return {
            AddShow:false,
            formLabelWidth:'120px',
            AddData:{
            },
            AddDatarules:{
                joinAmount:[
                { required: true, message: '参与金额', trigger: 'blur' },
               ],
                finishNumber:[
                { required: true, message: '完成人数', trigger: 'blur' },
               ],
                timeInterval:[
                { required: true, message: '活动天数', trigger: 'blur' },
               ],
            },

        }
    },
    methods:{
        //转入一分钱抢
        addData(){
            let that = this;
            API.AddyiMoneyShop(that.AddData).then(res => {
                if(res.code == 0){
                    that.AddShow = false;
                    that.AddData = {};
                    that.$message({message:'添加成功',type:'success'})
                }else{
                    that.$message.error('添加失败');   
                }
            }).catch(err => {
                    that.$message.error('添加失败');   
            })
        },

        //添加显示
        DiaLogShow(val,row){
            this.AddShow = val;
            this.$set(this.AddData,'goodId',row.goodId);
        },

    }
}
</script>
<style scoped>

</style>
