import React from "react";

function TextInputBox(props) {
  return (
    <label className={props.className}>
      <span className={`${props.inputClassName || "text-black"} `}>
        {props.inputName}
      </span>
      <input
        className={`${
          props.errors && "border-red-500"
        } appearance-none border-2 border-gray-700 rounded-lg w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-1`}
        type={props.type}
        onChange={props.onChange}
        maxlength={props.maxlength}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
      />
      <span className="text-red-500 text-sm whitespace-pre">
        {props.errors}
      </span>
    </label>
  );
}

export default TextInputBox;
