
<template>
<!--用户等级新增,编辑分离-->
    <div>
    <section>
        <el-dialog title="新增" :visible.sync="AddShow">
        <el-form :model="AddmenBerData"  :rules="AddmenBerDatarules">
            <el-form-item label="等级名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddmenBerData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="默认等级" :label-width="formLabelWidth"  prop="defaultLv">
                <el-radio v-model="AddmenBerData.defaultLv" label="1">是</el-radio>
                <el-radio v-model="AddmenBerData.defaultLv" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="折扣大小" :label-width="formLabelWidth" prop="discount">
                <el-input v-model="AddmenBerData.discount" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：0.8即为8折" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="等级大小" :label-width="formLabelWidth" prop="rank">
                <el-input v-model="AddmenBerData.rank" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：越大代表等级越高" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="升级方式" :label-width="formLabelWidth" prop="type">
                <el-radio v-model="AddmenBerData.type" label="0">购物数量</el-radio>
                <el-radio v-model="AddmenBerData.type" label="1">消费金额</el-radio>
            </el-form-item>
            <el-form-item label="达到等级所需积分" :label-width="formLabelWidth" prop="upgradePoint">
                <el-input v-model="AddmenBerData.upgradePoint" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="达到等级赠送积分" :label-width="formLabelWidth" prop="givePoint">
                <el-input v-model="AddmenBerData.givePoint" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="等级描述" :label-width="formLabelWidth">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="AddmenBerData.description" autocomplete="off"></el-input>
            </el-form-item>

           <el-form-item label="图片" :label-width="formLabelWidth" prop="memberImage">
            <div class="FlexWarp" >
                <div @click="SelectClick(1)"> <el-tag>未选中状态时显示图片</el-tag>
                    <el-upload class="avatar-uploader" :action="postUrl" :headers="token" :on-change="handlePreview"
                    :show-file-list="false"
                    :on-success="onSuccess"
                    :data="resData"
                    ref="upload"
                    :limit='1'>
                        <img v-if="AddmenBerData.memberImage" :src="AddmenBerData.memberImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div @click="SelectClick(2)"> <el-tag>选中状态时显示图片</el-tag>
                    <el-upload class="avatar-uploader" :action="postUrl" :headers="token" :on-change="handlePreview"
                    :show-file-list="false"
                    :on-success="onSuccess"
                    :data="resData"
                    ref="ONupload"
                    :limit='1'>
                        <img v-if="AddmenBerData.selectImage" :src="AddmenBerData.selectImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AddShow = false">取 消</el-button>
            <el-button type="primary" @click="addMenberLv">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--等级添加-->

    <section>
        <el-dialog title="编辑" :visible.sync="EditShow">
        <el-form :model="EditmenBerData"  :rules="EditmenBerDatarules">
            <el-form-item label="等级名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="EditmenBerData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="默认等级" :label-width="formLabelWidth"  prop="defaultLv">
                <el-radio v-model="EditmenBerData.defaultLv" label="1">是</el-radio>
                <el-radio v-model="EditmenBerData.defaultLv" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="折扣大小" :label-width="formLabelWidth" prop="discount">
                <el-input type='number' v-model="EditmenBerData.discount" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：0.8即为8折" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="等级大小" :label-width="formLabelWidth" prop="rank">
                <el-input type='number' v-model="EditmenBerData.rank" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：越大代表等级越高" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="升级方式" :label-width="formLabelWidth" prop="type">
                <el-radio v-model="EditmenBerData.type" label="0">购物数量</el-radio>
                <el-radio v-model="EditmenBerData.type" label="1">消费金额</el-radio>
            </el-form-item>
            <el-form-item label="达到等级所需积分" :label-width="formLabelWidth" prop="upgradePoint">
                <el-input type='number' v-model="EditmenBerData.upgradePoint" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="达到等级赠送积分" :label-width="formLabelWidth" prop="givePoint">
                <el-input type='number' v-model="EditmenBerData.givePoint" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="等级描述" :label-width="formLabelWidth">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="EditmenBerData.description" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="图片" :label-width="formLabelWidth" prop="memberImage">
             <div class="FlexWarp" >
                <div @click="SelectClick(3)"> <el-tag>未选中状态时显示图片</el-tag>
                    <el-upload class="avatar-uploader" :action="postUrl" :headers="token" :on-change="handleEditPreview"
                    :show-file-list="false"
                    :on-success="EditonSuccess"
                    :data="resData"
                    ref="Editupload"
                    :limit='1'>
                    <img v-if="EditmenBerData.memberImage" :src="EditmenBerData.memberImage" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div @click="SelectClick(4)"> <el-tag>未选中状态时显示图片</el-tag>
                    <el-upload class="avatar-uploader" :action="postUrl" :headers="token" :on-change="handleEditPreview"
                    :show-file-list="false"
                    :on-success="EditonSuccess"
                    :data="resData"
                    ref="OnEditupload"
                    :limit='1'>
                    <img v-if="EditmenBerData.selectImage" :src="EditmenBerData.selectImage" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
             </div>

            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="EditShow = false">取 消</el-button>
            <el-button type="primary" @click="editMenberLv">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--等级编辑-->
    </div>
