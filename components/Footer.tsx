import Logo from "@/components/Logo";
import { Arrow, Button, LinkedIn } from "@/components/ui";
import { contact, footer, offices, sister } from "@/lib/content";

/* siteassist.com footer: an inset rounded panel in the secondary neutral with a big "Let's talk" and the CTA
   across the top, then the address, link columns and social, and a small print row. The live footer's fifteen
   offices get their own index, head office first. */
export default function Footer() {
  const [hq, ...rest] = offices;
  return (
    <footer className="footer" id="contact">
      <div className="footer__panel">
        <div className="footer__top">
          <h2 className="display" data-reveal="text">{footer.title}</h2>
          <div className="footer__cta" data-reveal="label">
            <Button href={contact.contactPage}>Contact us</Button>
            <a className="footer__line" href={contact.phoneHref}>{contact.phone}</a>
            <a className="footer__line" href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <Logo variant="stacked" className="footer__logo" />
            <address>
              <strong>{hq.entity}</strong>
              {hq.address}
            </address>
          </div>
          <nav className="footer__col" aria-label="Footer">
            <p className="footer__head">Explore</p>
            <ul>{footer.explore.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
          </nav>
          <div className="footer__col">
            <p className="footer__head">Legal</p>
            <ul>{footer.legal.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
            <p className="footer__head footer__head--gap">Group</p>
            <ul><li><a href={sister.href}>{sister.label}</a></li></ul>
          </div>
          <div className="footer__col">
            <p className="footer__head">Follow us</p>
            <a className="footer__social" href={contact.linkedin} aria-label="Pentagon Technical Services on LinkedIn"><LinkedIn /></a>
          </div>
        </div>

        <div className="footer__offices">
          <p className="footer__head">Offices</p>
          <ul>
            {rest.map((o) => (
              <li key={o.address}>
                <span className="footer__city">{o.city}</span>
                {o.entity && <span>{o.entity}</span>}
                <span>{o.address}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__bottom">
          <p>{footer.copyright}</p>
          <a href="#top" className="footer__top-link">Back to top <Arrow dir="up-right" /></a>
        </div>
      </div>
    </footer>
  );
}
