import request from "@/utils/request";

// 图片上传
export const getPhoto = (fileName) => {
  return request({
    method: "POST",
    url: "/api/vm-service/sku/fileUpload",
    data: {
      fileName: fileName,
    },
  });
};
