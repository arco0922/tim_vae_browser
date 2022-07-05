import React from 'react';

interface Props {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  className?: string;
}

export const SliderWithState = ({
  value,
  setValue,
  min,
  max,
  step,
  disabled = false,
  className,
}: Props) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = Number(event.target.value);
      setValue(newVal);
    },
    [setValue],
  );

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      value={value}
      onChange={handleChange}
      className={className}
    />
  );
};
