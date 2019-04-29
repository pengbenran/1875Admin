<template>
  <div class="mod-demo-ueditor">

    <script :id="ueId" class="ueditor-box" type="text/plain" style="width: 100%; height: 260px;"></script>
    
    <!-- 获取内容 -->
    <!-- <p><el-button @click="getContent()">获得内容</el-button></p> -->
    <el-dialog
      title="内容"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      {{ ueContent }}
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ueditor from 'ueditor'
  export default {
    props:{
        Value:{
          type:String,
          default:''
        }
    },
    
    data () {
      return {
        postUrl:window.SITE_CONFIG['baseUrl'] + '/advertisement/uploadFile/imageUpload',
        ue: null,
        ueId: `J_ueditorBox_${new Date().getTime()}`,
        ueContent: '',
        dialogVisible: false
      }
    },
    mounted () {
      let that = this;
      console.log("你好路径",that.postUrl)
      this.ue = ueditor.getEditor(this.ueId, {
        serverUrl: that.postUrl, // 服务器统一请求接口路径
        zIndex: 3000
      })
      
    },
    methods: {
      getContent () {
        this.ue.ready(() => {
          this.ueContent = this.ue.getContent()
          this.$emit('Set_Content',this.ue.getContent())
        })
      },

      setContent(data){
        this.ue.ready(() => {
          this.ue.setContent(data);
        })
      }
    }
  }
</script>

<style lang="scss">
  .mod-demo-ueditor {
    position: relative;
    z-index: 510;
    > .el-alert {
      margin-bottom: 10px;
    }
  }
</style>
