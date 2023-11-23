import {useEffect, useState} from 'react';
import {FormInstance} from 'antd';
import {onGetInvestor} from 'redux/actions/Categories';
import {checkValidateForm} from 'utils/FormHelper';
import {loadState} from 'utils/LocalStore';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';

const useStep1 = ({
  info,
  form,
  setDisabled,
  handleSetFormData,
}: {
  info: any;
  form: FormInstance;
  setDisabled: (value: boolean) => void;
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void;
}) => {
  const {categories} = useSelector((state: RootState) => state.category);
  const [investorOptions, setInvestorOptions] = useState([]);
  const [legalDocsOptions, setLegalDocsOptions] = useState([]);
  const [dataSource, setDataSource] = useState();
  const searchObject = {
    page: 1,
    pageSize: 10,
    searchText: '',
  };

  const fetchInvestors = async () => {
    const res = await onGetInvestor({searchObject});
    const elements = res?.elements || [];
    const investorOptions = elements?.map((item: any) => ({
      label: item.name,
      value: item.code,
    }));
    setInvestorOptions(investorOptions);
  };

  useEffect(() => {
    fetchInvestors();
    const fetchLegalDoc = () => {
      const legalDocCatList = categories?.legalDocsCat || [];
      const list: any = [{value: '', label: 'Chọn loại giấy tờ'}];
      legalDocCatList.forEach((item: any) => {
        list.push({value: item.code, label: item.name});
      });
      setLegalDocsOptions(list);
    };
    fetchLegalDoc();
  }, []);

  const optionalFields = [
    'investor',
    'lowestPrice',
    'highestPrice',
    'district',
    'ward',
    'street',
    'legalDoc',
  ];
  const selectFields = ['investor', 'legalDoc', 'province', 'district', 'ward'];

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
    setDisabled(!isValidForm);
  };

  useEffect(() => {
    const {draftString} = info;
    const dataSource: any = loadState(draftString);
    if (dataSource) {
      form.setFieldsValue({
        cartName: dataSource.cartName,
        acreage: dataSource.acreage,
        scale: dataSource.scale,
        investor: dataSource.investor
          ? {
              label: dataSource.investor.label,
              value: dataSource.investor.value,
            }
          : null,
        lowestPrice: dataSource.lowestPrice,
        highestPrice: dataSource.highestPrice,
        legalDoc: dataSource.legalDoc
          ? {
              label: dataSource.legalDoc.label,
              value: dataSource.legalDoc.value,
            }
          : null,
        province: dataSource.province
          ? {
              label: dataSource.province.label,
              value: dataSource.province.value,
            }
          : null,
        district: dataSource.district
          ? {
              label: dataSource.district.label,
              value: dataSource.district.value,
            }
          : null,
        ward: dataSource.ward
          ? {
              label: dataSource.ward.label,
              value: dataSource.ward.value,
            }
          : null,
        street: dataSource.street,
      });
      setDataSource(dataSource);
    }
    handleCheckFormData();
  }, []);

  return {dataSource, investorOptions, legalDocsOptions, handleChangeFormData};
};

export default useStep1;
