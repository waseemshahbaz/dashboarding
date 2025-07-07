import React from 'react';

export default function SectionHeader({ title, subtitle, className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{title}</h2>
      {subtitle && <p className="text-gray-500 dark:text-gray-300">{subtitle}</p>}
    </div>
  );
} 