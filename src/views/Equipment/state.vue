<!-- 设备状态 -->
<template>
  <div>
    <!-- 头部查询部分 -->
    <div class="top">
      <el-card class="box-card">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item label="设备编号:">
            <el-input
              style="width: 206px"
              placeholder="请输入"
              v-model="num"
            ></el-input>
          </el-form-item>
          <Button
            class="query-btn"
            icon="el-icon-search"
            title="查询"
            color="#5f84ff"
            @click="query"
          ></Button>
        </el-form>
      </el-card>
    </div>

    <!-- 主渲染部分 -->
    <div class="main">
      <el-table :data="tableData" fit>
        <el-table-column type="index" :index="indexMethod" label="序号" />
        <el-table-column prop="innerCode" label="设备编号" />
        <el-table-column prop="type.name" label="设备型号" />
        <el-table-column prop="node.name" label="详细地址" />
        <el-table-column prop="vmStatus" label="运营状态">
          <template slot-scope="scope">
            {{ { 0: "未投放", 1: "运营", 3: "撤机" }[scope.row.vmStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="设备状态" width="300">
          <template slot-scope="scope">
            <div class="vm-status">
              <div
                class="item"
                :class="{ 'item-false': !scope.row.status[10001] }"
              >
                离线
              </div>
              <div
                class="item"
                :class="{ 'item-false': !scope.row.status[10002] }"
              >
                货道
              </div>
              <div
                class="item"
                :class="{ 'item-false': !scope.row.status[10003] }"
              >
                转动轴
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button @click="details(scope.row)" type="text" size="small"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="bottom">
      <div class="left">
        共{{ pageInfo.totalCount }}条数据 第{{ pageInfo.pageIndex }}/{{
          pageInfo.totalPage
        }}页
      </div>
      <div class="right">
        <Button color="#d5ddf8" title="上一页" @click="lastPage"> </Button>
        <Button color="#d5ddf8" title="下一页" @click="nextPage"> </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/ls-button";
import { getmachineList } from "@/api/machine";
export default {
  components: { Button },
  data() {
    return {
      num: "",
      tableData: [
        {
          innerCode: "",
          type: "",
          node: "",
          vmStatus: "",
          status: "",
        },
      ],
      pageInfo: {},
      page: 1,
    };
  },
  created() {
    this.getmachineList();
  },
  methods: {
    query() {
      console.log("query");
    },
    details(val) {
      console.log(val);
    },
    indexMethod(index) {
      return index + 1 + 10 * (this.page - 1);
    },

    // 获取售货机列表
    async getmachineList() {
      const { data } = await getmachineList({
        pageIndex: this.page,
      });
      console.log(data);
      this.pageInfo = data;
      this.tableData = data.currentPageRecords;
    },
    lastPage() {
      this.page--;
      this.getmachineList();
    },
    nextPage() {
      this.page++;
      this.getmachineList();
    },
  },
};
</script>
<style scoped lang="scss">
.top {
  padding: 20px;
  .box-card {
    .query-btn {
      margin-left: 5px;
    }
  }
}
.main {
  .vm-status {
    display: flex;
    .item {
      text-align: center;
      padding: 0 5px;
      color: #fff;
      border-radius: 11px;
      margin-left: 10px;
      width: 52px;
      height: 23px;
      background: #ff665f linear-gradient(135deg, #3fc997, #4bda98);
    }
    .item-false {
      text-align: center;
      padding: 0 5px;
      color: #fff;
      border-radius: 11px;
      margin-left: 10px;
      width: 52px;
      height: 23px;
      background: #ff665f linear-gradient(135deg, #ffb043, #ffc020);
    }
  }
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
</style>
