import {useState} from 'react';

const useInventoryTableFilter = () => {
  const [statusOptions, statusCartOptions] = useState([]);

  return {statusOptions};
};
export default useInventoryTableFilter;
