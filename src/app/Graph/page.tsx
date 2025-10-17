import GraphSection from "@/components/GraphSection";
import { NodeScore, EdgeScore } from "@/components/GraphVis";
import graphData from "@/data/sampleGraph.json";

const nodes = graphData.nodes as NodeScore[];
const edges = graphData.edges as EdgeScore[];

export default function Page() {
  return (
    <GraphSection
      nodes={nodes}
      edges={edges}
      edgeThreshold={0.5}
      nodeThreshold={0.5}
    />
  );
}
