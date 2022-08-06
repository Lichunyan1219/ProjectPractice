// 售货机接口

import require from "@/utils/request";

// 查询售货机列表
export const getmachineList = (data) => {
  return require({
    url: "/api/vm-service/vm/search",
    params: data,
  });
};