</template>
<script>
import API from "@/api/member";
export default {
    props:{

    },
    watch:{
    },
    data () {
        return {
           AddShow:false,
           EditShow:false,
           token:{token:this.$cookie.get('token')},
           postUrl:window.SITE_CONFIG['baseUrl'] + '/advertisement/uploadFile/imageUpload',
           resData:{type:2},
           SelectIndex:0,
           addImgList:[],
           AddmenBerData:{
               memberImage:'',
               selectImage:''
           },
           EditmenBerData:{
               memberImage:'',
               selectImage:''
           },
           formLabelWidth:'120px',
           AddmenBerDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             defaultLv:[
                { required: true, message: '请选择是否为默认等级', trigger: 'blur' },
             ],
             discount:[
                { required: true, message: '请设置优惠折扣优惠大小', trigger: 'blur' },
             ],
             rank:[
                { required: true, message: '请设置等级大小', trigger: 'blur' },
             ],
             type:[
                { required: true, message: '请设置等级升级方式', trigger: 'blur' },
             ],
             upgradePoint:[
                { required: true, message: '请设置达到此等级的所需积分', trigger: 'blur' },
             ],
             givePoint:[
                { required: true, message: '请设置达到此等级赠送积分', trigger: 'blur' },
             ]
           },
           EditmenBerDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             defaultLv:[
                { required: true, message: '请选择是否为默认等级', trigger: 'blur' },
             ],
             discount:[
                { required: true, message: '请设置优惠折扣优惠大小', trigger: 'blur' },
             ],
             rank:[
                { required: true, message: '请设置等级大小', trigger: 'blur' },
             ],
             type:[
                { required: true, message: '请设置等级升级方式', trigger: 'blur' },
             ],
             upgradePoint:[
                { required: true, message: '请设置达到此等级的所需积分', trigger: 'blur' },
             ],
             givePoint:[
                { required: true, message: '请设置达到此等级赠送积分', trigger: 'blur' },
             ]
           }
        }
    },
    methods: {
        //添加用户的等级
        addMenberLv(){
            let that = this;
            API.addMenberLv(that.AddmenBerData).then(res => {
                if(res.code == 0){
                   that.$message({ message: '添加成功', type: 'success'});
                   that.$parent.GetMenberLvList();
                   that.AddShow = false
                   that.AddmenBerData = {}
                }else{
                   that.$message.error('添加失败');
                }
            }).catch(err => {})
        },

        //编辑用户等级
        editMenberLv(){
            let that = this;
            API.updataMenberLv(that.EditmenBerData).then(res => {
                if(res.code == 0){
                    that.$message({message:'编辑成功',type:'success'})
                    that.$parent.GetMenberLvList();
                    that.EditShow = false;
                }else{
                    that.$message.error('添加失败');                    
                }
            }).catch(err => {})
        },

        //选择上传
        SelectClick(index){
            console.log("选择上传：",index)
            this.SelectIndex = index
        },

        //图片上传
        handlePreview(file) {
            console.log("你好世界阿萨德",this.SelectIndex)
            if(this.SelectIndex == 1){
                this.$refs.upload.submit();
            }else if(this.SelectIndex == 2){
                this.$refs.ONupload.submit();
            }
        },
        onSuccess(res){
           if(res.code == 0){
                this.SelectIndex == 1 ? this.AddmenBerData.memberImage = res.url : this.AddmenBerData.selectImage = res.url
           }
        },


        handleEditPreview(file){
            if(this.SelectIndex == 3){
               this.$refs.Editupload.submit();
            }else if(this.SelectIndex == 4){
                this.$refs.OnEditupload.submit();  
            }

        },
        EditonSuccess(res){
           if(res.code == 0){
                this.SelectIndex == 3 ? this.EditmenBerData.memberImage = res.url : this.EditmenBerData.selectImage = res.url
           }           
        },

        //添加显示
        DiaLogShow(val){
            this.AddShow = val;
        },

        //编辑显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            row.defaultLv = row.defaultLv+''
            row.type = row.type+''
            this.EditmenBerData = Object.assign({},row);
            console.log(this.EditmenBerData,"你好世界阿萨德")
        }
    }
}
</script>
<style>
  .avatar-uploader .el-upload{
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .FlexWarp{display: flex;align-items: center;}
  .FlexWarp div{margin-right: 5px;}
</style>
