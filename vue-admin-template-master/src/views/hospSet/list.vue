<template>
  <div class="app-container">
    <!--条件查询-->
    <el-form :inline="true" :model="searchObj" class="demo-form-inline">
        <el-form-item label="医院名称">
            <el-input v-model="searchObj.hosname" placeholder="医院名称"></el-input>
        </el-form-item>
        <el-form-item label="医院编号">
            <el-input v-model="searchObj.hoscode" placeholder="医院编号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="getList()">查询</el-button>
        </el-form-item>
    </el-form>
    <!-- 工具条 -->
    <div>
       <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>
    <!-- 数据列表 -->
    <el-table 
        :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" width="50" label="序号"/>
        <el-table-column prop="hosname" label="医院名称" width="170"/>
        <el-table-column prop="hoscode" label="医院编号" width="150"/>
        <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
        <el-table-column prop="contactsName" label="联系人姓名" width="150"/>
        <el-table-column prop="contactsPhone" label="联系人手机"/>
        <el-table-column label="状态" width="80">
            <template slot-scope="scope">
                    {{ scope.row.status === 1 ? '可用' : '不可用' }}
            </template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作">
            <template slot-scope="scope">                
                <el-button size="mini" type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <el-button v-if="scope.row.status==1" size="mini" type="primary"
                @click="lockHospSet(scope.row.id,0)">锁定</el-button>
                <el-button v-if="scope.row.status==0" size="mini" type="danger"
                @click="lockHospSet(scope.row.id,1)">取消锁定</el-button>
                <router-link :to="'/hospSet/edit/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                </router-link>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="pageIndex"
      :page-size="pageSize"
      :total="total"
      background
      style="padding-top: 20px; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList">
    </el-pagination>
  </div>

</template>
<script>
//引入接口定义的js文件
import hospset from '@/api/hospset'  //.js可省略不写

export default{
    data(){      //定义变量和初始值
        return{
            pageIndex:1,  //当前页
            pageSize:3,   //页大小
            searchObj:{}, //条件封装对象
            list:[],       //每页数据的集合
            total:0,       //总数据量
            multipleSelection:[] //批量选择的数据
        }
    },
    created(){   //在页面渲染之前执行的
        //一般定义methods定义的方法，得到数据
        this.getList();   //this表示当前js文件的vue
    },
    methods:{    //定义方法，进行请求接口的调用
        //调用api/hospset.js里的方法，获取集合
        getList(current = 1){  //添加当前页参数，element-ui内部封装了方法，点击下一步自动+1
            this.pageIndex = current;
            hospset.getHospSetList(this.pageIndex,this.pageSize,this.searchObj)
                .then(response => {  //请求成功,response是请求返回的结果
                    //将返回的结果赋值给上面的list集合
                    this.list = response.data.records;
                    //赋值总数据量
                    this.total = response.data.total;
                    //console.log(response);
                })
                .catch(error => {    //请求失败
                    console.log(error);
                })
        },
        handleDelete(index,row){            
            this.$confirm('此操作将永久删除该医院数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {   //点击确定执行then方法
                //调用api接口
                hospset.deleteHospSetById(row.id)
                    .then(response => {
                        //提示删除成功
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //刷新数据
                        this.getList(1);
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //点击复选框后触发的事件
        handleSelectionChange(lists){
            this.multipleSelection = lists;
        },
        //批量删除
        removeRows(){
            this.$confirm('此操作将永久删除该医院数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {   //点击确定执行then方法
                //获取批量选择的数据
                var ids = [];
                for(var i=0;i<this.multipleSelection.length;i++){
                    var id = this.multipleSelection[i].id;  //获取每一个对象的id
                    ids.push(id);  //将id添加到定义的变量数组中
                }
                //对ids数据进行判断，如果长度为0，表示用户没选复选框，退出此方法
                if(Object.keys(ids).length==0){
                    alert("请选择要批量删除的数据！");
                    return false;
                }
                //调用api接口
                hospset.brachHospSetByIds(ids)
                    .then(response => {
                        //提示删除成功
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //刷新数据
                        this.getList(1);
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //锁定与取消锁定
        lockHospSet(id,status){
            hospset.lockHospSet(id,status)
                .then(response => {
                    //刷新页面
                    this.getList(this.pageIndex);
                })
        }
    }
}
</script>
