import React from 'react';

export default function Faq({title, content}) {
  return (
    <div className="faq">
        <div className="title">{title}</div>
        <div className="answer">{content}</div>
    </div>
  );
}
