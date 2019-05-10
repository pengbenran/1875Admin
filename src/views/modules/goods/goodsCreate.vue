
<template>
<!--用户等级新增,编辑分离-->
    <div>
    <section>
        <el-form :model="AddData"  :rules="AddDatarules" ref="AddruleForm">
            <el-form-item label="商品编号" :label-width="formLabelWidth"  prop="sn">
                <div class="generateSn">
                    <el-input v-model="AddData.sn" placeholder="请输入商品编号" autocomplete="off">
                        <el-button type="success" plain  slot="append" icon="el-icon-success" @click="generateSn" >生成编号</el-button>
                    </el-input>
                </div>
            </el-form-item>   
            <el-form-item label="商品名称" :label-width="formLabelWidth"  prop="goodName">
                <el-input v-model="AddData.goodName" placeholder="请输入商品名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品标题" :label-width="formLabelWidth"  prop="title">
                <el-input v-model="AddData.title" placeholder="请输入商品标题" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="展示价格" :label-width="formLabelWidth"  prop="showPrice">
                <el-input  type="number"   v-model="AddData.showPrice" placeholder="请输入展示价格" autocomplete="off">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="成本价" :label-width="formLabelWidth"  prop="cost">
                <el-input  type="number"   v-model="AddData.cost" placeholder="请输入成本价" autocomplete="off">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item> 
            <el-form-item label="价格" :label-width="formLabelWidth"  prop="price">
                <el-input  type="number"   v-model="AddData.price" placeholder="请输入价格" autocomplete="off">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>  
            <el-form-item label="排序" :label-width="formLabelWidth"  prop="sort">
                <el-input  type="number"   v-model="AddData.sort" placeholder="请输入排序" autocomplete="off"></el-input>
            </el-form-item>                                          
            <el-form-item label="是否热销" :label-width="formLabelWidth"  prop="hot">
                <el-radio v-model="AddData.hot" label="1">是</el-radio>
                <el-radio v-model="AddData.hot" label="2">否</el-radio>
            </el-form-item>  
            <el-form-item label="商品状态" :label-width="formLabelWidth" prop="status">
                <el-radio v-model="AddData.status" label="1">立即上架</el-radio>
                <el-radio v-model="AddData.status" label="2">暂不上架</el-radio>
            </el-form-item>
            <!-- <el-form-item label="分类ID" :label-width="formLabelWidth"  prop="catId">
                <el-input v-model="AddData.catId" placeholder="请输入分类ID" autocomplete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="分类名称" :label-width="formLabelWidth"  prop="catName">
                <el-select v-model="AddData.catName1" clearable placeholder="请选择" @change = 'changeCatName'>
                    <el-option v-for="item in goodsCatRoot" :key="item.value" :label="item.name" :value="item.catId"></el-option>
                </el-select>
                <el-select v-model="AddData.catName2" clearable placeholder="请选择" @change = 'changeCatName' :disabled = "goodCatChilerBool">
                    <el-option v-for="item in goodCatChiler" :key="item.value" :label="item.name" :value="item.catId"></el-option>
                </el-select>
            </el-form-item>      
            <el-form-item label="区域" :label-width="formLabelWidth"  prop="region">
                <el-input v-model="AddData.region" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item> 
            <el-form-item label="地铁" :label-width="formLabelWidth"  prop="subway">
                <div class="FlexWarp">
                <div v-for="(item,index) in AddData.subwayList" :key="index" :index='index' style="margin-right:4px;">
                    <el-select v-model="item.value" placeholder="请选择"  @change='subwayChangeSelect'>
                        <el-option v-for="itemc in item.options" :key="itemc.id" :label="itemc.name" :value="itemc.id"></el-option>
                    </el-select>
                </div>
                </div>
                <!-- <el-input v-model="AddData.subway" placeholder="请输入内容" autocomplete="off"></el-input> -->
            </el-form-item> 
            <!-- <el-form-item label="付款类型" :label-width="formLabelWidth"  prop="payType">
                <el-radio v-model="AddData.payType" label="1">微信支付</el-radio>
                <el-radio v-model="AddData.payType" label="2">余额支付</el-radio>
            </el-form-item> -->
            <el-form-item label="积分抵扣金额" :label-width="formLabelWidth"  prop="pointAmount">
                <el-input  type="number"   v-model="AddData.pointAmount" placeholder="请输入内容" autocomplete="off">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item> 
            <el-form-item label="商品失效时间" :label-width="formLabelWidth"  prop="invalidTime">
                <el-date-picker v-model="AddData.invalidTime"    type="date" value-format="timestamp" format="yyyy 年 MM 月 dd 日" placeholder="选择日期">
                </el-date-picker>
            </el-form-item> 
            <el-form-item label="商品类型" :label-width="formLabelWidth"  prop="goodType">
                <el-radio v-model="AddData.goodType" label="1">自营商品</el-radio>
                <el-radio v-model="AddData.goodType" label="2">入驻商品</el-radio>
                <el-radio v-model="AddData.goodType" label="3">优惠券商品</el-radio>
                <!-- <el-alert style="padding:0px" title="注：根级也就是设置初始等级" type="success"></el-alert> -->
            </el-form-item>
            <el-form-item label="商品详情" :label-width="formLabelWidth"  prop="content">
                <!-- <Editor :Value="AddData.content" ref="Editor" @Set_Content="Get_ContentValue"/> -->
                <Editors v-model="AddData.content" ref="Editor"/>
                <p>内容:{{AddData.content}}</p>
            </el-form-item>   
            <el-form-item label="商品缩略图" :label-width="formLabelWidth"  prop="thumbnail">
                <div class="avatar-uploader" @click="UpLoadShow(1,1)"><img v-if="AddData.thumbnail" :src="AddData.thumbnail" class="avatar"><i v-else class="el-icon-plus avatar-uploader-icon"></i></div>
            </el-form-item>   
            <el-form-item label="轮播图" :label-width="formLabelWidth"  prop="images">
                <div class="avatar-uploader imagesBoxList" v-for="(item,index) in AddData.imagesList" :key="item" :index='index' @click="UpLoadShow(2,1.777,index)">
                    <img :src="item" class="avatar boxImg">
                </div>
                <div class="avatar-uploader imagesBoxList" @click="UpLoadShow(2,1.777)">
                    <i class="el-icon-plus avatar-uploader-icon boxImg"></i>
                </div>
            </el-form-item>   
            <el-form-item label="分享海报" :label-width="formLabelWidth"  prop="posterImg">
                <div class="avatar-uploader" @click="UpLoadShow(3,1)">
                    <img v-if="AddData.posterImg" :src="AddData.posterImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
            </el-form-item>
            <el-form-item label="展示销售量" :label-width="formLabelWidth"  prop="showSales">
                <el-input  type="number"   v-model="AddData.showSales" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>   
            <el-form-item label="真实的销售量" :label-width="formLabelWidth"  prop="sales">
                <el-input  type="number"   v-model="AddData.sales" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="库存" :label-width="formLabelWidth"  prop="inventory">
                <el-input  type="number"   v-model="AddData.inventory" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商店ID" :label-width="formLabelWidth"  prop="shopId">
                <el-select v-model="AddData.shopId" placeholder="请选择">
                   <el-option v-for="item in ShopDataList" :key="item.value" :label="item.shopName" :value="item.shopId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否可以使用红包" :label-width="formLabelWidth"  prop="redPacket">
                <el-radio v-model="AddData.redPacket" label="1">是</el-radio>
                <el-radio v-model="AddData.redPacket" label="2">否</el-radio>
                <!-- <el-alert style="padding:0px" title="注：根级也就是设置初始等级" type="success"></el-alert> -->
            </el-form-item>
            <el-form-item label="购买获得佣金" :label-width="formLabelWidth"  prop="fixedCommission">
                <div class="YongMoney" v-for="(item,index) in MemberDataList" :index ='index' :key="item.distributorLvId">
                    <el-tag style="margin-right:12px;">{{item.name}}</el-tag>
                    <el-input v-model="item.value" placeholder="请输入内容" autocomplete="off">
                        <template slot="append">元</template>
                    </el-input>
                </div>
            </el-form-item>
            <el-form-item label="购买获取积分" :label-width="formLabelWidth"  prop="buyIntegral">
                <el-input  type="number"   v-model="AddData.buyIntegral" placeholder="请输入内容" autocomplete="off">
                    <template slot="append">分</template>
                </el-input>
            </el-form-item>
            <el-form-item label="分享获得积分" :label-width="formLabelWidth"  prop="shareIntegral">
                <el-input  type="number"   v-model="AddData.shareIntegral" placeholder="请输入内容" autocomplete="off">
                    <template slot="append">分</template>
                </el-input>
            </el-form-item>
            <el-form-item label="上下线佣金" :label-width="formLabelWidth"  prop="lineCommission">
                <el-input  type="number"   v-model="AddData.lineCommission" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="CloseGoods">取 消</el-button>
            <el-button type="primary" @click="addData">确 定</el-button>
        </div>
    </section>
    <!--商品分类添加-->

    <Uploadimg ref='UploadImg' @GetDataImg='GetDataImg' :type='ImgType' :proportion='proportion'/>
    <!--图片上传 end-->
    
    </div>
