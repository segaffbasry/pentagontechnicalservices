import { Arrow, Button, Label } from "@/components/ui";
import { news } from "@/lib/content";

/* Latest news, as on the live homepage: the lead story with its first two paragraphs, then the next four as
   square-thumbnail cards. */
export default function News() {
  const f = news.featured;
  return (
    <section className="news wrap" id="news" aria-labelledby="news-title">
      <div className="news__top">
        <Label>{news.label}</Label>
        <Button href={news.all.href} variant="quiet" size="sm">{news.all.label}</Button>
      </div>

      <article className="news__lead">
        <a className="news__lead-media" href={f.href} tabIndex={-1} aria-hidden="true" data-reveal="image">
          <img src={f.image} alt="" loading="lazy" />
        </a>
        <div className="news__lead-copy">
          <p className="news__date" data-reveal="label"><time>{f.date}</time></p>
          <h2 id="news-title" className="statement" data-reveal="text">{f.title}</h2>
          {f.body.map((p, i) => <p key={i} className="body" data-reveal="card">{p}</p>)}
          <div data-reveal="label"><Button href={f.href}>{f.cta}</Button></div>
        </div>
      </article>

      <ul className="news__grid">
        {news.items.map((item) => (
          <li key={item.href} data-reveal="card">
            <a className="post" href={item.href}>
              <span className="post__media"><img src={item.image} alt="" loading="lazy" /></span>
              <span className="post__date"><time>{item.date}</time></span>
              <span className="post__title">{item.title}</span>
              <span className="post__arrow" aria-hidden="true"><Arrow dir="up-right" /></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
