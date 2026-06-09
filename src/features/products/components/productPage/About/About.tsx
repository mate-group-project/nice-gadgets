import * as React from 'react';
import './about.scss';

export const About: React.FC = () => {
  return (
    <div className="product-page__about about">
      <h2 className="about__title">About</h2>

      <div className="about__content">
        <article className="about__item">
          <h3 className="about__subtitle">And then there was Pro</h3>
          <p className="about__text about__history-text">
            A transformative triple‑camera system that adds tons of capability
            without complexity.
          </p>
          <p className="about__text">
            An unprecedented leap in battery life. And a mind‑blowing chip that
            doubles down on machine learning and pushes the boundaries of what a
            smartphone can do. Welcome to the first iPhone powerful enough to be
            called Pro.
          </p>
        </article>

        <article className="about__item">
          <h3 className="about__subtitle">Camera</h3>
          <p className="about__text">
            Meet the first triple‑camera system to combine cutting‑edge
            technology with the legendary simplicity of iPhone. Capture up to
            four times more scene. Get beautiful images in drastically lower
            light. Shoot the highest‑quality video in a smartphone — then edit
            with the same tools you love for photos. You’ve never shot with
            anything like it.
          </p>
        </article>

        <article className="about__item">
          <h3 className="about__subtitle">
            Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
            Love it.
          </h3>
          <p className="about__text">
            iPhone 11 Pro lets you capture videos that are beautifully true to
            life, with greater detail and smoother motion. Epic processing power
            means it can shoot 4K video with extended dynamic range and
            cinematic video stabilization — all at 60 fps. You get more creative
            control, too, with four times more scene and powerful new editing
            tools to play with.
          </p>
        </article>
      </div>
    </div>
  );
};
