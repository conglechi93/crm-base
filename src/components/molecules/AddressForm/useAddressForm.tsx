import {FormInstance} from 'antd';
import {ChangeEvent, useEffect, useState} from 'react';
import {
  onGetDistricts,
  onGetProvinces,
  onGetWards,
} from 'redux/actions/Categories';

const useAddressForm = ({
  form,
  dataSource,
}: {
  form: FormInstance;
  dataSource?: any;
}) => {
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [provinceId, setProvinceId] = useState('');
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);

  const [districtDisabled, setDistrictDisabled] = useState(true);
  const [wardDisabled, setWardDisabled] = useState(true);

  useEffect(() => {
    if (dataSource && Object.keys(dataSource).length > 0) {
      const province = dataSource?.province;
      const provinceId = province?.value;
      setProvinceId(provinceId);
      fetchDistricts(provinceId);

      const district = dataSource?.district;
      const districtId = district?.value;
      fetchWards(provinceId, districtId);
    }
  }, [dataSource]);

  useEffect(() => {
    const fetchProvince = async () => {
      const res = (await onGetProvinces()) || [];
      const provinceOptions = res.map((item: any) => ({
        label: item.name,
        value: item.code,
      }));
      setProvinceOptions(provinceOptions);
    };
    fetchProvince();
  }, []);

  const fetchDistricts = async (provinceId: string) => {
    if (!provinceId) return;
    const res = (await onGetDistricts(provinceId)) || [];
    const districtOptions = res.map((item: any) => ({
      label: item.name,
      value: item.code,
    }));
    setDistrictOptions(districtOptions);
    setDistrictDisabled(false);
    setWardDisabled(true);
  };

  const handleChangeProvince = (
    e: ChangeEvent<HTMLSelectElement>,
    option?: any,
  ): void => {
    const provineId: string = option.value;
    form?.setFieldsValue({
      district: null,
      ward: null,
    });
    setProvinceId(provineId);
    fetchDistricts(provineId);
  };

  const fetchWards = async (provinceId: string, districtId: string) => {
    if (!provinceId || !districtId) return;
    const res = (await onGetWards(provinceId, districtId)) || [];
    const wardOptions = res.map((item: any) => ({
      label: item.name,
      value: item.code,
    }));
    setWardOptions(wardOptions);
    setWardDisabled(false);
  };

  const handleChangeDistrict = (
    e: ChangeEvent<HTMLSelectElement>,
    option?: any,
  ): void => {
    const districtId: string = option.value;
    form?.setFieldsValue({
      ward: null,
    });
    fetchWards(provinceId, districtId);
  };

  return {
    provinceOptions,
    districtOptions,
    wardOptions,
    handleChangeProvince,
    handleChangeDistrict,
    districtDisabled,
    wardDisabled,
  };
};

export default useAddressForm;
