import {FormInstance} from 'antd';

export type AddFormType = {
  form: FormInstance;
  isEdit?: boolean;
  data?: any;
  type: 'add' | 'edit' | 'view';
};
