<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 博客管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加/编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box" style="width:100%">
                <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="80px">
                    <el-form-item label="标题" prop="title" style="width:50%;">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="二级标题" prop="subtitle" style="width:50%;">
                        <el-input v-model="ruleForm.subtitle"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" prop="cover">
                        <el-upload name="file" ref="newupload"
                                :action="'/api3/u/upload'"
                                accept=".jpg, .png,.gif"
                                list-type="picture-card"
                                :file-list="fileLists"
                                :before-upload="submitUpload"
                                :on-preview="handlePictureCardPreview"
                                :on-success="success"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            <!-- <el-button size="small" type="primary">确定</el-button> -->
                        </el-upload>
                        <!--大图弹出框-->
                        <el-dialog :visible.sync="imgDialogVisible" size="full" :modal="false" title="查看大图片">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>

                    <el-form-item label="文章分类" prop="category">
                        <el-select v-model="ruleForm.category"  placeholder="请选择">
                            <el-option v-for="item in categorys" :label="item.name" :key="item._id" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    `<el-form-item label="标签" prop="tag" style="width:50%;">
                       <el-checkbox v-for="item in tags" :key="item.id" v-model="item.checked">{{item.name}}</el-checkbox>
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <!-- <quill-editor ref="myTextEditor" v-model="ruleForm.content" :options="editorOption"></quill-editor> -->
                        <mavon-editor v-model="ruleForm.content" ref="md"  @imgAdd="$imgAdd" @change="change" style="min-height: 600px"> </mavon-editor>
                    </el-form-item>

                    <el-form-item label="是否发布" prop="published">
                        <el-select v-model="ruleForm.published"  placeholder="请选择">
                            <el-option label="是" :key="0" :value="0"></el-option>
                            <el-option label="否" :key="1" :value="1"></el-option>
                        </el-select>

                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>
<style scoped>
.pre-img {
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 5px;
}
.crop-demo {
  display: flex;
  align-items: flex-end;
}
.crop-demo-btn {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  margin-left: 30px;
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
<script>
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import VueCropper from "vue-cropperjs";
import { quillEditor } from "vue-quill-editor";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import {
  getCategory,
  getTags,
  addPost,
  updatePost,
  getAllPost,
  getPostById
} from "../../service/getData";
export default {
  name: "baseform",
  data: function() {
    return {
      id: 0,
      content: "",
      editorOption: {
        placeholder: "请填写博客内容"
      },
      categorys: [],
      tags: [],
      dialogImageUrl: "",
      imgDialogVisible: false,
      fileLists: [],
      ruleForm: {},
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        category: [{ required: true, message: "请选择分类", trigger: "blur" }],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" }
        ],
        published: [
          { required: true, message: "请选择是否发布", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    quillEditor,
    VueCropper,
    mavonEditor
  },
  created() {
    this.allCategory();
    this.allTags();
    this.getPost();
  },
  methods: {
    allCategory() {
      let res = getCategory({}).then(res => {
        this.categorys = [...res.data];
      });
    },
    allTags() {
      let res = getTags({}).then(res => {
        this.tags = [...res.data];
      });
    },
    getPost() {
      var query = this.$route.params;
      if (!query.id) return;
      getPostById({ id: query.id }).then(res => {
        if (res && res.errcode == 0) {
          this.ruleForm = res.data;
          this.tags.map(item => {
            res.data.tags.map(item1 => {
              if (item._id == item1.id) {
                item.checked = true;
              }
            });
          });
          this.ruleForm.published = res.data.published ? 0 : 1;
          //this.cover = res.data.cover;
          this.fileLists.push({ url: res.data.cover })
        }
      });
    },
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      this.$axios({
        url: "/api/u/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.$refs.md.$img2Url(pos, res.data.data.imgUrl);
      });
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.html = render;
    },
    //删除图片
    handleRemove(file, fileList) {
      this.form.logo = "";
    },
    //查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgDialogVisible = true;
    },
    //图片上传成功
    success(response, file, fileList) {
      this.fileLists = [];
      this.fileLists = [file];
      this.cover = file.response.data.imgUrl;
    },
    submitUpload(file) {
      var fd = new FormData();
      var nameImg = new Date().getTime();
      fd.append("file", file, nameImg);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios.post("/api3/u/upload", fd, config).then(res => {
        if (res.status == 200) {
          if (res.data.data) {
            this.cover = res.data.data.imgUrl;
          }
        } else {
          this.$notify.error({
            title: "上传失败",
            message: "图片上传接口上传失败，可更改为自己的服务器接口"
          });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let newTag = [];
          if (this.tags) {
            this.tags.map(item => {
              if (item.checked) {
                newTag.push({
                  id: item._id,
                  name: item.name
                });
              }
            });
          }
          let options = {
            title: this.ruleForm.title,
            content: this.ruleForm.content,
            cover: this.cover,
            category: this.ruleForm.category,
            author: localStorage.getItem("ms_username"),
            published: 1,
            tags: newTag,
            subtitle: this.ruleForm.subtitle
          };
          if (this.ruleForm._id) {
            options._id = this.ruleForm._id;
            updatePost(options).then(res => {
              if (res.errcode == 0) {
                this.$message.success("保存成功");
                this.$router.push({ path: "/table" });
              }
            });
          } else {
            addPost(options).then(res => {
              this.$message.success("保存成功");
              this.$router.push({ path: "/table" });
            });
          }
        } else {
          this.$message.error("保存失败");
        }
      });
    }
  }
};
</script>
