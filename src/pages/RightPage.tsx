import './RightPage.scss';
import { Breadcrumbs } from './Breadcrumbs';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

export const RightPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="product-page">
        <div className="page-container">
          <Breadcrumbs crumbs={[{ label: t('footer.rights') || 'Rights' }]} />

          <div className="rights">
            <h1 className="rights__title">© 2026 Nice Gadgets</h1>
            <p className="rights__text">{t('rights.p1')}</p>
            <p className="rights__text">{t('rights.p2')}</p>
            <p className="rights__text">{t('rights.p3')}</p>
            <p className="rights__text">{t('rights.p4')}</p>
          </div>
        </div>
      </section>
    </>
  );
};