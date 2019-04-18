
<template>
<!--用户等级新增,编辑分离-->
    <div>
    <section>
        <el-dialog title="等级新增" :visible.sync="AddShow">
        <el-form :model="AddmenBerData"  :rules="AddmenBerDatarules">
            <el-form-item label="等级名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="AddmenBerData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="默认等级" :label-width="formLabelWidth"  prop="defaultLv">
                <el-radio v-model="AddmenBerData.defaultLv" label="1">是</el-radio>
                <el-radio v-model="AddmenBerData.defaultLv" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="折扣大小" :label-width="formLabelWidth" prop="discount">
                <el-input v-model="AddmenBerData.discount" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：0.8即为8折" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="等级大小" :label-width="formLabelWidth" prop="rank">
                <el-input v-model="AddmenBerData.rank" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：越大代表等级越高" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="升级方式" :label-width="formLabelWidth" prop="type">
                <el-radio v-model="AddmenBerData.type" label="0">购物数量</el-radio>
                <el-radio v-model="AddmenBerData.type" label="1">消费金额</el-radio>
            </el-form-item>
            <el-form-item label="达到等级所需积分" :label-width="formLabelWidth" prop="upgradePoint">
                <el-input v-model="AddmenBerData.upgradePoint" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="达到等级赠送积分" :label-width="formLabelWidth" prop="givePoint">
                <el-input v-model="AddmenBerData.givePoint" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="等级描述" :label-width="formLabelWidth">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="AddmenBerData.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AddShow = false">取 消</el-button>
            <el-button type="primary" @click="addMenberLv">确 定</el-button>
        </div>
        </el-dialog>
    </section>
    <!--等级添加-->

    <section>
        <el-dialog title="等级新增" :visible.sync="EditShow">
        <el-form :model="EditmenBerData"  :rules="EditmenBerDatarules">
            <el-form-item label="等级名称" :label-width="formLabelWidth"  prop="name">
                <el-input v-model="EditmenBerData.name" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="默认等级" :label-width="formLabelWidth"  prop="defaultLv">
                <el-radio v-model="EditmenBerData.defaultLv" label="1">是</el-radio>
                <el-radio v-model="EditmenBerData.defaultLv" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="折扣大小" :label-width="formLabelWidth" prop="discount">
                <el-input type='number' v-model="EditmenBerData.discount" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：0.8即为8折" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="等级大小" :label-width="formLabelWidth" prop="rank">
                <el-input type='number' v-model="EditmenBerData.rank" placeholder="请输入内容" autocomplete="off"></el-input>
                <el-alert style="padding:0px" title="注：越大代表等级越高" type="success"></el-alert>
            </el-form-item>
            <el-form-item label="升级方式" :label-width="formLabelWidth" prop="type">
                <el-radio v-model="EditmenBerData.type" label="0">购物数量</el-radio>
                <el-radio v-model="EditmenBerData.type" label="1">消费金额</el-radio>
            </el-form-item>
            <el-form-item label="达到等级所需积分" :label-width="formLabelWidth" prop="upgradePoint">
                <el-input type='number' v-model="EditmenBerData.upgradePoint" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="达到等级赠送积分" :label-width="formLabelWidth" prop="givePoint">
                <el-input type='number' v-model="EditmenBerData.givePoint" placeholder="请输入内容" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="等级描述" :label-width="formLabelWidth">
                <el-input   type="textarea" :rows="2" placeholder="请输入内容" v-model="EditmenBerData.description" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="EditShow = false">取 消</el-button>
            <el-button type="primary" @click="editMenberLv">确 定</el-button>
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
           AddmenBerData:{},
           EditmenBerData:{},
           formLabelWidth:'120px',
           AddmenBerDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             defaultLv:[
                { required: true, message: '请选择是否为默认等级', trigger: 'blur' },
             ],
             discount:[
                { required: true, message: '请设置优惠折扣优惠大小', trigger: 'blur' },
             ],
             rank:[
                { required: true, message: '请设置等级大小', trigger: 'blur' },
             ],
             type:[
                { required: true, message: '请设置等级升级方式', trigger: 'blur' },
             ],
             upgradePoint:[
                { required: true, message: '请设置达到此等级的所需积分', trigger: 'blur' },
             ],
             givePoint:[
                { required: true, message: '请设置达到此等级赠送积分', trigger: 'blur' },
             ]
           },
           EditmenBerDatarules:{
             name:[
                { required: true, message: '等级名称', trigger: 'blur' },
             ],
             defaultLv:[
                { required: true, message: '请选择是否为默认等级', trigger: 'blur' },
             ],
             discount:[
                { required: true, message: '请设置优惠折扣优惠大小', trigger: 'blur' },
             ],
             rank:[
                { required: true, message: '请设置等级大小', trigger: 'blur' },
             ],
             type:[
                { required: true, message: '请设置等级升级方式', trigger: 'blur' },
             ],
             upgradePoint:[
                { required: true, message: '请设置达到此等级的所需积分', trigger: 'blur' },
             ],
             givePoint:[
                { required: true, message: '请设置达到此等级赠送积分', trigger: 'blur' },
             ]
           }
        }
    },
    methods: {
        //添加用户的等级
        addMenberLv(){
            let that = this;
            API.addMenberLv(that.AddmenBerData).then(res => {
                if(res.code == 0){
                   that.$message({ message: '添加成功', type: 'success'});
                   that.$parent.GetMenberLvList();
                   that.AddShow = false
                   that.AddmenBerData = {}
                }else{
                   that.$message.error('添加失败');
                }
            }).catch(err => {})
        },

        //编辑用户等级
        editMenberLv(){
            let that = this;
            API.updataMenberLv(that.EditmenBerData).then(res => {
                if(res.code == 0){
                    that.$message({message:'编辑成功',type:'success'})
                    that.$parent.GetMenberLvList();
                    that.EditShow = false;
                }else{
                    that.$message.error('添加失败');                    
                }
            }).catch(err => {})
        },

        //添加显示
        DiaLogShow(val){
            this.AddShow = val;
        },

        //编辑显示
        EditDiaLogShow(val,row){
            this.EditShow = val;
            row.defaultLv = row.defaultLv+''
            row.type = row.type+''
            this.EditmenBerData = Object.assign({},row);
            console.log(this.EditmenBerData,"你好世界阿萨德")
        }
    }
}
</script>
<style scoped>

</style>
