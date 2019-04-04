<template>
    <div>
        <div class="app-main-content" >
            <el-dialog :visible.sync="showCropper" title="封面裁图" width="70%">
            <cropper id="avatarCrop" ref="cropper" @cropper-success="cropperSuccessHandle" :proportion="proportion" :type='type'></cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCropper">取 消</el-button>
                    <el-button type="primary" @click="toCropper" :disabled='loading'><i class="el-icon-loading" v-if="loading" ></i> 确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!--图片上传 end-->
    </div>
</template>
<script>
import cropper from "@/components/Cropper";
import { mapActions } from "vuex";
export default {
    components:{cropper},
    props:{
        proportion:{
            type:Number,
            default:1
        },
        type:{
            type:Number,
            default:1
        }
    },
    data () {
        return {
            showCropper:false,
            loading:false
        }
    },
    mounted () {
     
    },
    methods: {
      ...mapActions('good',['Set_thumbnailValue']),
      toCropper(){
         this.loading = true
         this.$refs.cropper.submit();
      },

      //子组件裁剪方法成功执行后与父组件通信
      cropperSuccessHandle(data){
         //返回data
        this.showCropper = false;
        this.loading = false;
        if(data.code == 0){
          this.$emit('GetDataImg',data.url)
        }
      },
      
      //隐藏
      cancelCropper(){
        this.showCropper = false;
      },
      
      //显示
      showDialog(val){
        this.showCropper = val;
      }
    }
}
</script>
<style scoped>

</style>
