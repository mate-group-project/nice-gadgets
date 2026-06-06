import React from 'react';
import './Section.scss';

interface SectionProps {
  title?: string;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title = 'Some title',
  children,
}) => {
  return (
    <section className="section">
      <h2 className="section__title">{title}</h2>
      {children ? children : null}
    </section>
  );
};
