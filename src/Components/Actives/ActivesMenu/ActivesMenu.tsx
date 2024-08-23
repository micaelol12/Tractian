import { memo, useMemo } from "react";
import useFetch from "../../../Hooks/useFetch";
import { getAssets, getLocations } from "../../../Service/service";
import { IAsset, ILocation } from "../../../model";
import TreeNode from "./TreeNode";

interface IActivesMenuProps {
  companieId: string;
}

export enum EType {
  LOCATION = "Location",
  ASSET = "Asset",
  COMPONENT = "Component",
}

export interface ITreeNode {
  id: string;
  name: string;
  parentId: string | null;
  type: EType;
  sensorId?: string | null;
  sensorType?: string | null;
  status?: string | null;
  gatewayId?: string | null;
  locationId?: string | null;
  children: ITreeNode[];
}

function buildTree(locations: ILocation[], assets: IAsset[]): ITreeNode[] {
  const locationMap: { [key: string]: ITreeNode } = {};
  const assetMap: { [key: string]: ITreeNode } = {};

  // Passo 1: Criar nós da árvore para as localizações e organizá-los em uma hierarquia
  locations.forEach((location) => {
    const node: ITreeNode = {
      id: location.id,
      name: location.name,
      type: EType.LOCATION,
      children: [],
      parentId: location.parentId,
    };

    locationMap[location.id] = node;

    if (location.parentId) {
      locationMap[location.parentId]?.children.push(node);
    }
  });

  // Passo 2: Criar nós da árvore para os assets e organizá-los sob localizações ou outros assets
  assets.forEach((asset) => {
    const node: ITreeNode = {
      id: asset.id,
      name: asset.name,
      type: asset.sensorType ? EType.COMPONENT : EType.ASSET,
      sensorId: asset.sensorId,
      sensorType: asset.sensorType,
      status: asset.status,
      gatewayId: asset.gatewayId,
      parentId: asset.parentId,
      children: [],
    };
    assetMap[asset.id] = node;

    if (asset.locationId) {
      locationMap[asset.locationId]?.children.push(node);
    } else if (asset.parentId) {
      assetMap[asset.parentId]?.children.push(node);
    }
  });

  // Passo 3: Identificar os nós raiz (localizações sem um pai)
  const rootNodes: ITreeNode[] = Object.values(locationMap).filter(
    (location) => !location.parentId
  );

  // Adicionar qualquer asset ou componente desvinculado à raiz (assets sem locationId ou parentId)
  const unlinkedAssets = Object.values(assetMap).filter(
    (asset) => !asset.locationId && !asset.parentId
  );
  rootNodes.push(...unlinkedAssets);

  // Retornar um único nó raiz que representa toda a árvore
  return rootNodes;
}

const ActivesMenu: React.FC<IActivesMenuProps> = ({ companieId }) => {
  // TODO juntas as duas requisições no axios
  const {
    data: locations,
    error,
    loading,
  } = useFetch({
    axiosCallback: getLocations,
    params: companieId,
  });

  const { data: assets } = useFetch({
    axiosCallback: getAssets,
    params: companieId,
  });

  const parents = useMemo(
    () => (assets && locations ? buildTree(locations, assets) : undefined),
    [assets, locations]
  );

  //Ver de renderizar so o que aparece na tela
  
  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      {parents?.map((d) => (
        <TreeNode key={d.id} data={d} />
      ))}
    </div>
  );
};

export default memo(ActivesMenu);
