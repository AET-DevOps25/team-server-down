import { Node } from '@xyflow/react';
import { NodeProperties, defaultShapeNodeProperties } from '@/types/NodeProperties';
import { updateNode } from "@/util/updateNode";

describe('updateNode', () => {
  const createTestNode = (id: string, label: string = '', nodeProperties: Partial<NodeProperties> = {}): Node => ({
    id,
    type: 'default',
    position: { x: 0, y: 0 },
    data: {
      label,
      nodeProperties: {
        ...defaultShapeNodeProperties,
        ...nodeProperties
      }
    }
  });

  test('updates label only', () => {
    const nodes: Node[] = [
      createTestNode('1', 'old label'),
      createTestNode('2', 'other node')
    ];

    const updatedNodes = updateNode('1', { label: 'new label' })(nodes);

    expect(updatedNodes[0].data.label).toBe('new label');
    expect(updatedNodes[1].data.label).toBe('other node');
    expect(updatedNodes[0].data.nodeProperties).toEqual(nodes[0].data.nodeProperties);
  });

  test('updates node properties only', () => {
    const initialProperties = {
      ...defaultShapeNodeProperties,
      color: '#FF0000',
      fontSize: 24
    };
    const nodes: Node[] = [
      createTestNode('1', 'test', initialProperties),
      createTestNode('2', 'other')
    ];

    const newProperties = { color: '#0000FF' };
    const updatedNodes = updateNode('1', { nodeProperties: newProperties })(nodes);

    expect(updatedNodes[0].data.nodeProperties).toEqual({
      ...initialProperties,
      ...newProperties
    });
    expect(updatedNodes[0].data.label).toBe('test');
    expect(updatedNodes[1]).toEqual(nodes[1]);
  });

  test('updates both label and properties', () => {
    const initialProperties = {
      ...defaultShapeNodeProperties,
      color: '#FF0000',
      fontSize: 24
    };
    const nodes: Node[] = [
      createTestNode('1', 'old label', initialProperties)
    ];

    const updatedNodes = updateNode('1', {
      label: 'new label',
      nodeProperties: { color: '#0000FF' }
    })(nodes);

    expect(updatedNodes[0].data.label).toBe('new label');
    expect(updatedNodes[0].data.nodeProperties).toEqual({
      ...initialProperties,
      color: '#0000FF'
    });
  });

  test('handles non-existent node ID', () => {
    const nodes: Node[] = [createTestNode('1', 'test')];
    const updatedNodes = updateNode('non-existent', { label: 'new' })(nodes);
    expect(updatedNodes).toEqual(nodes);
  });

  test('handles empty nodes array', () => {
    const nodes: Node[] = [];
    const updatedNodes = updateNode('1', { label: 'new' })(nodes);
    expect(updatedNodes).toEqual([]);
  });

  test('handles undefined node properties', () => {
    const nodes: Node[] = [
      {
        id: '1',
        type: 'default',
        position: { x: 0, y: 0 },
        data: { label: 'test' }
      }
    ];

    const updatedNodes = updateNode('1', {
      nodeProperties: { color: '#0000FF' }
    })(nodes);

    expect(updatedNodes[0].data.nodeProperties).toEqual({
      ...defaultShapeNodeProperties,
      color: '#0000FF'
    });
  });

  test('preserves other node data properties', () => {
    const nodes: Node[] = [{
      id: '1',
      type: 'default',
      position: { x: 0, y: 0 },
      data: {
        label: 'test',
        nodeProperties: {
          ...defaultShapeNodeProperties,
          color: '#FF0000'
        },
        otherProp: 'value'
      }
    }];

    const updatedNodes = updateNode('1', {
      label: 'new label',
      nodeProperties: { fontSize: 24 }
    })(nodes);

    expect(updatedNodes[0].data).toEqual({
      label: 'new label',
      nodeProperties: {
        ...defaultShapeNodeProperties,
        color: '#FF0000',
        fontSize: 24
      },
      otherProp: 'value'
    });
  });

  test('handles partial property updates', () => {
    const initialProperties = {
      ...defaultShapeNodeProperties,
      color: '#FF0000',
      fontSize: 16,
      fontFamily: 'Arial'
    };
    const nodes: Node[] = [
      createTestNode('1', 'test', initialProperties)
    ];

    const updatedNodes = updateNode('1', {
      nodeProperties: { fontSize: 24 }
    })(nodes);

    expect(updatedNodes[0].data.nodeProperties).toEqual({
      ...initialProperties,
      fontSize: 24
    });
  });

  test('updates text styling properties', () => {
    const nodes: Node[] = [createTestNode('1', 'test')];

    const styleUpdates = {
      isBold: true,
      isItalic: true,
      isUnderline: true,
      isStrikethrough: true
    };

    const updatedNodes = updateNode('1', {
      nodeProperties: styleUpdates
    })(nodes);

    expect(updatedNodes[0].data.nodeProperties).toEqual({
      ...defaultShapeNodeProperties,
      ...styleUpdates
    });
  });
});