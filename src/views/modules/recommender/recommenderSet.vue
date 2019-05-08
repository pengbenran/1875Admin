<template>
  <div class="setting">
    <el-form ref="form" :model="setForm">
      <el-form-item label="分享师招募管理:">

        <el-form-item label="分销员审核" label-width="100px">
          <el-radio-group v-model="setForm.distributorStatus">
            <el-radio label="1">开启</el-radio>
            <el-radio label="2">关闭</el-radio>
          </el-radio-group>
          <el-form-item label="审核方式" v-if="setForm.distributorStatus==1">
            <el-radio-group v-model="setForm.distributorAuditWay">
              <el-radio label="1">自动审核</el-radio>
              <el-radio label="2">人工审核</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form-item>
      </el-form-item>
      <el-form-item label="积分抵扣" :label-width="formLabelWidth" prop="pointDeduction">
        <el-input v-model="setForm.pointDeduction" auto-complete="off" placeholder="请输入积分抵扣"></el-input>
      </el-form-item>
      <el-form-item label="海报个性标签:" :label-width="formLabelWidth" prop="postTage">
        <el-input v-model="setForm.postTage" auto-complete="off" placeholder="请输入海报标签名称"></el-input>
      </el-form-item>
      <el-form-item label="标签字体颜色:" :label-width="formLabelWidth" prop="tageFont">
        <div class="block">
          <el-color-picker v-model="setForm.tageFont"></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="海报背景颜色:" :label-width="formLabelWidth" prop="postBackgroud">
        <div class="block">
          <el-color-picker v-model="setForm.postBackgroud"></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="海报字体颜色:" :label-width="formLabelWidth" prop="postFont">
        <div class="block">
          <el-color-picker v-model="setForm.postFont"></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="推荐师分享海报:" :label-width="formLabelWidth" prop="distributorPoster">
        <div class="avatar-uploaders" @click="UpLoadShow(2,1)">
          <img v-if="setForm.distributorPoster" :src="setForm.distributorPoster" class="avatar"  style="width:200px;height:200px;">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </el-form-item>
      <el-form-item label="订单过期时间:" :label-width="formLabelWidth" prop="expireTime">
        <el-input v-model="setForm.expireTime" auto-complete="off" placeholder="请输入订单过期时间" style="width:220px">
          <template slot="append">天</template>
        </el-input>
      </el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </el-form>
<uploadImg :proportion="proportion"  ref='UploadImg' @GetDataImg='GetDataImg'></uploadImg>
</div> 
</template>

<script>
import API from "@/api/member";
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
        distributorPoster:''
      },
      inputWidth:'120px',
      upOptions:[]
    }
  },
  mounted() {
      this.$set(this.setForm,'distributorAuditWay','');
      this.$set(this.setForm,'distributorStatus','');
     this.getdistribeConfig();
  },
  components: { uploadImg},
  methods: {
     // 获取推荐师设置
    getdistribeConfig: function() {
      let that = this;
      API.DistributorConfigInfo().then(res => {
        console.log("成功返回的数据",res)
        if(res.code == 0){
          that.setForm = res.globalConfigEntity;
          that.setForm.distributorAuditWay = that.setForm.distributorAuditWay + '';
          that.setForm.distributorStatus = that.setForm.distributorStatus + ''
        }else{
            that.$message.error('获取失败');     
        }
      }).catch(err => {
        that.$message.error('获取失败');     
      })
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
      API.DistributorConfigUpdata(this.setForm).then(result => {
        if (result.code == 0) {
          that.loading = false;
          that.$message.success({
            showClose: true,
            message: "修改成功",
            duration: 2000
          });
        }
      });
    },

      //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:轮播图时修改指定图片的下标
      UpLoadShow(type,proportion,IMAGE_iNDEX){
          this.ImgType = type;
          this.proportion = proportion;
          IMAGE_iNDEX != undefined ? this.imageIndex = IMAGE_iNDEX : this.imageIndex = undefined
          this.$refs.UploadImg.showDialog(true)
      },

      GetDataImg(ImgUrl){
        let that=this
        that.setForm.distributorPoster=ImgUrl
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
