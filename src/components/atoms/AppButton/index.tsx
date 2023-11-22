import React from 'react';
import {Button} from 'antd';
import {ButtonProps} from './interface';
import clsx from 'clsx';
import styles from './style.module.scss';

const AppButton = (props: ButtonProps) => {
  const {
    type,
    disabled,
    loading,
    ghost,
    href,
    icon,
    onClick,
    children,
    htmlType,
  } = props;
  return (
    <div className={styles.button_wrapper}>
      <Button
        {...props}
        type={type}
        className={clsx({
          [styles[type]]: true,
          [styles.disabled]: disabled,
          [styles.default]: true,
          [styles.ghost]: ghost,
        })}
        disabled={disabled}
        loading={loading}
        ghost={ghost}
        href={href}
        icon={icon}
        onClick={onClick}
        htmlType={htmlType}
      >
        {children}
      </Button>
    </div>
  );
};

export default AppButton;
