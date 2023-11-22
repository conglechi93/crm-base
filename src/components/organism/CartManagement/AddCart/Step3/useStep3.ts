import {useEffect, useState} from 'react';
import {loadState} from 'utils/LocalStore';

const useStep3 = (
  info: any,
  setDisabled: (value: boolean) => void,
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void,
) => {
  const [value, setValue] = useState('');
  const handleChangeReactQuill = (value: string) => {
    setValue(value);
    const data = [
      {
        key: 'description',
        value: value,
      },
    ];
    handleSetFormData(data);
  };
  useEffect(() => {
    setDisabled(!value);
  }, [value]);

  useEffect(() => {
    const {draftString} = info;
    const dataSource: any = loadState(draftString);
    if (dataSource?.description) {
      setValue(dataSource?.description);
    }
  }, [info]);
  return {
    value,
    setValue,
    handleChangeReactQuill,
  };
};

export default useStep3;
