export type AddFormType = {
  onSubmit: (e: any) => void;
  isEdit?: boolean;
  data?: any;
  type: 'add' | 'edit' | 'view';
};