</template>
<script>
import API from "@/api/goods";
import APIMember from "@/api/member";
import APISys from "@/api/sys";
import Editor from "@/components/ueditor/ueditor";
import Editors from "@/components/Editor/Editor";
import Uploadimg from "@/components/UpLoadImg/UpLoadImg";
import Store from "@/store/index"
import { random_No } from "@/utils/index"
import { mapActions } from 'vuex';

export default {
    name: 'GoodsCreate',
    components:{Editor,Uploadimg,Editors},
    data () {
        return {
           AddShow:false,
           AddData:{
               sn:'',
               content:'',
               thumbnail:'',
               imagesList:[],
               posterImg:'',
               payType:'1',
               catId:'',
               redPacket:'2',
               status:'2',
               hot:'2',
               goodType:'3',
               fixedCommission:'', //分享佣金
               subway:'',
               subwayList:[{value:'',options:[]}], //关于地铁的数据
           },
           formLabelWidth:'120px',
           AddDatarules:{
             sn:[
                { required: true, message: '请输入编号', trigger: 'blur' },
             ],
             goodName:[
                { required: true, message: '请输入商品名称', trigger: 'blur' },
             ],
             title:[
                { required: true, message: '请输入商品标题', trigger: 'blur' },
             ],
             showPrice:[
                { required: true, message: '请输入展示价格', trigger: 'blur' },
             ],
             cost:[
                { required: true, message: '请输入成本价', trigger: 'blur' },
             ],
             price:[
                { required: true, message: '请输入价格', trigger: 'blur' },
             ],
             sort:[
                { required: true, message: '请设置排序', trigger: 'blur' },
             ],
             hot:[
                { required: true, message: '请设置是否热销', trigger: 'blur' },
             ],
             status:[
                { required: true, message: '请设置商品状态', trigger: 'blur' },
             ],
             catName:[
                { required: true, message: '请设置分类', trigger: 'blur' },
             ],
             region:[
                { required: true, message: '请设置区域', trigger: 'blur' },
             ],
             payType:[
                { required: true, message: '请设置付款类型', trigger: 'blur' },
             ],
             thumbnail:[
                { required: true, message: '设置商品缩略图', trigger: 'blur' },
             ],
             images:[
                { required: true, message: '请设置轮播图', trigger: 'blur' },
             ],
             posterImg:[
                { required: true, message: '请设置分享海报', trigger: 'blur' },
             ],
             showSales:[
                { required: true, message: '请设置展示销量', trigger: 'blur' },
             ],
             sales:[
                { required: true, message: '请设置销量', trigger: 'blur' },
             ],
             shopId:[
                { required: true, message: '请设置店铺', trigger: 'blur' },
             ],
             redPacket:[
                { required: true, message: '请设置是否使用红包', trigger: 'blur' },
             ],
             pointAmount:[
                { required: true, message: '请设置积分抵扣金额', trigger: 'blur' },
             ],
             invalidTime:[
                { required: true, message: '请设置失效时间', trigger: 'blur' },
             ],
             goodType:[
                { required: true, message: '请设置商品类型', trigger: 'blur' },
             ],
             subway:[
                { required: true, message: '请设置地铁信息', trigger: 'blur' },
             ],
             inventory:[
                { required: true, message: '请设置库存信息', trigger: 'blur' },
             ]
           },
           goodsCat:[],
           goodsCatRoot:[],
           goodCatChiler:[],
           MemberDataList:[],
           DictionaryDataList:[],
           ShopDataList:[
                {value: '1',label: '马登的小店'},
                {value: '2',label: '马登的小店'}
           ],
           ImgType:0, //设置图片类型
           proportion:1, //设置图片比例
           imageIndex:'',//轮播时指定的下标
           ItemProps:{
               value:'label',
               children:'cities'
           }
        }
    },
    computed:{
        GoodCatRoot(){
            return this.goodsCat.filter(f => f.root == 1)
        },
        goodCatChilerBool(){
            return this.goodCatChiler.length > 0 ? false : true
        },
        startTime(){
            return (new Date()).getTime();
        },
    },
    mounted () {
      this.GetGoodsCatData(); //获取所有的分类
      this.GetShareDataList(); //获取所有的等级
      this.GetShopDataList(); //获取所有店铺
      this.GetDictionaryData(); //获取字典数据
    },
    methods: {
        ...mapActions('good',['Get_GoodsCatData','Set_MemberLvList','Set_ShopList','Set_DictionaryList']),
        //添加用户的等级
        addData(){
            let that = this;
            that.UpAddData(); //对添加数据进行处理
            console.log(that.AddData,"添加时候的数据")
            // that.$refs.Editor.getContent(); //商品详情
            this.$refs['AddruleForm'].validate((valid) => {
            if (valid) {
                API.AddGoods(that.AddData).then(res => {
                    if(res.code == 0){
                        that.$message({ message: '添加成功', type: 'success'});
                        that.AddData = {}
                        that.$router.push('/goods-goodsList')
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

        //取消添加
        CloseGoods(){
            this.$router.push('/goods-goodsList')
        },
        
        // Conten字段赋值
        // Get_ContentValue(data){
        //   this.AddData.content = data
        // },

        //获取商品分类
        GetGoodsCatData(){
            let that = this;
            let arr = [];
            // if(Store.state.good.goodsCat.length > 0){
            //     that.goodsCat = Store.state.good.goodsCat
            //     that.goodsCatRoot = that.goodsCat.filter(f => f.root == 1)
            // }else{
        
            // }
            let data = { page: 1,limit: 20}
                API.GetGoodsCat(data).then(res => {
                    if(res != undefined){
                        that.goodsCat = res.rows;
                        that.goodsCatRoot = that.goodsCat.filter(f => f.root == 1);
                        that.Get_GoodsCatData(res.rows);
                    }else{
                        that.$message.error('商品列表并未请求到');
                    }
             }).catch(err =>{});
        },

        //获取所有的店铺列表
        GetShopDataList(){
            let that = this; 
            if(Store.state.good.ShopDataList.length > 0){
                that.ShopDataList = Store.state.good.ShopDataList
            }else{
                API.GetShopList({ page: 1,limit: 30}).then(res => {
                        if(res != undefined){
                            that.ShopDataList = res.rows;
                            that.Set_ShopList(that.ShopDataList)
                        }else{
                            that.$message.error('分享师等级列表并未请求到');
                        }
                    }).catch(err => {
                        that.$message.error('分享师等级列表并未请求到');
                })
            }
        },

        //获得所有分享师列表
        GetShareDataList(){
            let that = this;
            if(Store.state.good.MemberDataList.length > 0){
                that.MemberDataList = Store.state.good.MemberDataList;
            }else{
                APIMember.getdistributorLvList({ page: 1,limit: 20}).then(res => {
                    if(res != undefined){
                        that.MemberDataList = res.rows.map(Mres => {
                            Mres.value = 0;
                            return Mres;
                        });
                        that.Set_MemberLvList(that.MemberDataList)
                    }else{
                        that.$message.error('分享师等级列表并未请求到');
                    }
                }).catch(err => {
                    that.$message.error('分享师等级列表并未请求到');
                })
            }   
        },

        //获取字典数据
        GetDictionaryData(){
            let that = this;
            if(Store.state.good.DictionaryDataList.length > 0){
                that.DictionaryDataList = Store.state.good.DictionaryDataList;
                that.AddData.subwayList[0].options = that.DictionaryDataList;
            }else{
                APISys.GetSubwayData().then(res =>{
                    if(res != undefined){
                        that.DictionaryDataList = res.subway;
                        that.AddData.subwayList[0].options = that.DictionaryDataList
                        that.Set_DictionaryList(Object.assign({},that.DictionaryDataList))
                    }else{
                        that.$message.error('未获取到字典数据');
                    }
                }).catch(err => {
                    that.$message.error('未获取到字典数据');
                })
            }
        },

        //根据地铁数据整理
        subwayChangeSelect(e){
            let that = this;
            APISys.GetChildDictionary(Object.assign({},{page: 1,limit: 100},{parentId:e})).then(res =>{
                if(res != undefined && res.rows.length > 0){
                    let data = {
                        value:'',
                        options:res.rows
                    }
                    this.AddData.subwayList.push(data)
                }else if(res != undefined &&  res.rows.length == 0){
                   this.AddData.subway = e
                }
            }).catch(err => {
                this.AddData.subway = e
                console.log("报错过来",err)
            })
        },

        //对数据进行处理的时间
        UpAddData(){
            let that = this;
            let MenberLv = [];
            that.MemberDataList.map(Mres => {
                MenberLv.push(Mres.distributorLvId+'|'+Mres.value);
            })
            that.AddData.fixedCommission = MenberLv.join(',')
        },

        //生成编号
        generateSn(){
            this.AddData.sn = random_No(3)
        },

        //赋值分类
        changeCatName(val){
            this.goodCatChiler = this.goodsCat.filter(Mres => Mres.parentId == val)
            let goodCatFind = this.goodsCat.find(f => f.catId == val)
            if(this.goodCatChiler.length == 0 ){
                this.AddData.catName = goodCatFind.name
                this.AddData.catId = goodCatFind.catId
            }
        },

        //显示图片上传框 type:上传图片的类型 proportion:上传图片的比例 IMAGE_iNDEX:轮播图时修改指定图片的下标
        UpLoadShow(type,proportion,IMAGE_iNDEX){
            this.ImgType = type;
            this.proportion = proportion;
            IMAGE_iNDEX != undefined ? this.imageIndex = IMAGE_iNDEX : this.imageIndex = undefined
            this.$refs.UploadImg.showDialog(true)
        },

        //图片返回赋值
        GetDataImg(ImgUrl){
            let that = this;
            switch (that.ImgType) {
                case 1:
                    that.AddData.thumbnail = ImgUrl;
                    break;
                case 2:
                    that.imageIndex == undefined ? that.AddData.imagesList.push(ImgUrl) : that.AddData.imagesList[that.imageIndex] = ImgUrl;
                    that.AddData.images = that.AddData.imagesList.join(',');
                    break;
                case 3:
                    that.AddData.posterImg = ImgUrl;
                    break;                                
                default:
                    break;
            }
        }
        
    }
}
</script>
<style >
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
.avatar-uploader .boxImg{
    display: inline-block;height: 189px;width: 336px;
}
.generateSn{
    display: flex;
    align-items: center;
}

.imagesBoxList{
    display: inline-block;height: 189px;width: 336px;
}

.YongMoney{
    display: flex;align-items: center;
}
.FlexWarp{
    display: flex;
    align-items: center;
}

</style>
