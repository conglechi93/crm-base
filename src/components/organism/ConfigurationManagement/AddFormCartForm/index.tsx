import AppInput from 'components/atoms/AppInput';
import AppTypo from 'components/atoms/AppTypo';

type AddFormCartFormType = {
  formName: string;
  setFormName: any;
  formDesc: string;
  setFormDesc: any;
};

const AddFormCartForm = (props: AddFormCartFormType) => {
  const {formName, setFormName, formDesc, setFormDesc} = props;
  return (
    <div>
      <AppTypo variant='p-md-semi'>
        Tên biểu mẫu<span className='asterisk'> *</span>
      </AppTypo>
      <AppInput
        type='text'
        placeholder='Nhập Tên biểu mẫu'
        defaultValue={formName}
        onChange={(e) => {
          setFormName(e.target.value);
        }}
      />
      <AppTypo variant='p-md-semi'>Mô tả</AppTypo>
      <AppInput
        type='text'
        placeholder='Nhập Mô tả'
        defaultValue={formDesc}
        onChange={(e) => {
          setFormDesc(e.target.value);
        }}
      />
    </div>
  );
};
export default AddFormCartForm;
