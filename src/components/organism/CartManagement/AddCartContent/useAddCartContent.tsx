import {loadState, saveState} from 'utils/LocalStore';
import {checkValidateForm} from 'utils/formHelper';
import {FormInstance} from 'antd';
import {useEffect, useState} from 'react';

const useAddCartContent = (
  form: FormInstance,
  info: any,
  setDisabled: (value: boolean) => void,
) => {
  const [value, setValue] = useState<any>();
  const handleChangeReactQuill = (value: string) => {
    setValue(value);
  };
  const optionalFields = ['description'];
  const handleCheckFormData = () => {
    const isValidForm = checkValidateForm(form, optionalFields);
    setDisabled(!isValidForm);
  };
  const handleSetFormData = (dataItems: Array<{key: string; value: any}>) => {
    const {draftString} = info;
    let dataDraft = {...loadState(draftString)};
    dataItems.forEach((item) => {
      dataDraft = {
        ...dataDraft,
        [item.key]: item.value,
      };
    });
    saveState(draftString, dataDraft);
  };
  const handleChangeFormData = (e: any) => {
    const fieldInfo = e[0];
    const {name, value} = fieldInfo;
    const data = [
      {
        key: name[0],
        value: value,
      },
    ];
    handleSetFormData(data);
    handleCheckFormData();
  };

  useEffect(() => {
    const {draftString} = info;
    if (draftString) {
      const dataSource = loadState(draftString);
      form.setFieldsValue({
        cartName: dataSource?.cartName,
        description: dataSource?.description,
      });
    }
    handleCheckFormData();
  }, []);
  return {value, handleChangeReactQuill, handleChangeFormData};
};
export default useAddCartContent;
