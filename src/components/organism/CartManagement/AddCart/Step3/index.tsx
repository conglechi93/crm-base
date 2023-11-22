import AppTypo from 'components/atoms/AppTypo';
import {memo} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useStep3 from './useStep3';
import {cartModalInfo} from 'shared/constants/AppVariables';
type PropsTypes = {
  info: any;
  setDisabled: (value: boolean) => void;
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void;
};
const Step3 = (props: PropsTypes) => {
  const {info, setDisabled, handleSetFormData} = props;

  const {value, handleChangeReactQuill} = useStep3(
    info,
    setDisabled,
    handleSetFormData,
  );
  return (
    <div>
      <AppTypo variant='p-md-med'>Mô tả*</AppTypo>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={handleChangeReactQuill}
        readOnly={info.type == cartModalInfo.view.type}
      />
    </div>
  );
};

export default memo(Step3);
