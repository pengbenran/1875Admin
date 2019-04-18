<template>
  <div class="kindAdv">
   <el-form ref="form" :model="setForm">
    <el-form-item label="今日爆品:" :label-width="formLabelWidth">
      <div class="avatar-uploaders" @click="ImgClick(1)">
        <img v-if="setForm.explosive" :src="setForm.explosive" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
      </div>
    </el-form-item>
     <el-form-item label="最新好物:" :label-width="formLabelWidth">
      <div class="avatar-uploaders1" @click="ImgClick(2)">
        <img v-if="setForm.favoriteFood" :src="setForm.favoriteFood" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon1" ></i>
      </div>
    </el-form-item>
     <el-form-item label="特别划算:" :label-width="formLabelWidth">
      <div class="avatar-uploaders1" @click="ImgClick(3)">
        <img v-if="setForm.costEffective" :src="setForm.costEffective" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon1" ></i>
      </div>
    </el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form>
   <!-- 图片裁剪 -->
   <uploadImg :proportion="proportion" :type="type" ref='UploadImg' @GetDataImg='GetDataImg'></uploadImg>
</div>
</template>

<script>
  import uploadImg from '@/components/UpLoadImg/UpLoadImg'
  import Api_adv from "@/api/adv"
  export default {
    data () {
      return {
       formLabelWidth: "120px",
       proportion: 0.59,
       type:3,
       btnloadingVisible: false,
       showCropper: false,
       setForm: {}, 
      index:'' 
      }
    },
    components: {uploadImg},
    mounted () {
    let that=this
    that.HomeBackGround()
    },
    methods: {
      onSubmit(){
        let that=this
        Api_adv.HomeBackGroundUpdate(that.setForm).then(function(res){
          if(res.code==0){
            that.$message.success({
              showClose: true,
              message: "操作成功",
              duration: 2000
            });
          }
        })
      },
      HomeBackGround(){
        let params={}
        params.type=2
        let that=this
        Api_adv.HomeBackGroundList(params).then(function(res){
          that.setForm=res.rows[0]
        })
      },
      ImgClick(index){
        let that=this
        that.index=index
        if(index==1){
          that.proportion=0.59
        }
        else{
          that.proportion=1.94
        }
        that.$refs.UploadImg.showDialog(true)
      },
      GetDataImg(ImgUrl){
        let that=this
        if(that.index==1){
          that.setForm.explosive=ImgUrl
        }
        else if(that.index==2){
          that.setForm.favoriteFood=ImgUrl
        }
        else{
          that.setForm.costEffective=ImgUrl
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
img{
  width: 100%;
  height: 100%;
  display: block;
}
.avatar-uploaders{
  width:133px;
  height: 225px;
  overflow: hidden;
}
  .avatar-uploader-icon{
  width:133px;
  height: 225px;
  line-height:225px;
  text-align: center;
  font-size: 18px;
  border:  1px solid #ddd;
}
.avatar-uploaders1{
  width:213px;
  height: 110px;
  overflow: hidden;
}
.avatar-uploader-icon1{
  width:213px;
  height: 110px;
  line-height:110px;
  text-align: center;
  font-size: 18px;
  border:  1px solid #ddd;
}
</style>