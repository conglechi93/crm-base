import AppTypo from 'components/atoms/AppTypo';
import AppDropZones from 'components/molecules/AppDropZones';
import {memo, useEffect, useState} from 'react';
import {AttachmentType} from 'shared/constants/AppVariables';
import {createImageJson, getFileExtension} from 'utils/FileHelper';
import {loadState} from 'utils/LocalStore';

type PropsTypes = {
  info: any;
  setDisabled: (value: boolean) => void;
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void;
};
const Step2 = (props: PropsTypes) => {
  const {info, setDisabled, handleSetFormData} = props;
  const [imageIds, setImageIds] = useState([]);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [diagramImages, setDiagramImages] = useState([]);

  const handleCreateImages = (
    data: Array<{id: string; url: string; typeId: number}>,
  ) => {
    const images: any = [];
    data.forEach((item: any) => {
      const {id, url, typeId} = item;
      const extention = getFileExtension(url);
      const typeUpload = typeId.toString();
      const urlSplit = url.split('/');
      const fileName = urlSplit[urlSplit.length - 1];
      const file = createImageJson(id, url, fileName, extention, typeUpload);
      images.push(file);
    });
    return images;
  };

  useEffect(() => {
    if (info) {
      const {draftString} = info;
      const dataSource = loadState(draftString);
      if (dataSource) {
        const cartImages = dataSource?.cartImages || [];
        const imageIds = cartImages.map((item: any) => item.id);
        setImageIds(imageIds);

        const thumbnailImages = cartImages.filter(
          (item: any) => item.typeId == AttachmentType.THUMBNAIL_IMG,
        );
        const images = handleCreateImages(thumbnailImages);
        setThumbnailImages(images);

        const diagramImages = cartImages.filter(
          (item: any) => item.typeId == AttachmentType.DIAGRAM_IMG,
        );
        const diagrams = handleCreateImages(diagramImages);
        setDiagramImages(diagrams);
      }
    }
  }, [info]);

  useEffect(() => {
    setDisabled(thumbnailImages.length == 0);
  }, [thumbnailImages]);

  useEffect(() => {
    const data = [{key: 'images', value: imageIds}];
    handleSetFormData(data);
  }, [imageIds]);

  return (
    <div>
      <AppTypo variant='p-md-med'>Hình ảnh*</AppTypo>
      <AppDropZones
        fileList={thumbnailImages}
        setFileList={setThumbnailImages}
        imageIds={imageIds}
        setImageIds={setImageIds}
        required
        type={AttachmentType.THUMBNAIL_IMG}
      />
      <AppTypo variant='p-md-med'>Sơ đồ mặt bằng</AppTypo>
      <AppDropZones
        fileList={diagramImages}
        setFileList={setDiagramImages}
        imageIds={imageIds}
        setImageIds={setImageIds}
        required={false}
        type={AttachmentType.DIAGRAM_IMG}
      />
    </div>
  );
};

export default memo(Step2);
