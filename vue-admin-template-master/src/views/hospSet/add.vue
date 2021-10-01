<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"></el-input>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"></el-input>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入接口定义的js文件
import hospset from '@/api/hospset'  //.js可省略不写

export default {
  data() {
    return {
      hospitalSet: {},
    };
  },
  created() {  //在页面渲染之前执行的
    //获取路由的id值
    if(this.$route.params && this.$route.params.id){  //判断路由是否有id值
      const id = this.$route.params.id;
      //调用methods中的方法
      this.getHospSet(id);
    }else{
      //没有id,表单数据清空
      this.hospitalSet={};
    }
  },
  methods:{
    //添加
    save(){
      hospset.insertHospitalSet(this.hospitalSet)
        .then(response => {
          //提示
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //跳转列表页面，使用路由跳转方式实现
          this.$router.push({path:'/hospSet/list'})
        })
    },
    //修改
    update(){
      hospset.updateHospSet(this.hospitalSet)
        .then(response => {
          //提示
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //跳转列表页面，使用路由跳转方式实现
          this.$router.push({path:'/hospSet/list'})
        })
    },
    //添加
    saveOrUpdate(){
      //根据hospitalSet对象判断是否有id
      if(!this.hospitalSet.id){  //没有id，调添加方法
        this.save();
      }else{                     //有id，调修改方法
        this.update();
      }
    },
    //根据id查询
    getHospSet(id){
      hospset.getHospSetById(id)
        .then(response => {
          this.hospitalSet = response.data;
        })
    }
  }
};
</script>
