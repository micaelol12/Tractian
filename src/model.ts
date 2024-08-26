export interface ICompanie {
  id: string;
  name: string;
}

export interface ILocation {
  id: string;
  name: string;
  parentId: string | null;
}

export enum ESensorType {
  ENERGY = "energy",
  VIBRATION = "vibration",
}

export enum EStatus {
  OPERATING = "operating",
  ALERT = "alert",
}

export interface IAsset {
  id: string;
  name: string;
  parentId: string | null;
  sensorId: string;
  sensorType: ESensorType | null;
  status: EStatus;
  gatewayId: string;
  locationId: string | null;
}
