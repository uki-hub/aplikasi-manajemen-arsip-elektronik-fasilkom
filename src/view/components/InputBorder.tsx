import { cn } from "@/lib/utils";
import React, { ReactElement, useState, forwardRef } from "react";

interface InputBorderProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
  containerclassname?: string;
  inputclassname?: string;
  righticon?: ReactElement;
}

const InputBorder = forwardRef<HTMLInputElement, InputBorderProps>(
  (props, ref) => {
    const [isFocus, setIsFocus] = useState(false);
    const [isNotEmpty, setIsNotEmpty] = useState(false);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
      setIsNotEmpty(e.target.value?.trim() != "");

    return (
      <div
        className={cn(
          "relative w-full pb-0.5 flex flex-row items-center border-b border-black",
          props.containerclassname
        )}
      >
        <input
          {...props}
          ref={ref}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChangeHandler}
          placeholder={props.placeholder}
          className={cn(
            "w-full outline-none bg-transparent placeholder-gray-600",
            props.inputclassname
          )}
        />
        <span
          className={cn(
            "absolute transition-all",
            isFocus || isNotEmpty
              ? "translate-y-[-110%] text-sm"
              : "translate-y-[0%]"
          )}
        >
          {props.placeholder}
        </span>
        {props.righticon ? props.righticon : null}
      </div>
    );
  }
);

InputBorder.displayName = "InputBorder";

export default InputBorder;
