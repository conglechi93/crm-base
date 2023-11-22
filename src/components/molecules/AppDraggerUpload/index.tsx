import AppTypo from 'components/atoms/AppTypo';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import styles from './style.module.scss';

type PropsTypes = {
  handleCustomRequest: (info: any) => void;
  handleChangeFile: (e: any) => void;
};
const AppDraggerUpload = (props: PropsTypes) => {
  const {handleCustomRequest, handleChangeFile} = props;
  return (
    <>
      <Dragger
        className={styles.app_dragger}
        maxCount={1}
        customRequest={handleCustomRequest}
        onChange={handleChangeFile}
      >
        {/* <Image src={UploadIcon} width={32} height={32} alt='' /> */}
        <AppTypo variant='p-md-reg'>Kéo thả ảnh hoặc tải tệp lên ở đây</AppTypo>
      </Dragger>
    </>
  );
};

export default AppDraggerUpload;
