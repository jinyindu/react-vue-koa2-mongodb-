<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="default" icon="add" @click="onCreate" class="handle-del mr10">创建</el-button>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" >
                <el-table-column prop="title" label="标题" sortable>
                </el-table-column>
                <el-table-column prop="category.name" label="分类" width="120">
                </el-table-column>
                <el-table-column prop="tag" label="标签">
                </el-table-column>
                <el-table-column prop="published" label="是否发布" width="120">
                </el-table-column>
                <el-table-column prop="browse" label="浏览次数" width="120">
                </el-table-column>
                <el-table-column prop="meta.createAt" label="创建时间" >
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllPost,delPost } from "../../service/getData";
export default {
  name: "basetable",
  data() {
    return {
      url: "./static/vuetable.json",
      tableData: [],
      pageNo: 1,
      pageSize: 20,
      select_word: "",
      form: {},
      total: 0
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      if (this.tableData) {
        return this.tableData.filter(d => {
          let tagStr = "";
          d.tags.map(res => {
            tagStr += res.name + "/";
          });
          d.tag = tagStr;
          d.published = d.published ? "已发布" : "未发布";
          return d;
        });
      }
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      let page = this.pageNo || 1;
      getAllPost({ page: page, pageSize: this.pageSize }).then(res => {
        if (res.errcode == 0) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    onCreate() {
      this.$router.push({ path: "/add" });
    },
    search() {
      this.is_search = true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(scope) {
      this.$router.push({ name: "form", params: { id: scope.row._id } });
    },
    handleDelete(scope) {
      var id = scope.row._id
      delPost(id).then((res) => {
          if(res.errcode == 0){
              this.getData()
          }
      })
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>
