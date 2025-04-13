import React, { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const IntersectTarget = forwardRef<HTMLDivElement>((_props, ref) => {
  return <div className="h-1" />;
});

export default IntersectTarget;
