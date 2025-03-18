import { useSimpleMutation } from "./api-query/useSimpleMutation";
import { RcFile } from "antd/es/upload";

async function uploadFile(file: RcFile) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const buffer = await file.arrayBuffer();
      const blob = new Blob([buffer], { type: file.type });
      const url = URL.createObjectURL(blob);
      console.log(url);
      resolve(url);
    }, 1000);
  });
}

export function useFileUpload() {
  return useSimpleMutation(["fileUpload"], (data) => uploadFile(data));
}
