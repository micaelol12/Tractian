import axios from "axios";
import { ICompanie } from "../model";

const API = "https://fake-api.tractian.com";

export const getCompanies = () => {
  return axios.get<ICompanie[]>(API + "/companies");
};
