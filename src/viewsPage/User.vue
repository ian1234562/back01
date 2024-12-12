<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, reactive, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
// import * as echarts from "echarts/core";
// import { EChartsType } from "echarts";

const tableData = ref([]);
const instance = getCurrentInstance();
if (!instance) {
  throw new Error("組件實例不存在");
}
const getUserData = async () => {
  try {
    const data = await (instance.proxy as any).$api.getUserData(config);
    tableData.value = data.list.map((item: any) => ({
      ...item,
      sexLabel: item.sex === "1" ? "男" : "女",
    }));
    config.total = data.count;
  } catch (error) {
    console.error(error);
  } finally {
  }
};

interface UserForm {
  name: string;
  age: number | string;
  sex: string;
  birth: string;
  addr: string;
}

// 然後使用這個接口來初始化表單數據

const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年齡",
  },
  {
    prop: "sexLabel",
    label: "性別",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    label: "地址",
    width: 400,
  },
]);
const formInline = reactive({
  keyWord: "",
});
const config = reactive({
  name: "",
  total: 0,
  page: 1,
});

const handleSearch = () => {
  config.name = formInline.keyWord;
  getUserData();
};
const handleChange = (page: number) => {
  config.page = page;
  getUserData();
  // console.log("page:", page);
};
const handleDelete = (val: any) => {
  ElMessageBox.confirm("你確定要刪除嗎").then(async () => {
    await (instance.proxy as any).$api.deleteUser({ id: val.id });
    ElMessage({
      showClose: true,
      message: "刪除成功",
      type: "success",
    });
    getUserData();
  });
};
const userForm = ref();
const action = ref("add");
const dialogVisible = ref(false);
// 然後使用這個接口來初始化表單數據
const formUser = reactive<UserForm>({
  name: "",
  age: "",
  sex: "",
  birth: "",
  addr: "",
});
const rules = reactive({
  name: [{ required: true, message: "姓名是必須填", trigger: "blur" }],
  age: [
    { required: true, message: "年齡必須填", trigger: "blur" },
    { required: "number", message: "年齡必須是數字" },
  ],
  sex: [{ required: true, message: "性別必須填", trigger: "change" }],
  birth: [{ required: true, message: "出生日期必須填" }],
  addr: [{ required: true, message: "地址必須填" }],
});
const handleClose = () => {
  //獲取表單重置表單
  dialogVisible.value = false;
  (instance.proxy as any).$refs["userForm"].resetFields();
};
const handleCancel = () => {
  //獲取表單並重置
  dialogVisible.value = false;
  (instance.proxy as any).$refs["userForm"].resetFields();
};
const handleAdd = () => {
  dialogVisible.value = true;
  action.value = "add";
};
//格式化日期

const onSubmit = () => {
  //先校驗
  userForm.value.validate(async (vaild: any) => {
    if (vaild) {
      let res = null;
      if (action.value === "add") {
        console.log("add", formUser);
        res = await (instance.proxy as any).$api.addUser(formUser);
      } else {
        res = await (instance.proxy as any).$api.editUser(formUser);
      }
      if (res) {
        dialogVisible.value = false;
        (instance.proxy as any).$refs["userForm"].resetFields();
        getUserData();
      }
    } else {
      ElMessage({
        showClose: true,
        message: "請輸入正確內容",
        type: "error",
      });
    }
  });
};
const handleEdit = (val: any) => {
  action.value = "edit";
  dialogVisible.value = true;
  // 點編輯之後 再點新增 會保留原有數據
  // 沒點之前dom整個元素不在 然後加載dom連數據一起加載 導致resect沒加載到
  // Object.assign(formUser, { ...val, sex: "" + val.sex });
  nextTick(() => {
    Object.assign(formUser, { ...val, sex: "" + val.sex });
  });
  console.log("handleEdit", val);
};
onMounted(async () => {
  await getUserData();
});
</script>
<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="請輸入">
        <el-input
          placeholder="請輸入用戶名"
          v-model="formInline.keyWord"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :width="item.width ? item.width : 125"
        :prop="item.prop"
        :label="item.label"
      />

      <el-table-column fixed="right" label="Operations" min-width="120">
        <template v-slot="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">
            編輯
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      size="small"
      :total="config.total"
      @current-change="handleChange"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用戶' : '編輯用戶'"
    width="35%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="請輸入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年齡" prop="age">
            <el-input v-model.name="formUser.age" placeholder="請輸入年齡" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性別" prop="sex">
            <el-select v-model="formUser.sex" placeholder="請選擇">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="請輸入日期"
              format="YYYY/MM/DD "
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="formUser.addr" placeholder="請輸入地址"></el-input>
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">確定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  position: relative;
  height: 520px;
  .page {
    position: absolute;
    right: 20px;
    bottom: 10px;
  }
  .el-table {
    width: 100px;
    height: 520px;
  }
}
.select-clearn {
  display: flex;
}
</style>
