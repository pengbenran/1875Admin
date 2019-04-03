<template>
  <div class="modal-dialog modal-lg" :id="id">
    <div class="modal-content">
      <form class="avatar-form"  enctype="multipart/form-data" method="post">
        <div class="modal-header">
        </div>
        <div class="modal-body">
          <div class="avatar-body">
            <!-- Upload image and data -->
            <div class="avatar-upload">
              <input type="hidden" class="avatar-src" name="avatar_src">
              <input type="hidden" class="avatar-data" name="ci">
              <label for="avatarInput" class="el-button el-button--primary">选择图片</label>
    
              <input type="file" class="avatar-input " style="visibility: hidden" id="avatarInput" name="file">
            </div>

            <!-- Crop and preview -->
            <el-row>
              <el-col :span="18">
                <div class="avatar-wrapper"></div>
              </el-col>
              <el-col :span="6" style="overflow: hidden;">
                <div style="padding-left: 10px">
                  <div class="avatar-preview preview-lg" ></div>
                  <div class="avatar-preview avatar-preview-round preview-md"></div>
                <!--<div class="avatar-preview preview-sm"></div>-->
                </div>
              </el-col>

            </el-row>
            <el-row class="avatar-btns">
              <el-col :span="18">
                <el-button-group>
                  <!-- <button type="primary" class="el-button el-button--primary"  data-method="rotate" data-option="-180" title="Rotate -180 degrees">-180deg</button>
                  <button type="primary" class="el-button el-button--primary"  data-method="rotate" data-option="-90" title="Rotate -90 degrees">-90deg</button>
                  <button type="primary" class="el-button el-button--primary"   data-method="rotate" data-option="-45" title="Rotate -45 degrees">-45deg</button>
                  <button type="primary" class="el-button el-button--primary"  data-method="rotate" data-option="45" title="Rotate 45 degrees">45deg</button>
                  <button type="primary" class="el-button el-button--primary"  data-method="rotate" data-option="90" title="Rotate 90 degrees">90deg</button>
                  <button type="primary" class="el-button el-button--primary"  data-method="rotate" data-option="180" title="Rotate 180 degrees">180deg</button> -->
                </el-button-group>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row>
              <!-- <button type="submit" class="btn btn-primary btn-block avatar-save">裁取</button> -->
            </el-row>
          </div>
        </div>
      </form>
      <!-- <div class="btnWarp">
          <el-button type="success">比例：16:9</el-button>
          <el-button type="success">比例：1:1</el-button>
      </div> -->
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import 'cropper/dist/cropper.js'
  import Api_img from "@/api/api_lib"
  export default {

    props:{
      id:String,
      proportion:Number,
      type:{
        type:Number,
        default:1
      }
    },
    data(){
      return {
        $container:null,
        $avatarView:null,
        $avatarModal : null,
        $loading : null,
        $avatarForm : null,
        $avatarUpload : null,
        $avatarSrc : null,
        $avatarData : null,
        $avatarInput : null,
        $avatarSave: null,
        $avatarBtns : null,
        $avatarWrapper : null,
        $avatarPreview: null,
        support: {
        fileList: !!$('<input type="file">').prop('files'),
          blobURLs: !!window.URL && URL.createObjectURL,
          formData: !!window.FormData
        }
     }
    },
    watch:{
      proportion:function(newVal,oldVal){
        
        this.proportion = newVal
      
     this.$img.cropper('setAspectRatio',this.proportion)
      }
    },
    created(){ },
    mounted(){
        this.$container = $('#'+this.id);
        this.$avatarForm = this.$container.find('.avatar-form');
        this.$avatarUpload = this.$avatarForm.find('.avatar-upload');
        this.$avatarSrc = this.$avatarForm.find('.avatar-src');
        this.$avatarData = this.$avatarForm.find('.avatar-data');
        this.$avatarInput = this.$avatarForm.find('.avatar-input');
        this.$avatarSave = this.$avatarForm.find('.avatar-save');
        this.$avatarWrapper = this.$container.find('.avatar-wrapper');
        this.$avatarPreview = this.$container.find('.avatar-preview');
        this.$avatarBtns = this.$container.find('.avatar-btns');
        this.$asd123 = this.$container.find('.asd123');

        this.$nextTick(function () {
          this.init();
        })
    },
    methods:{


      init: function () {
        this.support.datauri = this.support.fileList && this.support.blobURLs;
        this.addListener();
       // this.startCropper();
      },

      addListener: function () {
        this.$avatarInput.on('change', $.proxy(this.change, this));
        this.$avatarForm.on('submit', $.proxy(this.submit, this));
        this.$avatarBtns.on('click', $.proxy(this.rotate, this));
         this.$asd123.on('click', $.proxy(this.reset, this));
        // this.$avatarBtns.on('click', $.proxy(this.proportion, this));
      },
      initPreview: function () {
        var url = this.$avatar.attr('src');
        this.$avatarPreview.html('<img src="' + url + '">');
      },

      initIframe: function () {
        var target = 'upload-iframe-' + (new Date()).getTime();
        var $iframe = $('<iframe>').attr({
          name: target,
          src: ''
        });
        var _this = this;

        // Ready ifrmae
        $iframe.one('load', function () {

          // respond response
          $iframe.on('load', function () {
            var data;

            try {
              data = $(this).contents().find('body').text();
            } catch (e) {
              console.log(e.message);
            }
            if (data) {
              try {
                data = $.parseJSON(data);
              } catch (e) {
                console.log(e.message);
              }

              _this.submitDone(data);
            } else {
            }

            _this.submitEnd();

          });
        });

        this.$iframe = $iframe;
        this.$avatarForm.attr('target', target).after($iframe.hide());
      },
      click:function () {
        this.initPreview();
      },
      change: function () {
        var files;
        var file;
        if (this.support.datauri) {
          files = this.$avatarInput.prop('files');
          console.log()
          if (files.length > 0) {
            file = files[0];
            if (this.isImageFile(file)) {
              if (this.url) {
                URL.revokeObjectURL(this.url); // Revoke the old one
              }
              this.url = URL.createObjectURL(file);
              this.startCropper();
            }
          }
        } else {
          file = this.$avatarInput.val();
          if (this.isImageFile(file)) {
            this.syncUpload();
          }
        }
      },
      //裁剪提交
      submit: function () {
        if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
          return false;
        }
        if (this.support.formData) {
          this.ajaxUpload();            
          return false;
        }
      },
      // proportion:function(e){
      //  var data;
      //   if (this.active) {
      //     data = $(e.target).data();
      //     console.log(data)
      //     if (data.method) {
      //       this.$img.cropper(data.method, data.option);
      //     }
      //   }
      // },
      //旋转事件
      rotate: function (e) {
        var data;
        if (this.active) {
          data = $(e.target).data();
           console.log(data)
          if (data.method) {
            this.$img.cropper(data.method, data.option);
          }
        }
      },
      isImageFile: function (file) {
        if (file.type) {
          return /^image\/\w+$/.test(file.type);
        } else {
          return /\.(jpg|jpeg|png|gif)$/.test(file);
        }
      },

      startCropper: function () {
        var _this = this;

        if (this.active) {
          this.$img.cropper('replace', this.url);
        } else {
          this.$img = $(`<img src= ${this.url}>`);
          this.$avatarWrapper.empty().html(this.$img);
          console.log(_this.propor,_this.proportion,"asdas456")
          this.$img.cropper({
            viewMode:1,
            aspectRatio:_this.proportion,
            preview: this.$avatarPreview,
            restore:false,
            crop: function (e) {
              var json = [
                '{"x":' + e.detail.x,
                '"y":' + e.detail.y,
                '"height":' + e.detail.height,
                '"width":' + e.detail.width,
                '"rotate":' + e.detail.rotate + '}'
              ].join();
               //裁图参数存起来
              _this.$avatarData.val(json);
              console.log("获取参数",json)
            }
          });
          // var cas=this.$img.cropper('getCroppedCanvas')
          // console.log(cas.toDataURL('image/jpeg'));
          this.active = true;
        }


      },

      stopCropper: function () {
        if (this.active) {
          this.$img.cropper('destroy');
          this.$img.remove();
          this.active = false;
        }
      },

      ajaxUpload: function () {
        var _this = this;
        // var url = 'http://192.168.2.131:8080/oss/getBase64Url';
        var data = new FormData();
        var imgData=_this.$img.cropper('getCroppedCanvas')
        var dataurl = imgData.toDataURL('image/jpeg');
        // console.log(dataurl);
        // dataurl=dataurl.split(',')[1];
        // dataurl=window.atob(dataurl);
        // var ia = new Uint8Array(dataurl.length);
        // for (var i = 0; i < data.length; i++) {
        //   ia[i] = dataurl.charCodeAt(i);
        // };
        // var blob=new Blob([ia], {type:"image/png"});

        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        var imgFile=new File([u8arr], 'aa.jpg', {type:mime});
        console.log("查看这些个数据",this.proportion,this.type)
        data.append('file',imgFile)      
        data.append('type',this.type)
        if(imgFile.size/1024 < 650){
          Api_img.imageUpload(data).catch(err => {
            this.$notify.error({
              title:'上传失败',
              message:'上传失败请重新上传'
            })
            _this.$emit('cropper-success',err);
          }).then(function(res){
            _this.$emit('cropper-success',res);
          })
        }else{
          this.$notify.error({
            title:'错误',
            message:'截取的图片过大超过650kb'
          })
          _this.$emit('cropper-success',undefined);
        }

        // $.ajax(url, {
        //   type: 'post',
        //   data: data,
        //   dataType: 'json',
        //   headers:{'Authorization':window.localStorage.getItem('access-token')},
        //   processData: false,
        //   contentType: false,
        //   success: function (res) {
        //        if(res.code == 0){
        //           console.log(res,"你好世界")
        //           _this.$emit('cropper-success',res);
        //        }
        //     // _this.submitDone(data);
        //     // if(data.success){
        //     //   //将返回的数据传给父组件
        //     //   _this.$emit('cropper-success',data.data);
        //     //   _this.cropDone();
        //     // }
        //   },
        // });
      },
      syncUpload: function () {
        this.$avatarSave.click();
      },
      submitDone: function (data) {
        if ($.isPlainObject(data) && data.state === 200) {
          if (data.result) {
            this.url = data.result;
            if (this.support.datauri || this.uploaded) {
              this.uploaded = false;
              this.cropDone();
            } else {
              this.uploaded = true;
              this.$avatarSrc.val(this.url);
              this.startCropper();
            }

            this.$avatarInput.val('');
          } else if (data.message) {
          }
        } else {
        }
      },
      cropDone: function () {
//        this.$avatarForm.get(0).reset();
//        this.$avatarSrc.prop('src', this.url);
          this.stopCropper();
//        this.$container.hide();
      }

    }

  }
