
<template>
<!--用户等级新增,编辑分离-->
    <div>
    <section>
        <el-dialog title="等级新增" :visible.sync="AddShow">
        <el-form :model="AddDistributorData"  :rules="AddDistributorrules">
            <el-form-item label="等级名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddDistributorData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="默认等级" :label-width="formLabelWidth"  prop="defaultStatus">
                <el-radio v-model="AddDistributorData.defaultStatus" label="1">是</el-radio>
                <el-radio v-model="AddDistributorData.defaultStatus" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="升级所需人数" :label-width="formLabelWidth" prop="inviteNumber">
                <el-input type="number" v-model="AddDistributorData.inviteNumber" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：设置升级需要多少人" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="推荐师权重" :label-width="formLabelWidth" prop="weight">
                <el-input type="number" v-model="AddDistributorData.weight" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：设置越大代表等级越高" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="权益" :label-width="formLabelWidth" prop="description">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="AddDistributorData.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AddShow = false">取 消</el-button>
            <el-button type="primary" @click="addDistributorLv">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--等级添加-->

    <section>
        <el-dialog title="等级新增" :visible.sync="EditShow">
        <el-form :model="EditDistributorData"  :rules="EditDistributorDatarules">
            <el-form-item label="等级名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="EditDistributorData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="默认等级" :label-width="formLabelWidth"  prop="defaultStatus">
                <el-radio v-model="EditDistributorData.defaultStatus" label="1">是</el-radio>
                <el-radio v-model="EditDistributorData.defaultStatus" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="升级所需人数" :label-width="formLabelWidth" prop="inviteNumber">
                <el-input v-model="EditDistributorData.inviteNumber" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：设置升级需要多少人" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="推荐师权重" :label-width="formLabelWidth" prop="weight">
                <el-input v-model="EditDistributorData.weight" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：设置越大代表等级越高" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="权益" :label-width="formLabelWidth" prop="description">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="EditDistributorData.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="EditShow = false">取 消</el-button>
            <el-button type="primary" @click="editDistributorLv">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--等级编辑-->
    </div>
</template>
<script>
import API from "@/api/member";
export default {
    props:{

    },
    watch:{
    },
    data () {
        return {
           AddShow:false,
           EditShow:false,
           AddDistributorData:{},
           EditDistributorData:{},
           formLabelWidth:'120px',
           AddDistributorrules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             defaultStatus:[
                { required: true, message: '请选择是否为默认等级', trigger: 'blur' },
             ],
             inviteNumber:[
                { required: true, message: '请设置升级人数', trigger: 'blur' },
             ],
             weight:[
                { required: true, message: '请设置推荐师权重', trigger: 'blur' },
             ],
             description:[
                { required: true, message: '请设置权益', trigger: 'blur' },
             ]
           },
           EditDistributorDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             defaultStatus:[
                { required: true, message: '请选择是否为默认等级', trigger: 'blur' },
             ],
             inviteNumber:[
                { required: true, message: '请设置升级人数', trigger: 'blur' },
             ],
             weight:[
                { required: true, message: '请设置推荐师权重', trigger: 'blur' },
             ],
             description:[
                { required: true, message: '请设置权益', trigger: 'blur' },
             ]
           }
        }
    },
    methods: {
        //添加用户的等级
        addDistributorLv(){
            let that = this;
            API.addDistributorLvList(that.AddDistributorData).then(res => {
                if(res.code == 0){
                   that.$message({ message: '添加成功', type: 'success'});
                   that.$parent.GetDistributorLvList();
                   that.AddDistributorData = {}
                }else{
                   that.$message.error('添加失败');
                }
                that.AddShow = false
            }).catch(err => {})
        },

        //编辑用户等级
        editDistributorLv(){
            let that = this;
            API.updataDistributor(that.EditDistributorData).then(res => {
                if(res.code == 0){
                    that.$message({message:'编辑成功',type:'success'})
                    that.$parent.GetDistributorLvList();
                }else{
                    that.$message.error('添加失败');                    
                }
                that.EditShow = false;
            }).catch(err => {})
        },

        //添加显示
        DiaLogShow(val){
            this.AddShow = val;
        },

        //编辑显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            row.defaultStatus = row.defaultStatus+''
            this.EditDistributorData = Object.assign({},row);
            console.log(this.EditDistributorData,"你好世界阿萨德")
        }
    }
}
</script>
<style scoped>

</style>
