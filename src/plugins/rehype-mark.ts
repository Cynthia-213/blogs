import type { RehypePlugin } from '@astrojs/markdown-remark';
import type { Element, Parent, Root } from 'hast';

function createMark(): Element {
  return {
    type: 'element',
    tagName: 'mark',
    properties: {},
    children: []
  };
}

function transform(parent: Parent, insideCode = false) {
  const children = [] as typeof parent.children;
  let activeMark: Element | undefined;

  for (const child of parent.children) {
    const isCode =
      insideCode || (child.type === 'element' && (child.tagName === 'code' || child.tagName === 'pre'));

    if (child.type === 'text' && !isCode) {
      let remaining = child.value;

      while (remaining) {
        const markerIndex = remaining.indexOf('==');

        if (!activeMark) {
          if (markerIndex === -1) {
            children.push({ type: 'text', value: remaining });
            break;
          }

          if (markerIndex > 0) {
            children.push({ type: 'text', value: remaining.slice(0, markerIndex) });
          }
          activeMark = createMark();
          remaining = remaining.slice(markerIndex + 2);
        } else {
          if (markerIndex === -1) {
            activeMark.children.push({ type: 'text', value: remaining });
            break;
          }

          if (markerIndex > 0) {
            activeMark.children.push({ type: 'text', value: remaining.slice(0, markerIndex) });
          }
          children.push(activeMark);
          activeMark = undefined;
          remaining = remaining.slice(markerIndex + 2);
        }
      }
      continue;
    }

    if (activeMark && (child.type === 'element' || child.type === 'text' || child.type === 'comment')) {
      activeMark.children.push(child);
    } else {
      if ('children' in child) transform(child, isCode);
      children.push(child);
    }
  }

  if (activeMark) {
    children.push({ type: 'text', value: '==' }, ...activeMark.children);
  }

  parent.children = children;
}

const rehypeMark: RehypePlugin = () => (tree: Root) => {
  transform(tree);
};

export default rehypeMark;
