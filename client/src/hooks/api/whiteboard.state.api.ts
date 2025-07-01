import {useState, useCallback} from "react";
import {
    WhiteboardApi,
    WhiteboardStateDto,
    Node as BackendNode,
    Edge as BackendEdge,
    ViewportDto,
} from "@/api/generated/api";
import {whiteboardApiFactory} from "@/api";


import {Node, Edge} from "@xyflow/react";
import {NodeProperties} from "@/types/NodeProperties";

interface UseSaveWhiteboardStateProps {
    whiteboardId: number;
    nodes: Node[];
    edges: Edge[];
    viewport: { x: number; y: number; zoom: number };
}

export function useSaveWhiteboardState({
                                           whiteboardId,
                                           nodes,
                                           edges,
                                           viewport,
                                       }: UseSaveWhiteboardStateProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const saveWhiteboardState = useCallback(async () => {
        setIsSaving(true);
        setError(null);

        try {
            const mappedNodes: BackendNode[] = nodes.map((node) => {
                    const {data} = node;
                    const nodeProperties: NodeProperties = data.nodeProperties;

                    return {
                        id: node.id,
                        whiteboardId: whiteboardId,
                        type: node.type == "ShapeNode" ? `${node.type}:${node.data.shapeType!}` : node.type,
                        positionX: node.position.x,
                        positionY: node.position.y,
                        label: data.label,
                        width: node.measured!.width,
                        height: node.measured!.height,
                        color: nodeProperties.color,
                        borderColor: nodeProperties.borderColor,
                        opacity: nodeProperties.opacity,
                        textColor: nodeProperties.textColor,
                        fontSize: nodeProperties.fontSize,
                        fontFamily: nodeProperties.fontFamily,
                        bold: nodeProperties.isBold,
                        italic: nodeProperties.isItalic,
                        strikethrough: nodeProperties.isStrikethrough,
                        underline: nodeProperties.isUnderline,
                    }
                }
            );

            const mappedEdges: BackendEdge[] = edges.map((edge) => ({
                id: edge.id!,
                whiteboardId: whiteboardId,
                source: edge.source,
                sourceHandle: edge.sourceHandle === null ? undefined : edge.sourceHandle,
                target: edge.target,
                targetHandle: edge.targetHandle === null ? undefined : edge.targetHandle,
            }));

            const viewportDto: ViewportDto = {
                x: viewport.x,
                y: viewport.y,
                zoom: viewport.zoom,
            };

            const whiteboardStateDto: WhiteboardStateDto = {
                nodes: mappedNodes,
                edges: mappedEdges,
                viewportDto,
            };

            const {status, data} = await whiteboardApiFactory.saveWhiteboardState(
                whiteboardId,
                whiteboardStateDto
            );

            setIsSaving(false);
            return {status, data};
        } catch (err) {
            setError(err as Error);
            setIsSaving(false);
            throw err;
        }
    }, [whiteboardId, nodes, edges, viewport]);

    return {saveWhiteboardState, isSaving, error};
}
