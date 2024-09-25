import React from 'react';

export default function Faq({title, content}) {
  return (
    <div className="card">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
    </div>
  );
}
