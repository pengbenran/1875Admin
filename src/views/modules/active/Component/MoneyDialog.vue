
<template>
<!--用户等级新增,编辑分离-->
    <div>
   
    <section>
        <el-dialog title="商品分类编辑" :visible.sync="EditShow" >
        <el-form :model="EdiData"  :rules="EdiDatarules"  ref="EditruleForm">
            <el-form-item label="参与金额" :label-width="formLabelWidth"  prop="joinAmount">
                <el-input v-model="EdiData.joinAmount" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="完成人数" :label-width="formLabelWidth"  prop="finishNumber">
                <el-input v-model="EdiData.finishNumber" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动天数" :label-width="formLabelWidth"  prop="timeInterval">
                <el-input v-model="EdiData.timeInterval" placeholder="请输入内容" autocomplete="off">
                <template slot="append">天</template>
            </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="EditShow = false">取 消</el-button>
            <el-button type="primary" @click="editData">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--商品分类编辑-->

    <Uploadimg ref='UploadImg' @GetDataImg='GetDataImg' :type='ImgType' :proportion='proportion'/>
    <!--图片上传 end-->
    </div>
</template>
<script>
import API from "@/api/goods";
import Uploadimg from "@/components/UpLoadImg/UpLoadImg";
export default {
    watch:{
    },
    components:{Uploadimg},
    data () {
        return {
           AddShow:false,
           EditShow:false,
           ImgType:0, //设置图片类型
           proportion:1, //设置图片比例
           IMAGE_iNDEX:1, //是删除还是编辑的标识
          
           EdiData:{
               joinAmount:'',
               finishNumber:'',
               timeInterval:'',
               pennyId:''
           },
           formLabelWidth:'120px',
         
           EdiDatarules:{
             joinAmount:[
                { required: true, message: '设置参与金额', trigger: 'blur' },
             ],
             finishNumber:[
                { required: true, message: '请设置参与人数', trigger: 'blur' },
             ],
             timeInterval:[
                { required: true, message: '请设置活动天数', trigger: 'blur' },
             ],
           }
        }
    },
    methods: {
 

        //编辑用户等级EditruleForm
        editData(){
            let that = this;
            this.$refs['EditruleForm'].validate((valid) => {
            if (valid) {
                API.UpdateYiMoneyShopList(that.EdiData).then(res => {
                    if(res.code == 0){
                        that.$message({message:'编辑成功',type:'success'})
                        that.$parent.GetDataList();
                        that.EditShow = false;
                    }else{
                        that.$message.error('添加失败');                    
                    }
                }).catch(err => {})
            } else {
                console.log('error submit!!');
                return false;
            }
            });            
        },


        //编辑显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            let _Obj = {}
                _Obj.joinAmount = row.joinAmount;
                _Obj.finishNumber = row.finishNumber;
                _Obj.timeInterval = row.timeInterval;
                _Obj.pennyId = row.pennyId;
            
            this.EdiData = Object.assign({},_Obj);
            console.log(this.EdiData,"查看一下现在拿到的数据", this.EdiData )
        },

        //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:是删除还是编辑的标识
        UpLoadShow(type,proportion,IMAGE_iNDEX){
            this.ImgType = type;
            this.proportion = proportion;
            this.IMAGE_iNDEX = IMAGE_iNDEX;
            this.$refs.UploadImg.showDialog(true)
        },

        //图片赋值
        GetDataImg(ImgUrl){
           
            if(this.IMAGE_iNDEX == 1){
                this.AddData.img = ImgUrl;
            }else{
                this.EdiData.img = ImgUrl;
            }
        },
    }
}
</script>
<style scoped>
.avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
}
.avatar-uploader .avatar-uploader-icon,.avatar-uploader img{
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
</style>
