// src/app/Graph/page.tsx
import GraphVis, { NodeScore, EdgeScore } from "@/components/GraphVis";
import graphData from "@/data/sampleGraph.json";

type GraphPageProps = {
  nodes?: NodeScore[];
  edges?: EdgeScore[];
  edgeThreshold?: number;
  nodeThreshold?: number;
};

const defaultNodes = graphData.nodes as NodeScore[];
const defaultEdges = graphData.edges as EdgeScore[];

export default function Page({
  nodes = defaultNodes,
  edges = defaultEdges,
  edgeThreshold = 0.5,
  nodeThreshold = 0.5,
}: GraphPageProps = {}) {
  return (
    <div className="p-4">
      <GraphVis
        nodes={nodes}
        edges={edges}
        edgeThreshold={edgeThreshold}
        nodeThreshold={nodeThreshold}
      />
    </div>
  );
}
