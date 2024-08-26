import { createContext, useContext, useState } from "react";
import { ESensorType, EStatus, IAsset, ICompanie } from "../model";

interface ICompanieContext {
  setComponent: (c: IAsset) => void;
  setCompanie: (c: ICompanie) => void;
  setSensorType: (t?: ESensorType) => void;
  setStatus: (t?: EStatus) => void;
  companie?: ICompanie;
  component?: IAsset;
  status: EStatus | undefined;
  sensorType: ESensorType | undefined;
}

interface ICompanieProviderProps {
  children: React.ReactNode;
}

const CompanieContext = createContext<ICompanieContext | undefined>(undefined);

export const CompanieProvider: React.FC<ICompanieProviderProps> = ({
  children,
}) => {
  const [companie, setCompanie] = useState<ICompanie>();
  const [component, setComponent] = useState<IAsset>();
  const [sensorType, setSensorType] = useState<ESensorType>();
  const [status, setStatus] = useState<EStatus>();

  return (
    <CompanieContext.Provider
      value={{
        companie,
        setCompanie,
        component,
        setComponent,
        setSensorType,
        setStatus,
        status,
        sensorType,
      }}
    >
      {children}
    </CompanieContext.Provider>
  );
};

export const useCompanie = () => {
  const context = useContext(CompanieContext);

  if (context === undefined)
    throw new Error("useCompani must be used with CompanieProvider");

  return context;
};
