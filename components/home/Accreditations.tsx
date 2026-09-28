"use client";

import Marquee from "@/components/home/Marquee";
import { Label } from "@/components/ui";
import { accreditations } from "@/lib/content";

/* The live accreditation marks, cut out of their white composite (scripts/logos.py) and run as a ticker straight on
   the mist band, using the same scroll-reactive marquee as the hero office strip. */
export default function Accreditations() {
  return (
    <section className="accred" aria-labelledby="accred-title">
      <div className="wrap accred__head">
        <Label>Assurance</Label>
        <h2 id="accred-title" className="statement" data-reveal="text">{accreditations.title}</h2>
        <p className="accred__note" data-reveal="label">{accreditations.note}</p>
      </div>
      <div className="accred__ticker" data-reveal="card">
        <Marquee
          className="marquee--logos"
          label="Accreditations"
          items={accreditations.logos.map((l) => l.file)}
          names={accreditations.logos.map((l) => l.name)}
          render={(file) => <img src={`/media/accreditations/${file}.png`} alt="" className={`accred__logo accred__logo--${file.split("-")[0]}`} />}
        />
      </div>
    </section>
  );
}
