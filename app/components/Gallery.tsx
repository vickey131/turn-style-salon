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
            width={600}
            height={680}
            style={{ width: "100%", height: "680px", objectFit: "cover", objectPosition: "top" }}
          />
          <div className="small stagger-children">
            <Image
              src="/images/img_9.webp"
              alt="Nail art"
              width={300}
              height={330}
              style={{ width: "100%", height: "330px", objectFit: "cover", objectPosition: "top" }}
            />
            <Image
              src="/images/img_10.webp"
              alt="Hydrafacial"
              width={300}
              height={330}
              style={{ width: "100%", height: "330px", objectFit: "cover", objectPosition: "top" }}
            />
            <Image
              src="/images/img_11.webp"
              alt="Global hair colour"
              width={300}
              height={330}
              style={{ width: "100%", height: "330px", objectFit: "cover", objectPosition: "top" }}
            />
            <Image
              src="/images/img_12.webp"
              alt="Men's grooming"
              width={300}
              height={330}
              style={{ width: "100%", height: "330px", objectFit: "cover", objectPosition: "top" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
