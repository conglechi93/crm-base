import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppTypo from 'components/atoms/AppTypo';
import AppDropZones from 'components/molecules/AppDropZones';
import {AttachmentType} from 'shared/constants/AppVariables';
import {Button, Col, Form, Row, Upload} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {useState} from 'react';
import useStep2 from './useStep2';
import styles from './style.module.scss';
import AppUploadZones from 'components/molecules/AppUploadZones';
import {createImageJson, getFileExtension} from 'utils/FileHelper';
import AppModal from 'components/molecules/AppModal';
import {useIntl} from 'react-intl';
import {onUploadFile} from 'redux/actions/UploadCommon';
import {OPEN_TOAST} from 'types';
import {useAppDispatch} from 'redux/hook';
type PropsTypes = {
  info: any;
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void;
  setDisabled: (value: boolean) => void;
};
const Step2 = (props: PropsTypes) => {
  const dispatch = useAppDispatch();
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const {info, setDisabled, handleSetFormData} = props;
  const [imageIds, setImageIds] = useState<any>([]);
  const [modalAddUrl, setModalAddUrl] = useState(false);
  const [isValidAddUrl, setIsValidAddUrl] = useState(false);
  const [modalAddUrlData, setModalAddUrlData] = useState({
    title: '',
    description: <></>,
    submitText: '',
    closeText: '',
  });
  const [thumbnailImages, setThumbnailImages] = useState<any>([]);
  const [inventoryImages, setInventoryImages] = useState<any>([]);

  const {handleChangeFormData} = useStep2(
    info,
    form,
    handleSetFormData,
    setDisabled,
    thumbnailImages,
    inventoryImages,
  );

  // Upload Thumnail
  const handleUploadFile = async (e: any) => {
    const file = e.target.files[0];
    const type = AttachmentType.THUMBNAIL_IMG;
    const res = await onUploadFile(file, type);
    if (res) {
      const {id, fileName, mimeType, url} = res;
      const extention = getFileExtension(fileName);
      const typeUpload = type;
      const newFile = createImageJson(id, url, fileName, extention, typeUpload);
      setThumbnailImages?.([newFile]);
    }
  };

  // Upload Inventory
  let uploaded = [...inventoryImages];
  const handleUploadMultiple = async (e: any) => {
    const files = e.target.files;
    const chosenFiles = Array.prototype.slice.call(files);
    const type = AttachmentType.INVERTORY_IMG;
    chosenFiles.some((file: any) => {
      const fetchApi = async () => {
        const res = await onUploadFile(file, type);
        if (res) {
          const {id, fileName, mimeType, url} = res;
          const extention = getFileExtension(fileName);
          const typeUpload = type;
          const newFile = createImageJson(
            id,
            url,
            fileName,
            extention,
            typeUpload,
          );
          uploaded.push(newFile);
        }
        if (uploaded.length > 20) {
          let toastProps = {
            message: 'Thông báo',
            description: 'Không được vượt quá 20 ảnh',
            type: 'error',
          };
          dispatch({
            type: OPEN_TOAST,
            payload: toastProps,
          });
          setInventoryImages([]);
        } else {
          setInventoryImages(uploaded);
        }
      };
      fetchApi();
    });
  };

  const handleModalUrl = () => {
    console.log(1);
    const modalUrl = {
      title: messages['common.addToUrl'] as string,
      description: (
        <>
          <AppFormItem
            name='addUrl'
            label={messages['common.enterUrl'] as string}
            rules={[
              {
                required: true,
                message: messages['common.ruleEnterUrl'] as string,
              },
            ]}
          >
            <AppInput type='text' placeholder='http://' />
          </AppFormItem>
        </>
      ),
      closeText: messages['common.cancel'] as string,
      submitText: messages['common.save'] as string,
    };
    setModalAddUrlData(modalUrl);
    setModalAddUrl(true);
  };
  const handleSubmitModalAddUrl = () => {
    alert('đang chờ Api');
  };
  const handleCloseModalAddUrl = () => {
    setModalAddUrl(false);
  };

  return (
    <div>
      <AppForm form={form} onFieldsChange={handleChangeFormData}>
        <Row gutter={[16, 16]} className={styles.app_step_2}>
          <Col span={24}>
            <AppTypo variant='p-md-med'>
              Hình ảnh <span style={{color: 'red'}}>*</span>
            </AppTypo>
            <ul>
              <li>Hãy dùng ảnh thật, không trùng, không chèn số điện thoại.</li>
              <li>
                Tối thiểu 1 ảnh đại diện, tối đa 20 ảnh. Hỗ trợ file: PNG, JPG,
                JPEG.
              </li>
            </ul>
          </Col>
          <Col xs={24}>
            <Row gutter={[10, 0]}>
              {thumbnailImages.length > 0 ? (
                <Col span={6} className='upload_thumnail'>
                  <AppUploadZones
                    fileList={thumbnailImages}
                    setFileList={setThumbnailImages}
                    imageIds={imageIds}
                    setImageIds={setImageIds}
                    type={AttachmentType.THUMBNAIL_IMG}
                    maxLength={1}
                    maxCount={1}
                  />
                </Col>
              ) : (
                <Col xs={24} sm={12} xl={6}>
                  <div className='box-image'>
                    <AppTypo variant='p-lg-semi'>
                      {messages['common.avatarImage'] as string}
                    </AppTypo>
                    <svg
                      width='35'
                      height='35'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M15.4922 3.44662C12.9123 3.39503 10.2514 4.87237 9.52148 8.20586C6.55069 7.19185 3.86834 9.19179 4.14697 12.3851C2.5926 13.0134 1.5 14.5319 1.5 16.3167C1.5 18.6669 3.39201 20.5589 5.74219 20.5589H10.8955C10.8941 19.1306 10.8911 16.2648 10.8911 15.722L9.68259 16.16C8.80587 16.5378 8.15833 15.4338 8.90915 14.7464L11.1958 12.5242C11.718 12.0019 12.3418 12.0618 12.8042 12.5242L15.0908 14.7464C15.8416 15.4338 15.1941 16.5378 14.3174 16.16L13.1089 15.722V20.5589H18.2578C20.608 20.5589 22.5 18.6669 22.5 16.3167C22.5 14.587 21.4733 13.1083 19.9951 12.4466C22.8593 6.86281 19.2627 3.5219 15.4922 3.44662Z'
                        fill='#81B5FE'
                      />
                      <path
                        d='M15.4922 3.44613C15.3484 3.4433 15.1907 3.44823 15.0468 3.45461C11.7518 8.64754 16.8441 12.4458 19.9951 12.4458C22.8593 6.86204 19.2627 3.52116 15.4922 3.44587V3.44613Z'
                        fill='#3789FD'
                      />
                    </svg>
                    <div className='content-upload'>
                      <input
                        className='inputUploadHidden'
                        type='file'
                        onChange={handleUploadFile}
                      />
                      <Row>
                        <Col span={12}>
                          <AppTypo variant='span'>
                            {messages['common.uploadImage'] as string}
                          </AppTypo>
                        </Col>
                        <Col span={12}>
                          <AppTypo variant='span'>
                            <span onClick={handleModalUrl}>
                              {messages['common.addUrl'] as string}
                            </span>
                          </AppTypo>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={24}>
            <Row gutter={[10, 10]}>
              {inventoryImages.length > 0 && (
                <Col xs={24} className='list_image_multiple'>
                  <AppUploadZones
                    fileList={inventoryImages}
                    setFileList={setInventoryImages}
                    imageIds={imageIds}
                    setImageIds={setImageIds}
                    type={AttachmentType.INVERTORY_IMG}
                    maxCount={20}
                  />
                </Col>
              )}
              {inventoryImages.length <= 20 && (
                <Col xs={24} sm={12} xl={6}>
                  <div className='box-image'>
                    <AppTypo variant='p-lg-semi'>
                      {messages['common.photoImage'] as string}
                    </AppTypo>
                    <svg
                      width='35'
                      height='35'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M15.4922 3.44662C12.9123 3.39503 10.2514 4.87237 9.52148 8.20586C6.55069 7.19185 3.86834 9.19179 4.14697 12.3851C2.5926 13.0134 1.5 14.5319 1.5 16.3167C1.5 18.6669 3.39201 20.5589 5.74219 20.5589H10.8955C10.8941 19.1306 10.8911 16.2648 10.8911 15.722L9.68259 16.16C8.80587 16.5378 8.15833 15.4338 8.90915 14.7464L11.1958 12.5242C11.718 12.0019 12.3418 12.0618 12.8042 12.5242L15.0908 14.7464C15.8416 15.4338 15.1941 16.5378 14.3174 16.16L13.1089 15.722V20.5589H18.2578C20.608 20.5589 22.5 18.6669 22.5 16.3167C22.5 14.587 21.4733 13.1083 19.9951 12.4466C22.8593 6.86281 19.2627 3.5219 15.4922 3.44662Z'
                        fill='#81B5FE'
                      />
                      <path
                        d='M15.4922 3.44613C15.3484 3.4433 15.1907 3.44823 15.0468 3.45461C11.7518 8.64754 16.8441 12.4458 19.9951 12.4458C22.8593 6.86204 19.2627 3.52116 15.4922 3.44587V3.44613Z'
                        fill='#3789FD'
                      />
                    </svg>
                    <div className='content-upload'>
                      <input
                        className='inputUploadHidden'
                        type='file'
                        multiple
                        onChange={handleUploadMultiple}
                      />
                      <Row>
                        <Col span={12}>
                          <AppTypo variant='span'>
                            {messages['common.uploadImage'] as string}
                          </AppTypo>
                        </Col>
                        <Col span={12}>
                          <AppTypo variant='span'>
                            <span onClick={handleModalUrl}>
                              {messages['common.addUrl'] as string}
                            </span>
                          </AppTypo>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={24}>
            <AppFormItem name='videoUrl' label='Video'>
              <AppInput type='text' placeholder='Nhập link video' />
            </AppFormItem>
          </Col>
          <Col xs={24}>
            <AppFormItem name='inventoryName' label='Tiêu đề' required>
              <AppInput type='text' placeholder='Nhập tiêu đề' />
            </AppFormItem>
          </Col>
          <Col xs={24}>
            <AppFormItem name='inventoryExcerpt' label='Mô tả' required>
              <TextArea
                placeholder='Nhập mô tả bất động sản tối thiểu 50 ký tự'
                showCount={true}
                maxLength={1000}
                rows={4}
              />
            </AppFormItem>
          </Col>
        </Row>
      </AppForm>

      {/* Modal Uoload Url */}
      <AppModal
        title={modalAddUrlData?.title}
        openModal={modalAddUrl}
        setOpenModal={setModalAddUrl}
        handleSubmit={handleSubmitModalAddUrl}
        handleClose={handleCloseModalAddUrl}
        width={250}
        closeText={modalAddUrlData.closeText}
        submitText={modalAddUrlData.submitText}
        description={
          <p className={styles.modal_content_add_url}>
            {modalAddUrlData.description}
          </p>
        }
        disabled={isValidAddUrl}
      ></AppModal>
    </div>
  );
};

export default Step2;
