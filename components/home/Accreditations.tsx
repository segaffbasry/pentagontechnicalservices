import { Label } from "@/components/ui";
import { accreditations } from "@/lib/content";

/* The live accreditations artwork (one composite image of the ISO, CHAS, Constructionline and Carbon Footprint
   marks) on a white card inside a mist band, with the live scope note. */
export default function Accreditations() {
  return (
    <section className="accred" aria-labelledby="accred-title">
      <div className="wrap accred__inner">
        <div className="accred__head">
          <Label>Assurance</Label>
          <h2 id="accred-title" className="statement" data-reveal="text">{accreditations.title}</h2>
          <p className="accred__note" data-reveal="label">{accreditations.note}</p>
        </div>
        <figure className="accred__card" data-reveal="card">
          <img src={accreditations.image} alt={accreditations.alt} width={1200} height={465} loading="lazy" />
        </figure>
      </div>
    </section>
  );
}
