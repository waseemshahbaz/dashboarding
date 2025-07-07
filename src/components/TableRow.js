import React from 'react';

export default function TableRow({ children, className = '', ...props }) {
  return (
    <tr className={`border-b dark:border-gray-700 ${className}`} {...props}>
      {children}
    </tr>
  );
} 