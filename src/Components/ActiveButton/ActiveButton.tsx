import { memo } from "react";
import "./ActiveButton.css";

interface IActiveButtonProps {
  selected?: boolean;
  onClick?: () => void;
  label: string;
  icon?: React.ReactNode;
  disable?: boolean;
}

const ActiveButton: React.FC<IActiveButtonProps> = ({
  onClick,
  selected,
  icon,
  label,disable
}) => {

  let ClassName = "ActiveButton"

  if(selected){
    ClassName += " selected"
  }

  if(disable){
    ClassName += " disabled"

  }

  return (
    <div
      className={ClassName}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default memo(ActiveButton);
