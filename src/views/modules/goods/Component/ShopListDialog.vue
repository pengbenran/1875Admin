
<template>
<!--用户等级新增,编辑分离-->
    <div>
    <section>
        <el-dialog title="店铺新增" :visible.sync="AddShow">
        <el-form :model="AddData"  :rules="AddDatarules" ref="AddruleForm">
            <el-form-item label="店铺名称" :label-width="formLabelWidth"  prop="shopName">
                <el-input v-model="AddData.shopName" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
                <el-input v-model="AddData.address" placeholder="请输入内容" autocomplete="off" :disabled="AddData.address == ''">
                     <el-button slot="append" icon="el-icon-search" @click="addressSelect" style="color: #ffffff;border: 1px solid #6494dc; background-color: #6494dc;"></el-button>
                </el-input>
            </el-form-item> 
            <!-- adCode longitude latitude-->

            <!-- <el-form-item label="图片" :label-width="formLabelWidth" prop="shopImg">
                <div class="avatar-uploader" @click="UpLoadShow(3,1,1)">
                    <img v-if="AddData.shopImg" :src="AddData.shopImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
            </el-form-item> -->

            <el-form-item label="老板名称" :label-width="formLabelWidth"  prop="bossName">
                <el-input   type="String" placeholder="请输入内容" v-model="AddData.bossName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="老板电话" :label-width="formLabelWidth" prop="bossPhone">
                <el-input   type="String"  placeholder="请输入内容" v-model="AddData.bossPhone" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AddShow = false">取 消</el-button>
            <el-button type="primary" @click="addData">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--商品分类添加-->

    <section>
        <el-dialog title="店铺编辑" :visible.sync="EditShow" >
        <el-form :model="EdiData"  :rules="EdiDatarules" ref="EditruleForm">
            <el-form-item label="店铺名称" :label-width="formLabelWidth"  prop="shopName">
                <el-input v-model="EdiData.shopName" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
                <el-input v-model="EdiData.address" placeholder="请输入内容" autocomplete="off" :disabled="EdiData.address == ''">
                     <el-button slot="append" icon="el-icon-search" @click="addressSelect" style="color: #ffffff;border: 1px solid #6494dc; background-color: #6494dc;"></el-button>
                </el-input>
            </el-form-item> 
            <!-- adCode longitude latitude-->

            <!-- <el-form-item label="图片" :label-width="formLabelWidth" prop="shopImg">
                <div class="avatar-uploader" @click="UpLoadShow(3,1,1)">
                    <img v-if="EdiData.shopImg" :src="EdiData.shopImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
            </el-form-item> -->

            <el-form-item label="老板名称" :label-width="formLabelWidth"  prop="bossName">
                <el-input   type="String" placeholder="请输入内容" v-model="EdiData.bossName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="老板电话" :label-width="formLabelWidth" prop="bossPhone">
                <el-input   type="String"  placeholder="请输入内容" v-model="EdiData.bossPhone" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="EditShow = false">取 消</el-button>
            <el-button type="primary" @click="editData">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--商品分类编辑-->
    
    <section>
        <el-dialog title="店铺绑定用户"  :visible.sync="ShopShow" >
           <el-row  v-loading="loading" element-loading-text="拼命加载中">
               <el-col :span = '10' >
                   <div style="display: inline-block;margin-right: 4px;" v-for="(Item,index) in TagList" :key="Item.id">
                        <el-tag closable type="success"  @close="handleClose(Item.id)">{{Item.memberName}}</el-tag>
                   </div>
               </el-col>
               <el-col :span = '14'>
                <div class="FlexWarp">
                    <el-input v-model="listQuery.searchParam" size="mini" placeholder="输入用户名搜索"/>
                    <el-button type="primary" size="mini" @click="GetMenberList"  icon="el-icon-search">搜索</el-button>
                </div>
                <el-table :data="UsertableData" style="width: 100%">
                    <el-table-column label="头像" prop="date">
                        <template slot-scope='scope'>
                            <img :src="scope.row.face" width="45"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="name"></el-table-column>
                    <el-table-column align="center" label="操作" width="220" >
                    <!-- <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
                    </template> -->
                    <template slot-scope="scope">
                        <el-button size="mini" @click="AddUserTag(scope.$index,scope.row)">添加</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetMenberList" />
               </el-col>
           </el-row>
        </el-dialog>
    </section>
    
    <Uploadimg ref='UploadImg' @GetDataImg='GetDataImg' :type='ImgType' :proportion='proportion'/>
    <!--图片上传 end-->
    
    <MapLoad ref="map" @PonData='PonData'/>
    <!-- 地图加载 -->
    
    </div>
</template>
<script>
import API from "@/api/goods";
import API_m from '@/api/member'
import Uploadimg from "@/components/UpLoadImg/UpLoadImg";
import Pagination from '@/components/Pagination';
import MapLoad from "@/components/Map/map";
import { QqMap } from '@/utils/index'

