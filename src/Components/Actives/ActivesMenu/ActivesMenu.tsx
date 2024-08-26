import { memo, useMemo } from "react";
import useFetch from "../../../Hooks/useFetch";
import { getAssets, getLocations } from "../../../Service/service";
import { ESensorType, EStatus, IAsset, ILocation } from "../../../model";
import TreeNode from "./TreeNode/TreeNode";

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
  sensorType?: ESensorType | null;
  status?: EStatus | null;
  gatewayId?: string | null;
  locationId?: string | null;
  children: ITreeNode[];
}

function buildTree(locations: ILocation[], assets: IAsset[]): ITreeNode {
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
  return {
    name: "ROOT",
    id: "ROOT",
    children: rootNodes,
    parentId: null,
    type: EType.LOCATION,
  };
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

  const Tree = useMemo(
    () => (assets && locations ? buildTree(locations, assets) : undefined),
    [assets, locations]
  );

  //Ver de renderizar so o que aparece na tela

  return (
    <div
      style={{
        height: "calc(100% - 20px)",
        border: "1px solid #e6ebef",
        overflow: "auto",
        width: 400,
        padding: 10,
      }}
    >
      {Tree && <TreeNode key={Tree.id} data={Tree} root={true} margin={-10} />}
    </div>
  );
};

export default memo(ActivesMenu);