</script>

<style>
  /*@import "cropper/dist/cropper.css";*/
  /*!
 * Cropper v3.1.3
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright (c) 2014-2017 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2017-10-21T10:03:37.133Z
 */
  .avatar-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .cropper-container {
    direction: ltr;
    font-size: 0;
    line-height: 0;
    position: relative;
    -ms-touch-action: none;
    touch-action: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .cropper-container img {/*Avoid margin top issue (Occur only when margin-top <= -height)
 */
    display: block;
    height: 100%;
    image-orientation: 0deg;
    max-height: none !important;
    max-width: none !important;
    min-height: 0 !important;
    min-width: 0 !important;
    width: 100%;
  }

  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-drag-box,
  .cropper-crop-box,
  .cropper-modal {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .cropper-wrap-box,
  .cropper-canvas {
    overflow: hidden;
  }

  .cropper-drag-box {
    background-color: #fff;
    opacity: 0;
  }

  .cropper-modal {
    background-color: #000;
    opacity: .5;
  }

  .cropper-view-box {
    display: block;
    height: 100%;
    outline-color: rgba(51, 153, 255, 0.75);
    outline: 1px solid #39f;
    overflow: hidden;
    width: 100%;
  }

  .cropper-dashed {
    border: 0 dashed #eee;
    display: block;
    opacity: .5;
    position: absolute;
  }

  .cropper-dashed.dashed-h {
    border-bottom-width: 1px;
    border-top-width: 1px;
    height: 33.33333%;
    left: 0;
    top: 33.33333%;
    width: 100%;
  }

  .cropper-dashed.dashed-v {
    border-left-width: 1px;
    border-right-width: 1px;
    height: 100%;
    left: 33.33333%;
    top: 0;
    width: 33.33333%;
  }

  .cropper-center {
    display: block;
    height: 0;
    left: 50%;
    opacity: .75;
    position: absolute;
    top: 50%;
    width: 0;
  }

  .cropper-center:before,
  .cropper-center:after {
    background-color: #eee;
    content: ' ';
    display: block;
    position: absolute;
  }

  .cropper-center:before {
    height: 1px;
    left: -3px;
    top: 0;
    width: 7px;
  }

  .cropper-center:after {
    height: 7px;
    left: 0;
    top: -3px;
    width: 1px;
  }

  .cropper-face,
  .cropper-line,
  .cropper-point {
    display: block;
    height: 100%;
    opacity: .1;
    position: absolute;
    width: 100%;
  }

  .cropper-face {
    background-color: #fff;
    left: 0;
    top: 0;
  }

  .cropper-line {
    background-color: #39f;
  }

  .cropper-line.line-e {
    cursor: e-resize;
    right: -3px;
    top: 0;
    width: 5px;
  }

  .cropper-line.line-n {
    cursor: n-resize;
    height: 5px;
    left: 0;
    top: -3px;
  }

  .cropper-line.line-w {
    cursor: w-resize;
    left: -3px;
    top: 0;
    width: 5px;
  }

  .cropper-line.line-s {
    bottom: -3px;
    cursor: s-resize;
    height: 5px;
    left: 0;
  }

  .cropper-point {
    background-color: #39f;
    height: 5px;
    opacity: .75;
    width: 5px;
  }

  .cropper-point.point-e {
    cursor: e-resize;
    margin-top: -3px;
    right: -3px;
    top: 50%;
  }

  .cropper-point.point-n {
    cursor: n-resize;
    left: 50%;
    margin-left: -3px;
    top: -3px;
  }

  .cropper-point.point-w {
    cursor: w-resize;
    left: -3px;
    margin-top: -3px;
    top: 50%;
  }

  .cropper-point.point-s {
    bottom: -3px;
    cursor: s-resize;
    left: 50%;
    margin-left: -3px;
  }

  .cropper-point.point-ne {
    cursor: ne-resize;
    right: -3px;
    top: -3px;
  }

  .cropper-point.point-nw {
    cursor: nw-resize;
    left: -3px;
    top: -3px;
  }

  .cropper-point.point-sw {
    bottom: -3px;
    cursor: sw-resize;
    left: -3px;
  }

  .cropper-point.point-se {
    bottom: -3px;
    cursor: se-resize;
    height: 20px;
    opacity: 1;
    right: -3px;
    width: 20px;
  }

  @media (min-width: 768px) {
    .cropper-point.point-se {
      height: 15px;
      width: 15px;
    }
  }

  @media (min-width: 992px) {
    .cropper-point.point-se {
      height: 10px;
      width: 10px;
    }
  }

  @media (min-width: 1200px) {
    .cropper-point.point-se {
      height: 5px;
      opacity: .75;
      width: 5px;
    }
  }

  .cropper-point.point-se:before {
    background-color: #39f;
    bottom: -50%;
    content: ' ';
    display: block;
    height: 200%;
    opacity: 0;
    position: absolute;
    right: -50%;
    width: 200%;
  }

  .cropper-invisible {
    opacity: 0;
  }

  .cropper-bg {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }

  .cropper-hide {
    display: block;
    height: 0;
    position: absolute;
    width: 0;
  }

  .cropper-hidden {
    display: none !important;
  }

  .cropper-move {
    cursor: move;
  }

  .cropper-crop {
    cursor: crosshair;
  }

  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }

  .avatar-view {
    display: block;
    margin: 15% auto 5%;
    height: 220px;
    width: 220px;
    border: 3px solid #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,.15);
    cursor: pointer;
    overflow: hidden;
  }

  .avatar-view img {
    width: 100%;
  }

  .avatar-body {
    padding-right: 15px;
    padding-left: 15px;
  }

  .avatar-upload {
    overflow: hidden;
  }

  .avatar-upload label {
    display: block;
    float: left;
    clear: left;
    width: 100px;
  }

  .avatar-upload input {
    display: block;
    margin-left: 110px;
  }

  .avatar-alert {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .avatar-wrapper {
    height: 364px;
    width: 100%;
    margin-top: 15px;
    box-shadow: inset 0 0 5px rgba(0,0,0,.25);
    background-color: #fcfcfc;
    overflow: hidden;
  }

  .avatar-wrapper img {
    display: block;
    height: auto;
    max-width: 100%;
  }

  .avatar-preview {
    float: left;
    margin-top: 15px;
    margin-right: 15px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
  }

  .avatar-preview:hover {
    border-color: #ccf;
    box-shadow: 0 0 5px rgba(0,0,0,.15);
  }

  .avatar-preview img {
    width: 100%;
  }

  .avatar-preview-round{
    border-radius: 50%;
  }
  .preview-lg {
    height: 184px;
    width: 184px;
    margin-top: 15px;
  }

  .preview-md {
    height: 100px;
    width: 100px;
  }

  .preview-sm {
    height: 50px;
    width: 50px;
  }

  @media (min-width: 992px) {
    .avatar-preview {
      float: none;
    }
  }

  .avatar-btns {
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .avatar-btns .btn-group {
    margin-right: 5px;
  }

</style>