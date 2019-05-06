<template>
    <div>
        <el-dialog title="地址选择" :visible.sync="outerVisible">
        <el-row>
            <el-col :span="18">
                <el-input v-model="inputS" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="6"><el-button type="success" round @click="SeachClick()">搜索</el-button></el-col>
        </el-row>
            <div id="map" style="width:100%;height:500px;"></div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">取 消</el-button>
            <el-button type="primary" @click="GetMapData">确定</el-button>
        </div>  
        </el-dialog>

    </div>
</template>

<script>
import { QqMap } from '@/utils/index'
import axios from 'axios'

    export default {
        data () {
            return {
                outerVisible: false,
                mapBool:true,
                inputS:'',
                MapData:'',
                longitude:39.916527,//经度
                latitude:116.397128//纬度
            }
        },
        mounted() {

        },
        methods:{
              //第一部分
              //定位获得当前位置信息
            getMyLocation() {
                let that = this;
                var geolocation = new qq.maps.Geolocation("5AGBZ-6ZLCX-G734A-ZZDIF-VNDFQ-GHFY2", "1875圈项目使用Key");
                geolocation.getIpLocation(that.showPosition, that.showErr);
         
            },

            showPosition(position) {
                this.latitude = position.lat;
                this.longitude = position.lng;
                this.city = position.city;
                this.init();
            },

            showErr() {
                this.getMyLocation();//定位失败再请求定位，测试使用
            },

            init() {
                let that = this;
                window.init =function () {
                    var center = new window.qq.maps.LatLng(that.latitude,that.longitude);
                    var map =new window.qq.maps.Map(document.getElementById('map'), {
                        // 地图的中心地理坐标。
                        zoom: 13,  
                        center:center
                        })

                    var marker = new window.qq.maps.Marker({
                        position: center,
                        map:map
                    });
                    //跟随鼠标的点击事件。
                    window.qq.maps.event.addListener(map,'click',function(event){
                        this.longitude = event.latLng.getLat();
                        this.latitude = event.latLng.getLng();

                        //设置标点的位置。
                        var marker = new window.qq.maps.Marker({
                            position: event.latLng,
                            map:map
                        });
                        qq.maps.event.addListener(map, 'click', function(event) {
                            marker.setMap(null);      
                        });
                        //你解析获取地址信息
                        that.GetWebServerMapInfo(event.latLng)

                    })
                                        //移除其他标记
                    window.qq.maps.event.addListener(map,'click',function(event) {
                        marker.setMap(null);
                    });
                }
                    //待修改 js只用加载一次  现在为加载数次 需要修改
                    var script =document.createElement('script')
                    script.type ='text/javascript'
                    script.src ='https://map.qq.com/api/js?v=2.exp&key=5AGBZ-6ZLCX-G734A-ZZDIF-VNDFQ-GHFY2&callback=init'
                    document.body.appendChild(script)
             
            },

            //点击搜索 根据输入信息搜索
            SeachClick(val){
                //决定使用Jsonp
                let that = this;
                let addressMap;
                val == undefined  ? addressMap = this.inputS : addressMap = val
                let url = `https://apis.map.qq.com/ws/geocoder/v1/`;
                this.$jsonp(url,{
                    key:'5AGBZ-6ZLCX-G734A-ZZDIF-VNDFQ-GHFY2',
                    address:addressMap,
                    output:'jsonp',
                    callbackName: 'QQmap',
                }).then(jsonp => {
                    if(jsonp.status == 0){
                       that.latitude = jsonp.result.location.lat;
                       that.longitude = jsonp.result.location.lng;
                       that.init();
                    }else{
                        that.$message.error('请输入详细地址');
                    }
                }).catch(err => {
                        that.$message.error('请输入详细地址');
                })
            },

            //根据经纬度获取地址详情
            GetWebServerMapInfo(location){
                //决定使用Jsonp
                let that = this;
                let locationMap = location.lat+','+location.lng;
                let url = `https://apis.map.qq.com/ws/geocoder/v1/`;
                this.$jsonp(url,{
                    key:'5AGBZ-6ZLCX-G734A-ZZDIF-VNDFQ-GHFY2',
                    location:locationMap,
                    output:'jsonp',
                    callbackName: 'QQmap',
                }).then(jsonp => {
                    if(jsonp.status == 0){
                        alert('您选择的地址为'+jsonp.result.address);
                        that.MapData = jsonp.result
                    }else{
                        that.$message.error('经纬度地址请求失败');
                    }
                }).catch(err => {
                        that.$message.error('经纬度地址请求失败');
                })
            },

            //点击返回数据
            GetMapData(){
               if(this.MapData != ''){
                   this.outerVisible = false;
                   this.$emit('PonData',this.MapData);
               }else{
                   this.$message.error('请点击地图设置具体地点。');
               }
            },

            //添加显示
             DiaLogShow(val,address){
                let that = this;
                this.outerVisible = val;
                if(address != ''){
                    that.SeachClick(address)
                }else{
                    that.getMyLocation();
                }
            },
        }
    }
</script>