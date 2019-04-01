
<template>
<!--用户等级新增,编辑分离-->
    <div>
    <section>
        <el-form :model="AddData"  :rules="AddDatarules" ref="AddruleForm">
            <el-form-item label="商品名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.goodName" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类ID" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.catId" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.catName" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>      
            <el-form-item label="区域" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.region" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>    
            <el-form-item label="价格" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.price" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="排序" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.sort" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>                                          
            <el-form-item label="付款类型" :label-width="formLabelWidth"  prop="root">
                <el-radio v-model="AddData.payType" label="1">是</el-radio>
                <el-radio v-model="AddData.payType" label="2">否</el-radio>
                <!-- <el-alert style="padding:0px" title="注：根级也就是设置初始等级" type="success"></el-alert> -->
            </el-form-item>
            <el-form-item label="商品状态" :label-width="formLabelWidth" prop="sort">
                <el-radio v-model="AddData.status" label="1">待付款</el-radio>
                <el-radio v-model="AddData.status" label="2">已付款</el-radio>
                <el-radio v-model="AddData.status" label="3">已取消</el-radio>
                <el-radio v-model="AddData.status" label="4">已关闭</el-radio>
            </el-form-item>
            <el-form-item label="商品编号" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.sn" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="商品标题" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.title" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="商品缩略图" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.thumbnail" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="轮播图" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.images" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="展示销售量" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.showSales" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="真实的销售量" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.sales" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="真实的销售量" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.sales" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商店ID" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.sales" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否展示" :label-width="formLabelWidth"  prop="showed">
                <el-radio v-model="AddData.showed" label="1">是</el-radio>
                <el-radio v-model="AddData.showed" label="2">否</el-radio>
                <el-alert style="padding:0px" title="注：是否在前台小程序展示" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
                <el-input v-model="AddData.img" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类描述" :label-width="formLabelWidth">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="AddData.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AddShow = false">取 消</el-button>
            <el-button type="primary" @click="addData">确 定</el-button>
        </div>
    </section>
    <!--商品分类添加-->

    </div>
</template>
<script>
import API from "@/api/goods";
export default {
    data () {
        return {
           AddShow:false,
           AddData:{},
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

    }
}
</script>
<style scoped>

</style>
