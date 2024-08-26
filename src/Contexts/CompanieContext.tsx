import { createContext, useContext, useState } from "react";
import { IAsset, ICompanie } from "../model";

interface ICompanieContext {
  companie?: ICompanie;
  setCompanie: (c: ICompanie) => void;
  component?: IAsset;
  setComponent: (c: IAsset) => void;
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

  return (
    <CompanieContext.Provider
      value={{ companie, setCompanie, component, setComponent }}
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
