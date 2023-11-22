import AppTypo from 'components/atoms/AppTypo';
import {Card} from 'antd';
import styles from './style.module.scss';
import clsx from 'clsx';

type PropsTypes = {
  title: string;
  total: number;
  type: 'duplicate' | 'error' | 'success';
  loading?: boolean;
};
const RecordInfo = (props: PropsTypes) => {
  const {title, total, type, loading} = props;
  console.log('total', total);
  return (
    <Card
      loading={loading}
      title={title}
      className={clsx({
        [styles['record_info_card']]: true,
        [styles[type]]: true,
      })}
    >
      <AppTypo variant='p-xl-semi'>{total}</AppTypo>
    </Card>
  );
};

export default RecordInfo;