export default {

    watch:{
    },
    components:{Uploadimg,MapLoad,Pagination},
    data () {
        return {
           AddShow:false,
           EditShow:false,
           ShopShow:false,
           loading:false,
           shopId:'',
           ImgType:0, //设置图片类型
           proportion:1, //设置图片比例
           IMAGE_iNDEX:1, //是删除还是编辑的标识
           TagList:[],
           UsertableData:[],
           total:9,
           listQuery:{page:1,limit:9},
           search:'',
           AddData:{
              
               address:'',
               adCode:'',
               longitude:'',
               latitude:''
           },
           EdiData:{
               
               address:'',
               adCode:'',
               longitude:'',
               latitude:''
           },
           formLabelWidth:'120px',
           AddDatarules:{
             shopName:[
                { required: true, message: '请设置店铺名称', trigger: 'blur' },
             ],
             address:[
                { required: true, message: '请设置地址', trigger: 'blur' },
             ],
          
             bossName:[
                { required: true, message: '请设置老板名称', trigger: 'blur' },
             ],
             bossPhone:[
                { required: true, message: '请设置老板电话', trigger: 'blur' },
             ]
           },
           EdiDatarules:{
             shopName:[
                { required: true, message: '请设置店铺名称', trigger: 'blur' },
             ],
             address:[
                { required: true, message: '请设置地址', trigger: 'blur' },
             ],
       
             bossName:[
                { required: true, message: '请设置老板名称', trigger: 'blur' },
             ],
             bossPhone:[
                { required: true, message: '请设置老板电话', trigger: 'blur' },
             ]
           }
        }
    },
    methods: {
        //添加用户的等级
        addData(){
            let that = this;
            this.$refs['AddruleForm'].validate((valid) => {
            if (valid) {
                API.AddShop(that.AddData).then(res => {
                    if(res.code == 0){
                        that.$message({ message: '添加成功', type: 'success'});
                        that.$parent.GetShopListData();
                        that.AddShow = false;
                        this.AddData.address = ''; //重置一下
                        that.AddData = {};
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

        //编辑用户等级EditruleForm
        editData(){
            let that = this;
            this.$refs['EditruleForm'].validate((valid) => {
            if (valid) {
                API.UpdataShop(that.EdiData).then(res => {
                    if(res.code == 0){
                        that.$message({message:'编辑成功',type:'success'})
                        that.$parent.GetShopListData();
                        that.EditShow = false;
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

        //获取所有用户信息
        GetMenberList(){
            let that = this;
            API_m.getMenberList(Object.assign({},that.listQuery)).then(res => {
                if(res != undefined){
                    that.UsertableData = res.rows;
                    that.total = res.total;
                }else{
                    this.$message.error('会员列表获取失败');
                }
            }).catch(err =>{})
        },


        //绑定指定用户
        AddUserTag(index,row){
            let that = this;
            console.log(row,"查看一下当前用户的ID")
            let data = {
                shopId:this.shopId,
                unionId:row.unionid,
                memberName:row.name
            }
            API.ShopMenber(data).then(res => {
                if(res.code == 0){
                    that.$message({message:'获取成功',type:'success'});
                    that.GetUserTag();
                }else{
                    that.$message.error('绑定用户获取失败');
                }
            }).catch(err => {
                that.$message.error('绑定用户获取失败');
            })
        },

        //获取已绑定的用户
        GetUserTag(){
            let that = this;
            that.loading = true;
            let data = {
                shopId:this.shopId,
            }
            API.GetShopMenber(data).then(res => {
                if(res.code == 0){
                    that.TagList = res.members
                }else{
                    that.$message.error('绑定用户获取失败');
                }
                that.loading = false;
            }).catch(err => {
                that.$message.error('绑定用户获取失败');
            })
        },

        //删除绑定的用户
        handleClose(id){
            let that = this;
            let data = {
                shopMemberId:id
            }
            API.DeleteShopMenber(data).then(res => {
                if(res.code == 0){
                    that.GetUserTag();
                    that.$message({message:'删除成功',type:'success'})
                }else{
                    that.$message.error('删除失败');
                }
            }).catch(err => {
                that.$message.error('删除失败');
            })
        },



        //地址选择
        addressSelect(){
            //触发地图组件
            console.log("触发时传的参数",this.EdiData.address)
            this.$refs.map.DiaLogShow(true,this.EdiData.address)
            
        },

        //选择父级
        changeRadio(){
            this.AddData.root == 1 ? this.AddData.parentId = '0' : this.AddData.parentId = ''
        },

        //编辑选择父级
        EditchangeRadio(){
            this.EdiData.root == 1 ? this.EdiData.parentId = '0' : this.EdiData.parentId = ''           
        },

        //添加显示
        DiaLogShow(val){
            this.AddShow = val;
            QqMap().then(res => {
                console.log("引用地图组件")
            })
        },


        //编辑显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            this.EdiData = Object.assign({},row);
        },

        //店铺绑定用户显示
        ShopDiaLogShow(val,row){
             console.log("查看一下穿过来的店铺数据",row)
            this.ShopShow = val;
            this.shopId = row.shopId;
            this.GetMenberList(); //获取所有的信息；
            this.GetUserTag(); //获取已绑定的用户
        },

        //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:是编辑还是编辑的标识
        UpLoadShow(type,proportion,IMAGE_iNDEX){
            this.ImgType = type;
            this.proportion = proportion;
            this.IMAGE_iNDEX = IMAGE_iNDEX;
            this.$refs.UploadImg.showDialog(true)
        },

        //图片赋值
        GetDataImg(ImgUrl){
            if(this.IMAGE_iNDEX == 1){
                this.AddData.shopImg = ImgUrl;
            }else{
                this.EdiData.shopImg = ImgUrl;
            }
        },

        //地图数据返回
        PonData(MapData){
            console.log("这是返回来的阿斯达所数据",MapData,this.EditShow,this.AddShow)
            if(this.EditShow){
                this.EdiData.address = MapData.address
                this.EdiData.adCode = MapData.ad_info.adcode
                this.EdiData.longitude = MapData.location.lng
                this.EdiData.latitude = MapData.location.lat
            }
            if(this.AddShow){
                this.AddData.address = MapData.address
                this.AddData.adCode = MapData.ad_info.adcode
                this.AddData.longitude = MapData.location.lng
                this.AddData.latitude = MapData.location.lat
            }

        }
    }
}
</script>
<style scoped>
.avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
}
.avatar-uploader .avatar-uploader-icon,.avatar-uploader img{
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.FlexWarp{
    display: flex;align-items: center;
}
</style>
