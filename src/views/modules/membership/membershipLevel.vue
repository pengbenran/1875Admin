<template>
  <div class="membershipManagerment">
    <el-row class="warp">
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">添加等级</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="member_lv" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column label="等级ID" prop="lvId" :span="3">
        </el-table-column>
        <el-table-column prop="name" label="等级名称" :span="3" >
        </el-table-column>
        <el-table-column prop="defaultLv" label="是否默认等级" width="150">
          <template slot-scope="scope" >
          <el-tag size="mini" v-if="scope.row.defaultLv!=0">是</el-tag>
          <el-tag size="mini" v-if="scope.row.defaultLv==0">否</el-tag>
        </template> 
        </el-table-column>
        <el-table-column prop="discount" label="等级对应折扣" :span="2">
        </el-table-column>
        <el-table-column prop="upgradePoint" label="需获得积分" :span="2">
        </el-table-column>
        <el-table-column prop="givePoint" label="赠送积分" :span="2">
        </el-table-column>
        <el-table-column label="操作" :width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeMemberLevel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
    
      <!-- 添加界面 -->
      <el-dialog title="会员等级新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm">
          <el-form-item label="等级名称" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否默认等级" prop="default_lv" label-width="110px" >
            <el-radio v-model="addForm.defaultLv" label="1">是</el-radio>
            <el-radio v-model="addForm.defaultLv" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="等级对应折扣" prop="discount" label-width="110px">
            <el-input type="email" v-model="addForm.discount" placeholder="如7折请填7"></el-input>
          </el-form-item>    
           <el-form-item label="需获得积分" prop="upgradePoint" label-width="110px">
            <el-input type="email" v-model="addForm.upgradePoint" placeholder="需获得积分"></el-input>
          </el-form-item> 
          <el-form-item label="赠送积分" prop="give_point" label-width="110px">
            <el-input type="email" v-model="addForm.givePoint" placeholder="达到等级赠送积分"></el-input>
          </el-form-item> 
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
      <!-- 编辑界面 -->
      <el-dialog title="会员等级编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm">
          <el-form-item label="等级名称" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否默认等级" prop="default_lv" label-width="110px" >
            <el-radio v-model="editForm.defaultLv" label="1">是</el-radio>
            <el-radio v-model="editForm.defaultLv" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="等级对应折扣" prop="discount" label-width="110px">
            <el-input  v-model="editForm.discount" placeholder="如7折请填7"></el-input>
          </el-form-item>    
           <el-form-item label="需获得积分" prop="upgradePoint" label-width="110px">
            <el-input  v-model="editForm.upgradePoint" placeholder="达到需获得积分"></el-input>
          </el-form-item> 
          <el-form-item label="赠送积分" prop="give_point" label-width="110px">
            <el-input  v-model="editForm.givePoint" placeholder="达到等级赠送积分"></el-input>
          </el-form-item> 
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import Api from '@/api/member'
  export default {
    data () {
      return {
        member_lv:[{lvId: 18, name: "银牌哈米", defaultLv: 0, discount: 0.98, rank: null, type: null, upgradePoint: 20,givePoint:2},{lvId: 19, name: "银牌哈米", defaultLv: 0, discount: 0.98, rank: null, type: null, upgradePoint: 20,givePoint:2},{lvId: 20, name: "银牌哈米", defaultLv: 0, discount: 0.98, rank: null, type: null, upgradePoint: 20,givePoint:2}],
        filters: {
          name: ""
        },
        loading: false,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          name:''
        },
        addFormVisible: false,
        editFormVisible: false,
        editFormRules: {
          name: [{required: true, message: "请输入会员等级名称", trigger: "blur"}],
          discount: [{required: true, message: "请输入等级对应折扣", trigger: "blur"}],
          upgradePoint: [{required: true, message: "请输入升级所需积分", trigger: "blur"}],
          givePoint: [{required: true, message: "请输入赠送积分", trigger: "blur"}]
        },
        editForm: {
          givePoint: "",
          name: "",
          defaultLv:'1',
          discount:'',
          upgradePoint:''
        },
        //新增相关数据
        addFormVisible: false, //新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [{required: true, message: "请输入会员等级名称", trigger: "blur"}],
          discount: [{required: true, message: "请输入等级对应折扣", trigger: "blur"}],
          upgradePoint: [{required: true, message: "请输入升级所需积分", trigger: "blur"}],
          givePoint: [{required: true, message: "请输入达到等级赠送积分", trigger: "blur"}],
        },
        addForm: {
          givePoint: "",
          upgradePoint: "",
          name: "",
          defaultLv: '1',
          discount:'',
        }
      }
    },
    mounted () {
      // Api.getMain(res=>{
      //   console.log(res)
      // })
    },
    methods: {
      showAddDialog: function () {
        let that = this;
        this.addFormVisible = true;  
      },
      showEditDialog: function (index, row) {
        let that = this;
        this.editFormVisible = true;
        row.defaultLv=row.defaultLv.toString()
        this.editForm = row;   
      },

     
    }
  }
</script>

<style lang="scss">
  
</style>
