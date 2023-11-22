export type AddPickListType = {
  onSubmit: (e: any) => void;
  type: 'view' | 'edit' | 'add';
  data?: any;
};
