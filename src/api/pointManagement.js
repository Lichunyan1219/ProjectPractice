import request from "@/utils/request";

//点位管理——区域列表
export const areaList = (params) =>
  request({
    url: "/api/vm-service/region/search",
    params,
  });
//点位管理——新增区域
export const newArea = (data) =>
  request({
    url: "/api/vm-service/region",
    method: "POST",
    data,
  });
//点位管理——点位搜索
export const getAreaDetails = (params) =>
  request({
    url: "/api/vm-service/node/search",
    params,
  });
//点位管理——删除区域
export const deleteArea = (regionId) =>
  request({
    url: "/api/vm-service/region/" + regionId,
    method: "DELETE",
  });
