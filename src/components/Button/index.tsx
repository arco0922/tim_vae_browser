import React from 'react';
import styles from './Button.module.scss';

interface Props {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = React.memo(function Button({
  text,
  className,
  onClick,
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button__basic} ${
        className ? className : ''
      }`}
      disabled={disabled}
    >
      {text}
    </button>
  );
});
