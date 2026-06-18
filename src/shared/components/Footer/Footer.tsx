import './Footer.scss';
import { Button } from '@base-ui/react';
import { Icon } from '../Icon';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '@/features/translations/hooks/useTranslation.ts';

const scrollToTop = () => {
  document.scrollingElement?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

type FooterProps = {
  theme: string;
};

export const Footer = ({ theme }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="logo">
        <NavLink
          to="/"
          onClick={scrollToTop}
        >
          {theme === 'light' ?
            <img
              src="/dark-logo.png"
              className="log"
              alt="logo"
            />
          : <img
              src="/light-logo.png"
              className="log"
              alt="logo"
            />
          }
        </NavLink>
      </div>

      <div className="info">
        <a
          href="https://github.com/mate-group-project/nice-gadgets/tree/main"
          className="contact"
          target="blank"
        >
          {t('footer.github')}
        </a>

        <a
          href="/about"
          className="contact"
        >
          {t('footer.about')}
        </a>

        <a
          href="/contacts"
          className="contact"
        >
          {t('footer.contacts')}
        </a>

        <a
          href="/rights"
          className="contact"
        >
          {t('footer.rights')}
        </a>
      </div>
      <div className="footer__container">
        <a
          onClick={scrollToTop}
          style={{ cursor: 'pointer' }}
          className="back"
        >
          {t('footer.backToTop')}
        </a>
        <Button
          className="button__icon button--lg"
          onClick={scrollToTop}
        >
          {' '}
          <Icon name="chevronUp" />{' '}
        </Button>
      </div>
    </div>
  );
};