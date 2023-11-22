import AppProgress from 'components/molecules/AppProgress';
import Step1 from './Step1';
import Step2 from './Step2';
import useAddInventoryContent from './useAddInventoryContent';
import {saveState, loadState} from 'utils/LocalStore';

type PropsTypes = {
  info: any;
  current: number;
  setCurrent?: (value: number) => void;
  setDisabled: (value: boolean) => void;
};
const AddInventoryContent = (props: PropsTypes) => {
  const {info, current, setDisabled} = props;
  const {items} = useAddInventoryContent();
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
      <AppProgress current={current} items={items} />
      {
        {
          0: (
            <Step1
              info={info}
              handleSetFormData={handleSetFormData}
              setDisabled={setDisabled}
            />
          ),
          1: (
            <Step2
              info={info}
              handleSetFormData={handleSetFormData}
              setDisabled={setDisabled}
            />
          ),
        }[current]
      }
    </div>
  );
};

export default AddInventoryContent;
