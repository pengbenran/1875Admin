
<template>
<!--用户等级新增,编辑分离-->
    <div>
    <section>
        <el-form :model="AddData"  :rules="AddDatarules" ref="AddruleForm">
            <el-form-item label="商品编号" :label-width="formLabelWidth"  prop="sn">
                <el-input v-model="AddData.sn" placeholder="请输入商品编号" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="商品名称" :label-width="formLabelWidth"  prop="goodName">
                <el-input v-model="AddData.goodName" placeholder="请输入商品名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品标题" :label-width="formLabelWidth"  prop="title">
                <el-input v-model="AddData.title" placeholder="请输入商品标题" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="展示价格" :label-width="formLabelWidth"  prop="showPrice">
                <el-input v-model="AddData.showPrice" placeholder="请输入展示价格" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="成本价" :label-width="formLabelWidth"  prop="cost">
                <el-input v-model="AddData.cost" placeholder="请输入成本价" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否热销" :label-width="formLabelWidth"  prop="hot">
                <el-input v-model="AddData.hot" placeholder="请设置是否热销" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="价格" :label-width="formLabelWidth"  prop="price">
                <el-input v-model="AddData.price" placeholder="请输入价格" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="排序" :label-width="formLabelWidth"  prop="sort">
                <el-input v-model="AddData.sort" placeholder="请输入排序" autocomplete="off"></el-input>
            </el-form-item>                                          

            <el-form-item label="商品状态" :label-width="formLabelWidth" prop="status">
                <el-radio v-model="AddData.status" label="1">待付款</el-radio>
                <el-radio v-model="AddData.status" label="2">已付款</el-radio>
                <el-radio v-model="AddData.status" label="3">已取消</el-radio>
                <el-radio v-model="AddData.status" label="4">已关闭</el-radio>
            </el-form-item>
            <el-form-item label="分类ID" :label-width="formLabelWidth"  prop="catId">
                <el-input v-model="AddData.catId" placeholder="请输入分类ID" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类名称" :label-width="formLabelWidth"  prop="catName">
                <el-input v-model="AddData.catName" placeholder="请输入分类名称" autocomplete="off"></el-input>
            </el-form-item>      
            <el-form-item label="区域" :label-width="formLabelWidth"  prop="region">
                <el-input v-model="AddData.region" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="商品描述" :label-width="formLabelWidth"  prop="region">
                <el-input v-model="AddData.content" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="付款类型" :label-width="formLabelWidth"  prop="payType">
                <el-radio v-model="AddData.payType" label="1">是</el-radio>
                <el-radio v-model="AddData.payType" label="2">否</el-radio>
                <!-- <el-alert style="padding:0px" title="注：根级也就是设置初始等级" type="success"></el-alert> -->
            </el-form-item>
            <el-form-item label="商品详情" :label-width="formLabelWidth"  prop="thumbnail">
                <Editor/>
            </el-form-item>   
            <el-form-item label="商品缩略图" :label-width="formLabelWidth"  prop="thumbnail">
                <div class="avatar-uploader" @click="UpLoadShow"><img v-if="AddData.thumbnail" :src="AddData.thumbnail" class="avatar"><i v-else class="el-icon-plus avatar-uploader-icon"></i></div>
                <!-- <el-input v-model="AddData.thumbnail" placeholder="请输入内容" autocomplete="off"></el-input> -->
            </el-form-item>   
            <el-form-item label="轮播图" :label-width="formLabelWidth"  prop="images">
                <el-input v-model="AddData.images" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="展示销售量" :label-width="formLabelWidth"  prop="showSales">
                <el-input v-model="AddData.showSales" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="真实的销售量" :label-width="formLabelWidth"  prop="sales">
                <el-input v-model="AddData.sales" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商店ID" :label-width="formLabelWidth"  prop="shopId">
                <el-input v-model="AddData.shopId" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="分享海报" :label-width="formLabelWidth"  prop="posterImg">
                <el-input v-model="AddData.posterImg" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否可以使用红包" :label-width="formLabelWidth"  prop="redPacket">
                <el-input v-model="AddData.redPacket" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AddShow = false">取 消</el-button>
            <el-button type="primary" @click="addData">确 定</el-button>
        </div>
    </section>
    <!--商品分类添加-->

    <Uploadimg ref='UploadImg'/>
    <!--图片上传 end-->
    
    </div>
</template>
<script>
import API from "@/api/goods";
import Editor from "@/components/ueditor/ueditor";
import Uploadimg from "./Component/UpLoadImg";
// import 
export default {
    name: 'GoodsCreate',
    components:{Editor,Uploadimg},
    data () {
        return {
           AddShow:false,
           AddData:{
               content:''
           },
           formLabelWidth:'120px',
           AddDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             root:[
                { required: true, message: '请设置根级', trigger: 'blur' },
             ],
             parentId:[
                { required: true, message: '请设置父级', trigger: 'blur' },
             ],
             sort:[
                { required: true, message: '请设置排序', trigger: 'blur' },
             ],
             showed:[
                { required: true, message: '请设置是否展示', trigger: 'blur' },
             ],
             img:[
                { required: true, message: '请设置分类图片', trigger: 'blur' },
             ],
           },
        }
    },
    mounted () {
    //    this.GetGoodsCatList();
    },
    methods: {
        //添加用户的等级
        addData(){
            let that = this;
            this.$refs['AddruleForm'].validate((valid) => {
            if (valid) {
                API.AddGoodsCat(that.AddData).then(res => {
                    if(res.code == 0){
                        that.$message({ message: '添加成功', type: 'success'});
                        that.$parent.GetGoodsCatList();
                        that.AddShow = false
                        that.AddData = {}
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

        //显示图片上传框
        UpLoadShow(){
            this.$refs.UploadImg.showDialog(true)
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
.avatar-uploader-icon{
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
</style>
