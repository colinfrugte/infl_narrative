// src/components/GraphSection.tsx
import GraphVis, { NodeScore, EdgeScore } from "./GraphVis";

type GraphSectionProps = {
  nodes: NodeScore[];
  edges: EdgeScore[];
  edgeThreshold: number;
  nodeThreshold: number;
};

export default function GraphSection({
  nodes,
  edges,
  edgeThreshold,
  nodeThreshold,
}: GraphSectionProps) {
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
