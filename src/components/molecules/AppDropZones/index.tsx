import AppTypo from 'components/atoms/AppTypo';
import {Upload} from 'antd';
import type {UploadChangeParam} from 'antd/es/upload';
import type {UploadFile, UploadProps} from 'antd/es/upload/interface';
import {onRemoveFile, onUploadFile} from 'redux/actions/UploadCommon';
import {createImageJson, getFileExtension} from 'utils/FileHelper';

interface AppDropZonesProps {
  fileList: Array<any>;
  setFileList: (fileList: any) => void;
  type: string;
  imageIds: Array<string>;
  setImageIds: (imageIds: any) => void;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  warningText?: string;
}

const AppDropZones = (props: AppDropZonesProps) => {
  const {
    type,
    fileList,
    setFileList,
    imageIds,
    setImageIds,
    minLength = 1,
    maxLength = 20,
    required,
  } = props;

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    const responses = info.fileList.map((file) => file.response || file);
    setFileList(responses.length > 0 ? responses : info.fileList);
  };

  const handleRemove = async (file: UploadFile) => {
    const {response} = file;
    const id: string = response?.id;
    const res = await onRemoveFile(id);
    if (res) {
      const newImageIds = imageIds.filter((item) => item !== id);
      setImageIds(newImageIds);
    }
  };

  const handleCustomRequest = async (options: any) => {
    const {onSuccess, onError, file, onProgress} = options;
    const res = await onUploadFile(file, type);
    if (res) {
      const {id, fileName, mimeType, url} = res;
      const extention = getFileExtension(fileName);
      const typeUpload = type;
      const newFile = createImageJson(id, url, fileName, extention, typeUpload);
      const newImageIds = [...imageIds, id];
      setImageIds(newImageIds);
      onSuccess(newFile);
    } else {
      const error = new Error('Some error');
      onError({error});
    }
  };

  return (
    <div>
      <Upload
        listType='picture-card'
        fileList={fileList}
        showUploadList={{showPreviewIcon: false}}
        onChange={handleChange}
        onRemove={handleRemove}
        customRequest={handleCustomRequest}
        // itemRender={}
      >
        {fileList.length <= maxLength && (
          <>
            <AppTypo variant='span'>Thêm ảnh</AppTypo>
          </>
        )}
      </Upload>
      {required && fileList.length < minLength && (
        <p>{`Bạn cần tải lên ít nhất ${minLength} ảnh`}</p>
      )}
    </div>
  );
};

export default AppDropZones;
