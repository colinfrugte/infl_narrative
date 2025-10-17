// src/components/GraphVis.tsx
"use client";

import { useEffect, useRef } from "react";
import { DataSet, Edge, Network, Node } from "vis-network/standalone";

export interface NodeScore {
  id: string;
  score: number;
}
export interface EdgeScore {
  source: string;
  target: string;
  score: number;
}

export interface GraphProps {
  nodes: NodeScore[];
  edges: EdgeScore[];
  edgeThreshold: number;
  nodeThreshold: number;
}

export default function GraphVis({
  nodes,
  edges,
  edgeThreshold,
  nodeThreshold,
}: GraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  const nodesDS = useRef(new DataSet<Node>());
  const edgesDS = useRef(new DataSet<Edge>());

  useEffect(() => {
    if (!containerRef.current || networkRef.current) return;

    networkRef.current = new Network(
      containerRef.current,
      { nodes: nodesDS.current, edges: edgesDS.current },
      { physics: { enabled: true } }
    );

    networkRef.current.once("stabilizationIterationsDone", () => {
      networkRef.current!.stopSimulation();
      networkRef.current!.setOptions({ physics: false });
    });
  }, []);

  useEffect(() => {
    if (!networkRef.current) return;

    const filteredNodes = nodes
      .filter((n) => n.score >= nodeThreshold)
      .map<Node>((n) => ({ id: n.id, label: n.id, color: "#D3D3D3" }));

    const allowedIds = new Set(filteredNodes.map((n) => n.id));

    const filteredEdges = edges
      .filter(
        (e) =>
          e.score >= edgeThreshold &&
          allowedIds.has(e.source) &&
          allowedIds.has(e.target)
      )
      .map<Edge>((e) => ({
        id: `${e.source}→${e.target}`,
        from: e.source,
        to: e.target,
        arrows: "to",
        color: "#D3D3D3",
      }));

    nodesDS.current.clear();
    edgesDS.current.clear();
    nodesDS.current.add(filteredNodes);
    edgesDS.current.add(filteredEdges);
  }, [nodes, edges, edgeThreshold, nodeThreshold]);

  return <div ref={containerRef} style={{ height: 600 }} />;
}
