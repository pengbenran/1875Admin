<template>
  <div class="setting">
    <el-form ref="form" :model="setForm">
      <el-form-item label="推荐师招募管理:">
        <el-radio-group v-model="setForm.whetherRecruit">
          <el-radio label="1">开启</el-radio>
          <el-radio label="2">关闭</el-radio>
        </el-radio-group>
        <el-form-item label="分销员审核" v-if="setForm.whetherRecruit==1" label-width="100px">
          <el-radio-group v-model="setForm.whetherAudit">
            <el-radio label="1">开启</el-radio>
            <el-radio label="2">关闭</el-radio>
          </el-radio-group>
          <el-form-item label="审核方式" v-if="setForm.whetherAudit==1">
            <el-radio-group v-model="setForm.auditWay">
              <el-radio label="1">自动审核</el-radio>
              <el-radio label="2">人工审核</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form-item>
      </el-form-item>
      <el-form-item label="海报个性标签:" :label-width="formLabelWidth" prop="labelName">
        <el-input v-model="setForm.labelName" auto-complete="off" placeholder="请输入海报标签名称"></el-input>
      </el-form-item>
      <el-form-item label="标签字体颜色:" :label-width="formLabelWidth">
        <div class="block">
          <el-color-picker v-model="setForm.labelColor"></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="海报背景颜色:" :label-width="formLabelWidth">
        <div class="block">
          <el-color-picker v-model="setForm.bcgColor"></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="海报字体颜色:" :label-width="formLabelWidth">
        <div class="block">
          <el-color-picker v-model="setForm.fontColor"></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="推荐师分享海报:" :label-width="formLabelWidth">
        <div class="avatar-uploaders" @click="ImgClick">
          <img v-if="setForm.column15" :src="setForm.column15" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </el-form>
<uploadImg :proportion="proportion"  ref='UploadImg' @GetDataImg='GetDataImg'></uploadImg>
</div> 
</template>

<script>
// import API from "@/api/api_user";
import uploadImg from '@/components/UpLoadImg/UpLoadImg'
export default {
  name: 'setting',
  props: [],
  data() {
    return {
     proportion: 1,
     formLabelWidth: "120px",
     btnloadingVisible: false,
     showCropper: false,
     setForm: {
        whetherInvite: "1",
        whetherRecruit: "1",
        whetherAudit: "1",
        auditWay: "2",
        column15: ""
      },
      inputWidth:'120px',
      upOptions:[]
    }
  },
  mounted() {
    
  },
  components: { uploadImg},
  methods: {
     // 获取推荐师设置
    getdistribeConfig: function() {
      let that = this;
      // API.getDistribeConfig().then(result => {
      //   result.DistribeConfigDO.whetherInvite = result.DistribeConfigDO.whetherInvite.toString();
      //   result.DistribeConfigDO.whetherRecruit = result.DistribeConfigDO.whetherRecruit.toString();
      //   result.DistribeConfigDO.whetherAudit = result.DistribeConfigDO.whetherAudit.toString();
      //   result.DistribeConfigDO.auditWay = result.DistribeConfigDO.auditWay.toString();
      //   that.setForm = result.DistribeConfigDO;
      //   that.upOptions = result.DistribeConfigDO.column19.split(',').map(v=>{
      //     return parseInt(v);
      //   });
      // });
    },
     //隐藏裁剪框
    cancelCropper() {
      this.showCropper = false;
      this.$refs.cropper.cropDone();
    },
    //父组件调用子组件裁剪方法
    toCropper() {
      this.btnloadingVisible = true;
      this.$refs.cropper.submit();
    },
    onSubmit: function() {
      let that = this;
      this.setForm.column19 = that.upOptions.join(',')
      that.loading = true;
    //   API.updateDistribeConfig(this.setForm).then(result => {
    //     if (result.code == 0) {
    //       that.loading = false;
    //       that.$message.success({
    //         showClose: true,
    //         message: "修改成功",
    //         duration: 2000
    //       });
    //     }
    //   });
    },
    ImgClick() {
      let that = this;
      this.showCropper = true;
    },
    GetDataImg(ImgUrl){
      let that=this
      // that.addFrom.url=ImgUrl
      // that.editFrom.url = ImgUrl
    }, 
    //子组件裁剪方法成功执行后与父组件通信
    cropperSuccessHandle(data) {
      //返回data
      this.btnloadingVisible = false;
      this.showCropper = false;
      this.setForm.column15 = data.msg;
    },
  }
}
</script>

<style scoped>
 .avatar-uploader-icon{
  width:200px;
  height: 200px;
  line-height:200px;
  text-align: center;
  font-size: 18px;
  border:  1px solid #ddd;
}
</style>
