import {useEffect, useState} from 'react';
import {Form} from 'antd';
import {AddPickListType} from './interface';
import {onGetPickListById} from 'redux/actions/PickList';
import {Option} from '../AddPropertyForm/interface';

const useAddPickListForm = (props: AddPickListType) => {
  const {onSubmit, type, data} = props;

  const [form] = Form.useForm();
  const [options, setOptions] = useState<Option[]>([]);
  const [indexCount, setIndexCount] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (type === 'edit' || type === 'view') {
      const getPickListById = async () => {
        const res = await onGetPickListById(data.id);
        setOptions(
          res.pickListOptions.map((option: any, index: number) => ({
            value: option.optionLabel,
            id: index,
          })),
        );
        form.setFieldsValue({
          name: res.name,
          description: res.description,
        });
        setFormData(form.getFieldsValue());
        setIndexCount(res.pickListOptions.length);
      };
      getPickListById();
    } else if (type === 'add') {
      setOptions([{id: 0, value: ''}]);
    }
  }, []);

  useEffect(() => {
    onSubmit({
      ...formData,
      shopId: 1,
      pickListOptions: options.map((option) => {
        return {optionLabel: option.value};
      }),
    });
  }, [formData, onSubmit, options]);

  const handleFormChange = (_: any, formData: any) => {
    setFormData(formData);
  };

  function addOption(id: number) {
    const newOption = {id: indexCount + 1, value: ''};
    const newOptions = [...options];
    newOptions.splice(id + 1, 0, newOption);
    setOptions(newOptions);
    setIndexCount((prevState) => prevState + 1);
  }

  function deleteOption(id: number) {
    const newOptions = options.filter((option) => option.id !== id);
    setOptions(newOptions);
  }

  function handleOptionChange(id: number, value: string) {
    const newOptions = options.map((option) => {
      if (option.id === id) {
        return {...option, value};
      }
      return option;
    });
    setOptions(newOptions);
  }

  function handleDragStart(event: any, id: number) {
    event.dataTransfer.setData('id', id.toString());
  }

  function handleDragOver(event: any) {
    event.preventDefault();
  }

  function handleDrop(event: any, id: number) {
    event.preventDefault();
    const draggedId = parseInt(event.dataTransfer.getData('id'));
    const draggedOption: any = options.find(
      (option) => option.id === draggedId,
    );
    const draggedIndex = options.findIndex((option) => option.id === draggedId);
    const dropIndex = options.findIndex((option) => option.id === id);
    const newOptions = [...options];
    newOptions.splice(draggedIndex, 1);
    newOptions.splice(dropIndex, 0, draggedOption);
    setOptions(newOptions);
  }

  return {
    form,
    handleFormChange,
    options,
    addOption,
    deleteOption,
    handleOptionChange,
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
};
export default useAddPickListForm;
