import React from 'react';
import styles from './Button.module.scss';

interface Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

export const Button = React.memo(function Button({
  text,
  className,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button__basic} ${
        className ? className : ''
      }`}
    >
      {text}
    </button>
  );
});
