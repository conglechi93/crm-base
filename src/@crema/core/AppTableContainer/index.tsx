import React, {ReactNode} from 'react';
import {StyledQueueAnim} from './index.styled';
import clsx from 'clsx';
import {TablePaginationConfig} from 'antd';
import styles from './style.module.scss';

interface AppTableContainerProps {
  columns: any;
  loading?: boolean;
  data?: Array<any>;
  pagination?: false | TablePaginationConfig | undefined;
  hoverColor?: boolean;
  className: string;
  current?: number | undefined;
  setCurrent?: (current: number) => void;
  pageSize?: number;
  total?: number;
  setPageSize?: (pageSize: number) => void;
  [x: string]: any;
}

const AppTableContainer: React.FC<AppTableContainerProps> = ({
  columns,
  loading = false,
  data,
  current,
  setCurrent,
  pageSize,
  setPageSize,
  total,
  pagination = false,
  className,
  ...rest
}) => {
  return (
    <StyledQueueAnim
      className={clsx({[styles[className]]: true, [styles.table]: true})}
      columns={columns}
      dataSource={data}
      rowKey='id'
      loading={loading}
      pagination={
        data
          ? Number(total) > 0
            ? {
                current,
                pageSize: pageSize,
                showSizeChanger: setPageSize ? true : false,
                total: total,
                responsive: false,
                showLessItems: true,
                pageSizeOptions: [pageSize ?? 5, 10, 15, 20, 30],
                // nextIcon: (
                //   <Image src={NextIcon.src} width={20} height={20} alt="" />
                // ),
                // prevIcon: (
                //   <Image src={PrevIcon.src} width={20} height={20} alt="" />
                // ),
                className: styles.pagination,
              }
            : false
          : false
      }
      onChange={(page, _) => {
        if (setCurrent) {
          setCurrent(page.current ?? 1);
        }
        if (setPageSize) {
          setPageSize(page.pageSize ?? 5);
        }
      }}
      {...rest}
    />
  );
};

export default AppTableContainer;
