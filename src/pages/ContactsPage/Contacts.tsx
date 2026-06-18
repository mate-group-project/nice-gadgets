import './Contacts.scss';
import viper from './images/viper.png';
import mantis from './images/mantis.png';
import tiger from './images/tiger.png';
import panda from './images/panda.png';
import tigresse from './images/tigresse.png';
import monkey from './images/monkey.png';
import { Breadcrumbs } from '../Breadcrumbs';
import { useTranslation } from '@/features/translations/hooks/useTranslation';

export type Person = {
  id: number;
  fullName: string;
  github: string;
  linkedin: string;
  phone: string;
  email: string;
};

const people = [
  {
    id: 1,
    avatar: mantis,
    fullName: 'Andriy Stetsula',
    github: 'https://github.com/andriy-stetsula',
    linkedin: 'https://www.linkedin.com/in/andriy-stetsula-93b53b413/',
    phone: '+380 68 821 35 00',
    email: 'andriystetsula2344@gmail.com',
  },
  {
    id: 2,
    avatar: tiger,
    fullName: 'Bohdan Mikhaylenko',
    github: 'https://github.com/impo10nt',
    linkedin: '#',
    phone: '+380 00 000 00 00',
    email: 'bogdanmihajlenko7@gmail.com',
  },
  {
    id: 3,
    avatar: panda,
    fullName: 'Roman Lysunets',
    github: 'https://github.com/rlysunets',
    linkedin: 'https://www.linkedin.com/in/roman-lysunets-21b166225/',
    phone: '+380 68 502 08 91',
    email: 'rlysunets@gmail.com',
  },
  {
    id: 4,
    avatar: tigresse,
    fullName: 'Tanya Linska',
    github: 'https://github.com/linska',
    linkedin: 'https://www.linkedin.com/in/tania-linska/',
    phone: '+380 66 592 85 82',
    email: 'linskatanya@gmail.com',
  },
  {
    id: 5,
    avatar: viper,
    fullName: 'Yana Karpovych',
    github: 'https://github.com/yana-karpovych',
    linkedin: 'https://www.linkedin.com/in/yana-karpovych-126196249/',
    phone: '+380 93 826 88 15',
    email: 'yanakarpovych0707@gmail.com',
  },
  {
    id: 6,
    avatar: monkey,
    fullName: 'Yevhenii Olkhhovskyi',
    github: 'https://github.com/Evgeniy45',
    linkedin: 'https://www.linkedin.com/in/yevheniy-olkhovsky-6769a82b6/',
    phone: '+380 66 077 60 16',
    email: 'jekaolhovskii@gmail.com',
  },
];

export const Contacts: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="contacts">
      <div className="contacts__container">
        <Breadcrumbs crumbs={[{ label: t('footer.contacts') || 'Contacts' }]} />
        <h1 className="contacts__title">{t('footer.contacts') || 'Contacts'}</h1>
        <div className="contacts__list">
          {people.map((person) => (
            <article
              key={person.id}
              className="contact__card"
            >
              <img
                className="contact__card-image"
                src={person.avatar}
                alt={`${person.fullName}'s avatar`}
              />

              <h2 className="contact__card-title">{person.fullName}</h2>

              <ul className="contact__card-info-list">
                <li className="contact__card-info">
                  <a
                    className="contact__card-info-value"
                    href={person.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('contacts.githubProfile') || 'GitHub profile'}
                  </a>
                </li>

                <li className="contact__card-info">
                  <a
                    className="contact__card-info-value"
                    href={person.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('contacts.linkedinProfile') || 'LinkedIn profile'}
                  </a>
                </li>

                <li className="contact__card-info">
                  <a
                    className="contact__card-info-value"
                    href={`tel:${person.phone}`}
                  >
                    {person.phone}
                  </a>
                </li>

                <li className="contact__card-info">
                  <a
                    className="contact__card-info-value"
                    href={`mailto:${person.email}`}
                  >
                    {person.email}
                  </a>
                </li>
              </ul>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};