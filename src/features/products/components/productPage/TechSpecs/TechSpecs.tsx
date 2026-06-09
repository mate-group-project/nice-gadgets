import * as React from 'react';
import './techSpecs.scss';

export const TechSpecs: React.FC = () => {
  return (
    <div className="product-page__tech-specs tech-specs">
      <h2 className="tech-specs__title">Tech specs</h2>
      <ul className="tech-specs__list">
        <li className="tech-specs__item">
          <span className="tech-specs__name">Screen</span>
          <span className="tech-specs__value">6.5” OLED</span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__name">Resolution</span>
          <span className="tech-specs__value">2688x1242</span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__name">Processor</span>
          <span className="tech-specs__value">Apple A12 Bionic</span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__name">RAM</span>
          <span className="tech-specs__value">3 GB</span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__name">Built in memory</span>
          <span className="tech-specs__value">64 GB</span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__name">Camera</span>
          <span className="tech-specs__value">
            12 Mp + 12 Mp + 12 Mp (Triple)
          </span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__name">Zoom</span>
          <span className="tech-specs__value">Optical, 2x</span>
        </li>
        <li className="tech-specs__item">
          <span className="tech-specs__name">Cell</span>
          <span className="tech-specs__value">GSM, LTE, UMTS</span>
        </li>
      </ul>
    </div>
  );
};
