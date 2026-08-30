import { REVIEWS_DATA } from "../data/salon-data";

export function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="w">
        <div className="reveal-on-scroll">
          <div className="eye">Real Koramangala clients</div>
          <h2 className="title">The Confidence says it all</h2>
        </div>
        <div className="grid3 reviewsgrid stagger-children">
          {REVIEWS_DATA.map((rev, idx) => (
            <article className="review" key={idx}>
              <div className="stars">{"★".repeat(rev.rating)}</div>
              <p>{rev.text}</p>
              <b>{rev.author}</b>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
