<template>
  <div class="bottom">
    <div class="left">
      共{{ pageInfo.totalCount }}条数据 第{{ pageInfo.pageIndex }}/{{
        pageInfo.totalPage
      }}页
    </div>
    <div class="right">
      <Button
        color="#d5ddf8"
        title="上一页"
        @click="lastPage"
        :disabled="disabled"
      >
      </Button>
      <Button
        color="#d5ddf8"
        title="下一页"
        @click="nextPage"
        :disabled="disabled2"
      >
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/ls-button";
export default {
  components: {
    Button,
  },
  props: {
    pageInfo:{
        type:Object,
        required:true,
    }
  },
  data() {
    return {
      disabled: false,
      disabled2: false,
    };
  },

  created() {},

  methods: {
    lastPage() {
      this.$emit('lastPage')
    },
    nextPage() {
      this.$emit('nextPage')
    },
  },
};
</script>

<style scoped>
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
</style>
