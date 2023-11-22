import {loadState} from 'utils/LocalStore';
import {checkValidateForm} from 'utils/formHelper';
import {FormInstance} from 'antd';
import {useEffect} from 'react';

const useStep2 = (
  info: any,
  form: FormInstance,
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void,
  setDisabled: (value: boolean) => void,
  thumbnailImages: Array<any>,
  inventoryImages: Array<any>,
) => {
  const selectFields: any = [];
  const optionalFields = ['videoUrl'];

  useEffect(() => {
    const {draftString} = info;
    const dataSource: any = loadState(draftString);
    if (dataSource) {
      form.setFieldsValue({
        videoUrl: dataSource?.videoUrl,
        inventoryName: dataSource?.inventoryName,
        inventoryExcerpt: dataSource?.inventoryExcerpt,
      });
    }
    handleCheckFormData();
  }, [info]);

  useEffect(() => {
    handleCheckFormData();
  }, [thumbnailImages]);

  const handleChangeFormData = (e: any) => {
    const fieldInfo = e[0];
    const {name, value} = fieldInfo;
    const data = [
      {
        key: name[0],
        value: selectFields.includes(name[0])
          ? {
              key: name[0],
              value: value,
            }
          : value,
      },
    ];
    handleSetFormData(data);
    handleCheckFormData();
  };

  const handleCheckFormData = () => {
    const isValidForm: boolean = checkValidateForm(form, optionalFields);

    if (!isValidForm) {
      setDisabled(true);
      return;
    }

    if (thumbnailImages.length == 0) {
      setDisabled(true);
      return;
    }

    setDisabled(false);
  };
  return {handleChangeFormData};
};

export default useStep2;
