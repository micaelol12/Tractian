import { memo } from "react";
import { ICompanie } from "../../../model";
import "./Companie.css";

interface ICompanieProps {
  companie: ICompanie;
  selected: boolean;
  onClick: (companie: ICompanie) => void;
}

const Companie: React.FC<ICompanieProps> = ({
  companie,
  onClick,
  selected,
}) => {
  const onClickHandler = () => {
    onClick(companie);
  };

  return (
    <div className={selected ? "Companie selected" : "Companie"} onClick={onClickHandler}>
      {companie.name}
    </div>
  );
};

export default memo(Companie);
