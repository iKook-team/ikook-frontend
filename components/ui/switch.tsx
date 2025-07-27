import React from "react";

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Switch: React.FC<SwitchProps> = (props) => {
  return <input type="checkbox" role="switch" {...props} />;
};
