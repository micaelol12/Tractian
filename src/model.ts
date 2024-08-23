export interface ICompanie {
  id: string;
  name: string;
}

export interface ILocation {
  id: string;
  name: string;
  parentId: string | null;
}

export interface IAsset {
  id: string;
  name: string;
  parentId: string | null;
  sensorId: string;
  sensorType: string | null;
  status: string;
  gatewayId: string;
  locationId: string | null;
}
