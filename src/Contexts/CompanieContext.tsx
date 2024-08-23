import { createContext, useContext, useState } from "react";
import { ICompanie } from "../model";

interface ICompanieContext {
  companie?: ICompanie;
  setCompanie: (c: ICompanie) => void;
}

interface ICompanieProviderProps {
  children: React.ReactNode;
}

const CompanieContext = createContext<ICompanieContext | undefined>(undefined);

export const CompanieProvider: React.FC<ICompanieProviderProps> = ({ children }) => {
  const [companie, setCompanie] = useState<ICompanie>();

  return (
    <CompanieContext.Provider value={{ companie, setCompanie }}>
      {children}
    </CompanieContext.Provider>
  );
};

export const useCompanie = () => {
  const context = useContext(CompanieContext)

  if(context === undefined) throw new Error("useCompani must be used with CompanieProvider")

    return context
}