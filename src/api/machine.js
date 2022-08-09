// 售货机接口

import request from "@/utils/request";

// 查询售货机列表
export const getmachineList = (data) => {
  return request({
    url: "/api/vm-service/vm/search",
    params: data,
  });
};

// 获取售货机商品销量
export const getGoodsSales = (code, start, end, data) => {
  return request({
    url: `/api/order-service/report/skuCollect/${code}/${start}/${end}`,
    params: data,
  });
};

// 获取售货机维修次数
export const getFixNum = (code, start, end, data) => {
  return request({
    url: `/api/task-service/task/repairCount/${code}/${start}/${end}`,
    params: data,
  });
};

// 获取售货机补货次数
export const getsupplyNum = (code, start, end, data) => {
  return request({
    url: `/api/task-service/task/supplyCount/${code}/${start}/${end}`,
    params: data,
  });
};

// 获取售货机类型列表
export const getMachineTypeList = (data) => {
  return request({
    url: "/api/vm-service/vmType/search",
    params: data,
  });
};

// 新增售货机类型
export const addMachineType = (data) => {
  return request({
    method: "POST",
    url: "/api/vm-service/vmType",
    data,
  });
};

// 售货机类型删除
export const delMachineType = (typeId) => {
  return request({
    method: "DELETE",
    url: "/api/vm-service/vmType/" + typeId,
  });
};

// 售货机类型修改
export const fixMachineType = (typeId, data) => {
  return request({
    method: "PUT",
    url: "/api/vm-service/vmType/" + typeId,
    data,
  });
};

// 获取售货机货道详情
export const getMachineRoad = (innerCode) => {
  return request({
    url: "/api/vm-service/channel/channelList/" + innerCode,
  });
};

// 策略列表
export const getTactics = (params) => {
  return request({
    url: "/api/vm-service/policy",
    params
  });
};
