<template>
    <div class="app-container">
        <div class="el-toolbar">
            <div class="el-toolbar-body" style="justify-content: flex-start;">
                <el-button type="text" @click="exportData"><i class="fa fa-plus"/> 导出</el-button>
                <el-button type="text" @click="importData"><i class="fa fa-plus"/> 导入</el-button>
            </div>
        </div>

        <el-table
        :data="list"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="getChildrens"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column label="名称" width="230" align="left">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column label="编码" width="220">
                <template slot-scope="{row}">
                        {{ row.dictCode }}
                </template>
            </el-table-column>
            <el-table-column label="值" width="230" align="left">
                <template slot-scope="scope">
                    <span>{{ scope.row.value }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
        </el-table>
        <!--以下的el-dialog标签为导入单击时，弹出的框 根据dialogImportVisible判断，true弹框false否之 -->
        <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
            <el-form label-position="right" label-width="170px">
                <el-form-item label="文件">
                    <el-upload
                    :multiple="false"
                    :on-success="onUploadSuccess"  
                    :action="'http://localhost:8202/admin/cmn/dict/importDictData'"
                    class="upload-demo">
                    <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogImportVisible = false">
                    取消
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
//引入接口定义的js文件
import dict from '@/api/dict' 

export default {
    data(){
        return{
            dialogImportVisible:false, //设置弹框是否弹出
            list:[]  
        }
    },
    created(){   //页面渲染之前执行
        this.dictList(1);    //查询所有的数据
    },
    methods:{
        dictList(id){
            dict.getDictList(id)
                .then(response => {
                    this.list = response.data;
                })
        },
        //递归查询子数据
        getChildrens(tree, treeNode, resolve) {
            dict.getDictList(tree.id).then(response => {
                resolve(response.data)
            })
        },
        //导出数据字典
        exportData(){
            //因为不需要返回数据什么的，直接调接口
            window.location.href = "http://localhost:8202/admin/cmn/dict/importDictData";
        },
        //导入数据字典
        importData(){
            //打开弹窗
            this.dialogImportVisible = true;
        },
        //上传成功调用的方法
        onUploadSuccess(){
            //关闭弹窗
            this.dialogImportVisible = false;
            //刷新页面
            this.dictList(1);
        }
    }
}
</script>
