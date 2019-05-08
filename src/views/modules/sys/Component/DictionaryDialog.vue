
<template>
<!--用户等级新增,编辑分离-->
    <div>
    <section>
        <el-dialog title="字典新增" :visible.sync="AddShow">
        <el-form :model="AddData"  :rules="AddDatarules" ref="AddruleForm">
            <el-form-item label="标签名" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="选择开通城市" :label-width="formLabelWidth"  prop="name" v-if="typeName == 'City'">
                 <SelectCity @CityData='CityData'/>
            </el-form-item>
            <el-form-item label="数据值" :label-width="formLabelWidth"  prop="value" v-if="typeName != 'City'">
                <el-input v-model="AddData.value" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth"  prop="type">
                <el-input v-model="AddData.type" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth"  prop="sort">
                <el-input v-model="AddData.sort" type='number' placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="AddData.description" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="父级" :label-width="formLabelWidth" prop="parentId" v-if="AddData.Pname != ''">
                <el-input   type="string" placeholder="请输入内容" v-model="AddData.Pname" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AddShow = false">取 消</el-button>
            <el-button type="primary" @click="addData">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--添加-->


    <section>
        <el-dialog title="商品分类编辑" :visible.sync="EditShow" >
        <el-form :model="EdiData"  :rules="EdiDatarules" ref="EditruleForm">
            <el-form-item label="标签名" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="EdiData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="数据值" :label-width="formLabelWidth"  prop="value">
                <el-input v-model="EdiData.value" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth"  prop="type">
                <el-input v-model="EdiData.type" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth"  prop="sort">
                <el-input v-model="EdiData.sort" type='number' placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="EdiData.description" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="EditShow = false">取 消</el-button>
            <el-button type="primary" @click="editData">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--编辑-->

    <section>
        <el-dialog  title="子级的数据"  :visible.sync="DataListShow">
            <el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%"  element-loading-text="正在查询中。。。" v-loading="listLoading">
            <el-table-column align="center" prop="name"  label="标签名"></el-table-column>
            <el-table-column align="center" prop="value"  label="数据值"></el-table-column>
            <el-table-column align="center" prop="type" label="类型">
                <template slot-scope="scope">
                    <el-tag type="success">{{ scope.row.type }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="排序" ></el-table-column>
            <el-table-column  align="center" label="操作" width="200" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handlEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button type="primary" size="mini" @click="DeleteData(scope.$index,scope.row)">删除</el-button>
                    <el-dropdown trigger="click" @command="ClickCommand($event,scope.row)">
                    <span class="el-dropdown-link">
                        <el-button type="success" size="mini"  icon="el-icon-plus"></el-button>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-plus" command='1'>添加</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-plus" command='2'>查看</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetDataList" />
        </el-dialog>
    </section>
    <!--查看子级列表-->

    <!--图片上传 end-->
    </div>
</template>
<script>
import API from "@/api/sys";
import Pagination from '@/components/Pagination'
import SelectCity from '@/components/SelectCity/linkage'
export default {
    components:{Pagination,SelectCity},
    data () {
        return {
           AddShow:false,
           EditShow:false,
           DataListShow:false,
           listLoading:false,
           typeName:'',
           ImgType:0, //设置图片类型
           proportion:1, //设置图片比例
           IMAGE_iNDEX:1, //是删除还是编辑的标识
           dataList:[],
           total:8,
           listQuery:{
            page: 1,
            limit: 10,
            },
           AddData:{
               parentId:'',
               Pname:'',
               value:''
           },
           EdiData:{

           },
           formLabelWidth:'120px',
           AddDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             sort:[
                { required: true, message: '请设置排序', trigger: 'blur' },
             ],
             value:[
                { required: true, message: '请设置值', trigger: 'blur' },
             ],
             type:[
                { required: true, message: '请设置类型', trigger: 'blur' },
             ],
           },
           EdiDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             sort:[
                { required: true, message: '请设置排序', trigger: 'blur' },
             ],
             value:[
                { required: true, message: '请设置值', trigger: 'blur' },
             ],
             type:[
                { required: true, message: '请设置类型', trigger: 'blur' },
             ],
           },
        }
    },
    methods: {
        //添加字典数据
        addData(){
            let that = this;
            this.$refs['AddruleForm'].validate((valid) => {
            if (valid) {
                API.AddDictionary(that.AddData).then(res => {
                    if(res.code == 0){
                        that.$message({ message: '添加成功', type: 'success'});
                        that.$parent.DictionaryListData();
                        that.AddShow = false
                        that.AddData = {}
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

        //编辑字典EditruleForm
        editData(){
            let that = this;
            this.$refs['EditruleForm'].validate((valid) => {
            if (valid) {
                API.UpdataDictionary(that.EdiData).then(res => {
                    if(res.code == 0){
                        that.$message({message:'编辑成功',type:'success'})
                        that.$parent.DictionaryListData();
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

        //获取子级的数据
        GetDataList(val,row){
            let that = this;
            that.listLoading = true;
            that.DataListShow = val
            API.GetChildDictionary(Object.assign({},that.listQuery,{parentId:row.id})).then(res =>{
                if(res != undefined){
                    that.dataList = res.rows;
                    that.total = res.total;
                    that.listLoading = false;
                }else{
                    this.$message.error('请求失败');
                }
            }).catch(err => {
                this.$message.error('请求失败');
            })
        },

        CityData(val){
         console.log("拿到城市的数据",val)
         this.AddData.value = val;
        },

        //删除子级的数据
        DeleteData(index,row){
            let that = this;
            console.log(index,row)
            API.DeleteDictionary({id:row.id}).then(res => {
                if(res.code == 0){
                    that.GetDataList();
                    that.$message({ message: '删除成功', type: 'success'});
                }else{
                    that.$message.error('删除失败');
                }
            })
        },

        //子级编辑
        handlEdit(index,row){

            this.EditShow = true;
            this.EdiData = Object.assign({},row);
        },

        //自己查看添加
        ClickCommand(e,row){
            let that = this;
            if(e == 1){
               that.DiaLogShow(true,row)
            }else{
               that.GetDataList(true,row);
            }
        },

        //添加显示
        DiaLogShow(val,row){
            if(row != undefined){ //当添加子级时会传入当前条的信息 赋值父级ID
                this.AddData.Pname = row.name
                this.AddData.parentId = row.id
                this.typeName = row.type;
            }else{
                this.typeName = '';
            } 
            this.AddShow = val;
        },

        //编辑显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            this.EdiData = Object.assign({},row);
        },
       
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
</style>
