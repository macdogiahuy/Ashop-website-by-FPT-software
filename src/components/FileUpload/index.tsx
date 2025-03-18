import { Button, Upload } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { useFileUpload } from "../../hooks/useFileUpload";

export function FileUpload({
  value,
  onChange,
  multiple,
}: {
  value?: string | string[];
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
}) {
  const { mutateAsync: upload, isLoading } = useFileUpload();

  const urls = value ? (Array.isArray(value) ? value : [value]) : [];

  return (
    <Upload
      showUploadList={false}
      multiple={!!multiple}
      beforeUpload={async (file, files) => {
        if (multiple) {
          const result: string[] = [];
          for (const item of files) {
            const url = await upload(item);
            result.push(url);
          }
          onChange(result);
        } else {
          const result = await upload(file);
          onChange(result);
        }
        return false;
      }}
    >
      <Button icon={isLoading ? <LoadingOutlined /> : <UploadOutlined />}>Click to Upload</Button>
      {urls.map((url, index) => (
        <img key={index} style={{ width: 32, height: 32, marginLeft: 12 }} src={url} />
      ))}
    </Upload>
  );
}
