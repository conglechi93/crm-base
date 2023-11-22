import {useEffect, useState} from 'react';
import {onGetCartList} from 'redux/actions/CartManagement';

const useInventoryTableFilter = () => {
  const [cartOptions, setCartOptions] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await onGetCartList({
        page: 1,
        pageSize: 50,
      });
      setCartOptions(
        res?.elements?.map((item: any) => ({
          label: item.cartName,
          value: item.id,
        })) || [],
      );
    };
    getData();
  }, []);
  return {cartOptions};
};
export default useInventoryTableFilter;
