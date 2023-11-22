import {memo, useEffect} from 'react';
import useAddCart from './useAddCart';
import AppProgress from 'components/molecules/AppProgress';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import {AddCartProps} from './interface';
import {Form} from 'antd';
import {loadState, saveState} from 'utils/LocalStore';

const AddCart = (props: AddCartProps) => {
  const {info, current, setDisabled} = props;
  const [form] = Form.useForm();
  const {items} = useAddCart(form);

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

  return (
    <div>
      <AppProgress items={items} current={current} />
      {
        {
          0: (
            <Step1
              info={info}
              setDisabled={setDisabled}
              handleSetFormData={handleSetFormData}
            />
          ),
          1: (
            <Step2
              info={info}
              setDisabled={setDisabled}
              handleSetFormData={handleSetFormData}
            />
          ),
          2: (
            <Step3
              info={info}
              setDisabled={setDisabled}
              handleSetFormData={handleSetFormData}
            />
          ),
        }[current]
      }
    </div>
  );
};

export default AddCart;
