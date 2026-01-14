export const serializeLexical = (node: any): any => {
    if (!node) return null;
  
    if (Array.isArray(node)) {
      return node.map((child, i) => <React.Fragment key={i}>{serializeLexical(child)}</React.Fragment>);
    }
  
    if (typeof node === 'string') {
        return node;
    }
    
    if (typeof node !== 'object') {
        return String(node);
    }
  
    // Handle Lexical Root
    if (node.root && node.root.children) {
        return serializeLexical(node.root.children);
    }

    // Handle Children recursively
    const children = node.children ? serializeLexical(node.children) : null;
  
    switch (node.type) {
      case 'root':
          return <>{children}</>;
      case 'paragraph':
        return (
            <p className="mb-4 text-lg leading-relaxed text-gray-800">
                {children}
            </p>
        );
      case 'heading':
         const Tag = `h${node.tag?.slice(1) || '1'}` as keyof JSX.IntrinsicElements;
         return <Tag className="font-molodo mb-4 mt-8">{children}</Tag>
      case 'text':
        let text = <>{node.text}</>;
        if (node.format & 1) text = <strong>{text}</strong>; // Bold
        if (node.format & 2) text = <em>{text}</em>; // Italic
        if (node.format & 8) text = <u>{text}</u>; // Underline
        return text;
      case 'list':
          const ListTag = node.listType === 'number' ? 'ol' : 'ul';
          return <ListTag className="list-inside list-disc mb-4 ml-4">{children}</ListTag>;
      case 'listitem':
          return <li className="mb-1">{children}</li>;
      case 'quote':
          return <blockquote className="border-l-4 border-amber-500 pl-4 italic my-4">{children}</blockquote>;
      case 'link':
          return <a href={node.fields.url} target={node.fields.newTab ? '_blank' : '_self'} className="text-amber-600 hover:underline">{children}</a>
      default:
        return children;
    }
};

import React from 'react';
