import Image from "next/image";
import { OFFERS_DATA } from "../data/salon-data";

export function Offers() {
  return (
    <section className="offers" id="offers">
      <div className="w">
        <div className="head reveal-on-scroll">
          <div>
            <div className="eye">Popular at Koramangala</div>
            <h2 className="title">Offers Worth Stepping Out For</h2>
          </div>
        </div>
        <div className="grid3 stagger-children">
          {OFFERS_DATA.map((offer, idx) => (
            <article className="card" key={idx}>
              <Image
                src={offer.image}
                alt={offer.alt}
                width={1080}
                height={1350}
                sizes="(max-width: 570px) 100vw, (max-width: 880px) 50vw, 33vw"
              />
              <div>
                <h3>{offer.title}</h3>
                <span className="price">{offer.price}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="offers-note-wrapper reveal-on-scroll">
          <div className="offers-note">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>
              Limited-period packages. Final pricing may vary after consultation.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
