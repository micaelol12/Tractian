import { memo, useMemo } from "react";
import useFetch from "../../../Hooks/useFetch";
import { getAssets, getLocations } from "../../../Service/service";
import { ESensorType, EStatus, IAsset, ILocation } from "../../../model";
import TreeNode from "./TreeNode/TreeNode";
import { useCompanie } from "../../../Contexts/CompanieContext";
import Search from "./Search";

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

function filterTreeByStatus(
  node: ITreeNode,
  search: string,
  status?: EStatus,
  type?: ESensorType
): ITreeNode | null {
  // Filtrar os filhos primeiro
  const filteredChildren = node.children
    .map((child) => filterTreeByStatus(child, search, status, type)) // Aplicar o filtro recursivamente
    .filter((child) => child !== null) as ITreeNode[]; // Remover nós nulos

  const matchesStatus = status ? node.status === status : true;
  const matchesType = type ? node.sensorType === type : true;
  const matchersSearch =
    search.length > 0
      ? node.name.toLowerCase().includes(search.toLowerCase())
      : true;

  // Verifica se o nó atual ou algum dos seus filhos tem o status desejado
  if (
    (matchesStatus && matchesType && matchersSearch) ||
    filteredChildren.length > 0
  ) {
    return {
      ...node,
      children: filteredChildren,
    };
  }

  // Se o nó não tem o status desejado e não tem filhos correspondentes, retorna null
  return null;
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
      locationId: asset.locationId,
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
  let rootNodes: ITreeNode[] = Object.values(locationMap).filter(
    (location) => !location.parentId
  );

  console.log("das", Object.values(assetMap));

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
  const { sensorType, status, search } = useCompanie();

  const { data: locations } = useFetch({
    axiosCallback: getLocations,
    params: companieId,
  });

  const { data: assets } = useFetch({
    axiosCallback: getAssets,
    params: companieId,
  });

  const tree = useMemo(
    () => (assets && locations ? buildTree(locations, assets) : undefined),
    [assets, locations]
  );

  const filtered = tree
    ? filterTreeByStatus(tree, search, status, sensorType)
    : undefined;

  return (
    <div
      style={{
        height: "calc(100% - 20px)",
        border: "1px solid #e6ebef",
        overflow: "auto",
        width: 400,
        gap: 10,
        padding: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Search />
      {filtered && (
        <TreeNode key={filtered.id} data={filtered} root={true} margin={-10} />
      )}

      {!filtered && <h5>Nenhum asset ou location encontrados!</h5>}
    </div>
  );
};

export default memo(ActivesMenu);
