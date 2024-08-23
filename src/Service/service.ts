import axios from "axios";
import { IAsset, ICompanie, ILocation } from "../model";

const API = "https://fake-api.tractian.com";

export const getCompanies = () => {
  return axios.get<ICompanie[]>(API + "/companies");
};

export const getLocations = (companyId: string) => {
  return axios.get<ILocation[]>(API + `/companies/${companyId}/locations` );
};

export const getAssets = (companyId: string) => {
  return axios.get<IAsset[]>(API + `/companies/${companyId}/assets` );
};
