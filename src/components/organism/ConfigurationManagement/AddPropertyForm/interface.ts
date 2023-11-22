export type AddFormType = {
  onSubmit: (e: any, isValid?: boolean) => void;
  isEdit?: boolean;
  data?: any;
};

export type Option = {
  id: number;
  value: string;
};
