
<template>
<!--用户等级新增,编辑分离-->
    <div>
    <section>
        <el-dialog title="新增" :visible.sync="AddShow">
        <el-form :model="AddDistributorData"  :rules="AddDistributorrules">
            <el-form-item label="等级名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddDistributorData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="默认等级" :label-width="formLabelWidth"  prop="defaultStatus">
                <el-radio v-model="AddDistributorData.defaultStatus" label="1">是</el-radio>
                <el-radio v-model="AddDistributorData.defaultStatus" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="升级所需人数" :label-width="formLabelWidth" prop="inviteNumber">
                <el-input type="number" v-model="AddDistributorData.inviteNumber" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：设置升级需要多少人" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="分享师权重" :label-width="formLabelWidth" prop="weight">
                <el-input type="number" v-model="AddDistributorData.weight" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：设置越大代表等级越高" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="权益" :label-width="formLabelWidth" prop="description">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="AddDistributorData.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth" prop="distributorImage">
            <div class="FlexWarp">
                <div  @click="SelectClick(1)"><el-tag>未选中状态时显示图片</el-tag>
                    <el-upload class="avatar-uploader" :action="postUrl" :headers="token" :on-change="handlePreview"
                    :show-file-list="false"
                    :on-success="onSuccess"
                    :data="resData"
                    ref="upload"
                    :limit='1'>
                        <img v-if="AddDistributorData.distributorImage" :src="AddDistributorData.distributorImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div  @click="SelectClick(2)"> <el-tag>选中状态时显示图片</el-tag>
                    <el-upload class="avatar-uploader" :action="postUrl" :headers="token" :on-change="handlePreview"
                    :show-file-list="false"
                    :on-success="onSuccess"
                    :data="resData"
                    ref="ONupload"
                    :limit='1'>
                        <img v-if="AddDistributorData.selectImage" :src="AddDistributorData.selectImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    
                </div>
            </div>

            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AddShow = false">取 消</el-button>
            <el-button type="primary" @click="addDistributorLv">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--等级添加-->

    <section>
        <el-dialog title="编辑" :visible.sync="EditShow">
        <el-form :model="EditDistributorData"  :rules="EditDistributorDatarules">
            <el-form-item label="等级名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="EditDistributorData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="默认等级" :label-width="formLabelWidth"  prop="defaultStatus">
                <el-radio v-model="EditDistributorData.defaultStatus" label="1">是</el-radio>
                <el-radio v-model="EditDistributorData.defaultStatus" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="升级所需人数" :label-width="formLabelWidth" prop="inviteNumber">
                <el-input v-model="EditDistributorData.inviteNumber" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：设置升级需要多少人" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="分享师权重" :label-width="formLabelWidth" prop="weight">
                <el-input v-model="EditDistributorData.weight" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：设置越大代表等级越高" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="权益" :label-width="formLabelWidth" prop="description">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="EditDistributorData.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth" prop="distributorImage">
             <div class="FlexWarp">
                 <div @click="SelectClick(3)"><el-tag>未选中状态时显示图片</el-tag>
                        <el-upload class="avatar-uploader" :action="postUrl" :headers="token" :on-change="handleEditPreview"
                        :show-file-list="false"
                        :on-success="EditonSuccess"
                        :data="resData"
                        ref="Editupload"
                        :limit='1'>
                            <img v-if="EditDistributorData.distributorImage" :src="EditDistributorData.distributorImage" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                 </div>
                 <div @click="SelectClick(4)"><el-tag>未选中状态时显示图片</el-tag>
                        <el-upload class="avatar-uploader" :action="postUrl" :headers="token" :on-change="handleEditPreview"
                        :show-file-list="false"
                        :on-success="EditonSuccess"
                        :data="resData"
                        ref="OnEditupload"
                        :limit='1'>
                            <img v-if="EditDistributorData.selectImage" :src="EditDistributorData.selectImage" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                 </div>
             </div>

            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="EditShow = false">取 消</el-button>
            <el-button type="primary" @click="editDistributorLv">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--等级编辑-->
    </div>
</template>
<script>
import API from "@/api/member";
import Vue from 'vue';
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
           SelectIndex:0,
           AddDistributorData:{
               distributorImage:'',
               selectImage:''
           },
           EditDistributorData:{
               distributorImage:'',
               selectImage:''
           },
           formLabelWidth:'120px',
           resData:{type:2},
           AddDistributorrules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             defaultStatus:[
                { required: true, message: '请选择是否为默认等级', trigger: 'blur' },
             ],
             inviteNumber:[
                { required: true, message: '请设置升级人数', trigger: 'blur' },
             ],
             weight:[
                { required: true, message: '请设置推荐师权重', trigger: 'blur' },
             ],
             description:[
                { required: true, message: '请设置权益', trigger: 'blur' },
             ],
             distributorImage:[
                { required: true, message: '请设置图片', trigger: 'blur' },
             ]
           },
           EditDistributorDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             defaultStatus:[
                { required: true, message: '请选择是否为默认等级', trigger: 'blur' },
             ],
             inviteNumber:[
                { required: true, message: '请设置升级人数', trigger: 'blur' },
             ],
             weight:[
                { required: true, message: '请设置推荐师权重', trigger: 'blur' },
             ],
             description:[
                { required: true, message: '请设置权益', trigger: 'blur' },
             ],
             distributorImage:[
                { required: true, message: '请设置图片', trigger: 'blur' },
             ]
           }
        }
    },
    methods: {
        //添加用户的等级
        addDistributorLv(){
            let that = this;
            API.addDistributorLvList(that.AddDistributorData).then(res => {
                if(res.code == 0){
                   that.$message({ message: '添加成功', type: 'success'});
                   that.$parent.GetDistributorLvList();
                   that.AddDistributorData = {}
                }else{
                   that.$message.error('添加失败');
                }
                that.AddShow = false
            }).catch(err => {})
        },

        //编辑用户等级
        editDistributorLv(){
            let that = this;
            API.updataDistributor(that.EditDistributorData).then(res => {
                if(res.code == 0){
                    that.$message({message:'编辑成功',type:'success'})
                    that.$parent.GetDistributorLvList();
                }else{
                    that.$message.error('添加失败');                    
                }
                that.EditShow = false;
            }).catch(err => {})
        },
        
        //选择上传
        SelectClick(index){
            this.SelectIndex = index;
        },

        //添加显示
        DiaLogShow(val){
            this.AddShow = val;
        },

        handlePreview(file) {
          if(this.SelectIndex == 1){
             this.$refs.upload.submit();
          }else if(this.SelectIndex == 2){
              this.$refs.ONupload.submit(); 
          }

        },

        onSuccess(res){
           if(res.code == 0){
               this.SelectIndex == 1 ? this.AddDistributorData.distributorImage = res.url: this.AddDistributorData.selectImage = res.url
           }
        },

        handleEditPreview(){
          if(this.SelectIndex == 3){
                 this.$refs.Editupload.submit();
          }else if(this.SelectIndex == 4){
                 this.$refs.OnEditupload.submit();
          }
        },
        EditonSuccess(res){
           if(res.code == 0){
              this.SelectIndex == 3 ?  this.EditDistributorData.distributorImage = res.url : this.EditDistributorData.selectImage = res.url
           }     
        },

        //编辑显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            row.defaultStatus = row.defaultStatus+''
            this.EditDistributorData = Object.assign({},row);
            console.log(this.EditDistributorData,"你好世界阿萨德")
        }
    }
}
</script>
<style >
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
