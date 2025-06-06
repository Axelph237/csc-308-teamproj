import { ComponentProps, ReactNode } from "react";

interface FormInputProps extends ComponentProps<"input"> {
  icon?: ReactNode;
  label: string;
}

export default function FormInput({
  className,
  label,
  icon,
  ...rest
}: FormInputProps) {
  return (
    <label className={`${className} flex flex-col gap-2`}>
      <div className="form-input-label-container flex flex-row items-center gap-2">
        <b className="text-lg text-secondary-300">{label}</b>
        {icon && icon}
      </div>
      <input
        {...rest}
        className="outline-none border-b-2 border-transparent focus:border-accent-500 transition-all duration-300"
      />
    </label>
  );
}
