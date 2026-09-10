import Image from "next/image";

export function Gallery() {
  return (
    <section>
      <div className="w">
        <div className="reveal-on-scroll">
          <div className="eye">Signature transformations</div>
          <h2 className="title">Beautiful Results Begin Here</h2>
        </div>
        <div className="gallery stagger-children">
          <Image
            src="/images/img_8.webp"
            alt="Korean glass skin facial"
            width={1100}
            height={1375}
            sizes="(max-width: 880px) 100vw, 50vw"
          />
          <div className="small stagger-children">
            <Image
              src="/images/img_9.webp"
              alt="Nail art"
              width={1080}
              height={1350}
              sizes="(max-width: 570px) 100vw, (max-width: 880px) 50vw, 25vw"
            />
            <Image
              src="/images/img_10.webp"
              alt="Hydrafacial"
              width={1100}
              height={1375}
              sizes="(max-width: 570px) 100vw, (max-width: 880px) 50vw, 25vw"
            />
            <Image
              src="/images/img_1.webp"
              alt="Global hair colour"
              width={1080}
              height={1350}
              sizes="(max-width: 570px) 100vw, (max-width: 880px) 50vw, 25vw"
            />
            <Image
              src="/images/img_12.webp"
              alt="Men's grooming"
              width={1100}
              height={1375}
              sizes="(max-width: 570px) 100vw, (max-width: 880px) 50vw, 25vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
