import { Breadcrumbs } from '../Breadcrumbs';
import './AboutUs.scss';
import { PickupPointsSection } from '@/features/pickup-points-main/components/PickupPointsSection';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

export const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="about">
      <div className="about__container">
        <Breadcrumbs crumbs={[{ label: t('about.title') || 'About us' }]} />
        <h1 className="about__page-title">{t('about.title') || 'About us'}</h1>
        <div className="about__content">
          <h2 className="about__heading">{t('about.p1.title') || 'Our mission'}</h2>
          <p className="about__paragraph">{t('about.p1.text')}</p>
          <h2 className="about__heading">{t('about.p2.title')}</h2>
          <p className="about__paragraph">{t('about.p2.text')}</p>
          <h2 className="about__heading">{t('about.p3.title')}</h2>
          <p className="about__paragraph">{t('about.p3.text')}</p>
          <h2 className="about__heading">{t('about.p4.title')}</h2>
          <p className="about__paragraph">{t('about.p4.text')}</p>
          <ul className="about__stats">
            <li className="about__stats-item">
              <p className="about__stats-value">20</p>
              <p className="about__stats-label">{t('about.years') || 'years'}</p>
            </li>
            <li className="about__stats-item">
              <p className="about__stats-value">5000+</p>
              <p className="about__stats-label">{t('about.employees') || 'employees'}</p>
            </li>
            <li className="about__stats-item">
              <p className="about__stats-value">540+</p>
              <p className="about__stats-label">{t('about.shops') || 'shops'}</p>
            </li>
            <li className="about__stats-item">
              <p className="about__stats-value">165+</p>
              <p className="about__stats-label">{t('about.cities') || 'cities'}</p>
            </li>
          </ul>
          <h2 className="about__heading">{t('about.p5.title')}</h2>
          <p className="about__paragraph">{t('about.p5.text')}</p>
          <h2 className="about__heading">{t('about.p6.title')}</h2>
          <p className="about__paragraph">{t('about.p6.text')}</p>
          <h2 className="about__heading">{t('about.p7.title')}</h2>
          <PickupPointsSection />
        </div>
      </div>
    </main>
  );
};