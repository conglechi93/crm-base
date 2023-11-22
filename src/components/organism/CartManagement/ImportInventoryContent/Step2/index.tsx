import AppTypo from 'components/atoms/AppTypo';
import RecordInfo from 'components/molecules/RecordInfo';
import {pageSize} from 'shared/constants/AppConst';
import {Col, Row} from 'antd';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useAppDispatch} from 'redux/hook';
import {onGetExcelRecordsByKey} from 'redux/actions/Inventory';
import {AppTableContainer} from '@crema';

type PropsTypes = {
  info: any;
  formId: string;
  setDisabled: (value: boolean) => void;
};
const Step2 = (props: PropsTypes) => {
  const {info, formId, setDisabled} = props;
  const dispatch = useAppDispatch();
  const {messages} = useIntl();
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [excelRecordsInfo, setExcelRecordsInfo] = useState({
    success: 0,
    duplicate: 0,
    error: 0,
  });

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    page: currentPage,
    pageSize: pageSize.INVENTORY,
    formId: formId,
    type: '',
  });

  const fetchExcelRecordsByKey = async () => {
    if (!formId) return;
    const res = await dispatch(onGetExcelRecordsByKey(searchParams));
    const excelRecordsInfo = res?.info || {};
    console.log('excelRecordsInfo', excelRecordsInfo);
    const {success, total} = excelRecordsInfo;
    setDisabled(success !== total);
    setExcelRecordsInfo(excelRecordsInfo);

    const tableInfo = res?.table || {};
    const totals = tableInfo?.total || 0;
    const columns = tableInfo?.columns || [];
    const dataSource = tableInfo?.entries || [];
    setTotal(totals);
    setColumns(columns);
    setDataSource(dataSource);
    setLoading(false);
  };

  useEffect(() => {
    if (formId) {
      const newSearchParams = {
        ...searchParams,
        formId: formId,
        page: currentPage,
      };
      setSearchParams(newSearchParams);
      setLoading(true);
    }
  }, [formId, currentPage]);

  useEffect(() => {
    if (loading) {
      fetchExcelRecordsByKey();
    }
  }, [loading]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AppTypo variant='p-md-med'>
            {messages['common.checkUploadData'] as string}
          </AppTypo>
        </Col>
        <Col xs={6}>
          <RecordInfo
            title={messages['common.validPropertyNumber'] as string}
            total={excelRecordsInfo?.success}
            type='success'
          />
        </Col>
        <Col xs={6}>
          <RecordInfo
            title={messages['common.invalidPropertyNumber'] as string}
            total={excelRecordsInfo?.error}
            type='error'
          />
        </Col>
        <Col xs={6}>
          <RecordInfo
            title={messages['common.duplicatePropertyNumber'] as string}
            total={excelRecordsInfo?.duplicate}
            type='duplicate'
          />
        </Col>
        <Col xs={24}>
          <AppTableContainer
            loading={loading}
            columns={columns}
            data={dataSource}
            total={total}
            pageSize={pageSize.INVENTORY}
            current={currentPage}
            setCurrent={setCurrentPage}
            scroll={{x: 1000, y: 'calc(100vh - 290px)'}}
            className=''
          />
        </Col>
      </Row>
    </div>
  );
};

export default Step2;
