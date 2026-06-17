import { Breadcrumbs } from '../Breadcrumbs';
import './AboutUs.scss';
import { PickupPointsSection } from '@/features/pickup-points-main/components/PickupPointsSection';

export const AboutUs: React.FC = () => {
  return (
    <main className="about">
      <div className="about__container">
        <Breadcrumbs crumbs={[{ label: 'About us' }]} />
        <h1 className="about__page-title">About us</h1>
        <div className="about__content">
          <h2 className="about__heading">Small dreams and grand plans</h2>
          <p className="about__paragraph">
            {`Nice Gadgets is the largest online store of Apple gadgets in the
            country. Since 2005, we have been making small dreams and grand
            plans of millions of people come true. You can find literally all
            Apple smartphones, tablets and accessories here. We sell at a fair
            price and provide a guarantee, because we believe that online
            shopping should be as convenient and safe as possible. And every
            time someone clicks "Buy", we understand that we are doing the right
            thing.`}
          </p>
          <h2 className="about__heading">Our goal is to be useful</h2>
          <p className="about__paragraph">
            {`We believe that gadgets exist to make life easier, more enjoyable
            and kinder. Therefore, the search for the right gadget should be
            fast, convenient and enjoyable. We don't just sell smartphones,
            tablets and accessories. We help you find exactly what you need, in
            one place and without unnecessary worries, so that you don't waste
            your life searching, but simply live happily. Nice Gadgets is a
            universal answer to any request, the beginning and end of the
            search, a real assistant. We forever save our customers from
            unpleasant compromises, fulfill desires and allow them to dream
            bolder. Thanks to smart search and honest service, we make our
            customers' lives a little better right now.`}
          </p>
          <h2 className="about__heading">
            Happiness starts with simple things
          </h2>
          <p className="about__paragraph">
            {`And we help you find these things: we tell lovers how to surprise
            each other; we motivate sports people to never give up and progress
            faster; we give homeowners the opportunity to create real comfort.
            We want you to know what you are looking for and be able to justify
            your choice. To do this, we shoot video reviews, write articles, and
            track new products.`}
          </p>
          <h2 className="about__heading">So that dreams come true easily</h2>
          <p className="about__paragraph">
            {`We open huge offline stores so you can come in, hold in your hands
            and test the product you like. We want to have the best service in
            the world, so we train our employees not only in the technical part
            of the business, but also in working with the customer.`}
          </p>
          <ul className="about__stats">
            <li className="about__stats-item">
              <p className="about__stats-value">20</p>
              <p className="about__stats-label">years on the market</p>
            </li>
            <li className="about__stats-item">
              <p className="about__stats-value">5000+</p>
              <p className="about__stats-label">employees</p>
            </li>
            <li className="about__stats-item">
              <p className="about__stats-value">540+</p>
              <p className="about__stats-label">open shops</p>
            </li>
            <li className="about__stats-item">
              <p className="about__stats-value">165+</p>
              <p className="about__stats-label">cities in Ukraine</p>
            </li>
          </ul>
          <h2 className="about__heading">Convenient delivery</h2>
          <p className="about__paragraph">
            {`And of course, any product can be ordered with delivery. We deliver
            orders in Kyiv within one day, and in Ukraine - the next day.
            Everything - without prepayment, if necessary - on credit. Payment
            in cash or non-cash - as you prefer.`}
          </p>
          <h2 className="about__heading">Then - more</h2>
          <p className="about__paragraph">
            {`We want our customers to never have to wonder where to find
            something they need.`}
          </p>
          <h2 className="about__heading">We are waiting for you here</h2>
          <PickupPointsSection />
        </div>
      </div>
    </main>
  );
};
