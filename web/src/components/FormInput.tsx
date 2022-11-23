import { FC } from "react";
import style from "./FormInput.module.scss";

type Props = {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput: FC<Props> = ({ label, type, value, onChange }) => {
  return (
    <div className={style["group"]}>
      <input
        type={type}
        id={label}
        className={style.input}
        required
        value={value}
        onChange={onChange}
      />
      <label htmlFor={label} className={style["label"]}>
        {label}
      </label>
    </div>
  );
};
