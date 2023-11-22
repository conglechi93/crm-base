import {loadState} from 'utils/LocalStore';
import {FormInstance} from 'antd';
import {useEffect} from 'react';
import {onExportCartForm} from 'redux/actions/ConfigManagement';
import {onImportExcelForm} from 'redux/actions/Inventory';
import { useAppDispatch } from 'redux/hook';

const useStep1 = (
  form: FormInstance,
  info: any,
  setDisabled: (value: boolean) => void,
  setFormId: (value: string) => void,
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const {draftString} = info;
    const dataSource = loadState(draftString);

    if (dataSource) {
      form.setFieldsValue({
        cart: dataSource?.cart ? dataSource?.cart : null,
        inventoryTable: dataSource?.inventoryTable
          ? dataSource?.inventoryTable
          : null,
        estateType: dataSource?.estateType ? dataSource?.estateType : null,
      });
    }
    setDisabled(false);
  }, [info]);

  const handleExportExcel = async (): Promise<void> => {
    const {draftString} = info;
    const dataSource = loadState(draftString);
    const formId = dataSource?.formId;
    const inventoryTableId = dataSource?.inventoryTableId;
    console.log('dataSource', dataSource);
    if (!formId) return;
    const res = await onExportCartForm(inventoryTableId);
    if (res) {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'form-file.xlsx');
      document.body.appendChild(link);
      link.click();
    }
  };

  const handleChangeFile = (e: any) => {
    console.log('handleChangeFile', e);
  };

  const handleCustomRequest = async (info: any) => {
    const {onSuccess, onError, file, onProgress} = info;

    const res = await dispatch(onImportExcelForm(file));
    const {id} = res;
    if (id) {
      setFormId(id);
      onSuccess('ok');
      setDisabled(false);
    } else {
      onError('error');
      setDisabled(true);
    }
  };
  return {
    handleChangeFile,
    handleExportExcel,
    handleCustomRequest,
  };
};

export default useStep1;
