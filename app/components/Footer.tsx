import Image from "next/image";
import { SALON_INFO } from "../data/salon-data";

export function Footer() {
  return (
    <>
      <footer className="foot">
        <div className="w">
          <div className="footgrid">
            <div>
              <Image
                className="logo"
                src="/images/img_3.png"
                alt="Turn Style logo"
                width={245}
                height={68}
              />
              <p>
                Hair · Skin · Makeup · Tattoo
                <br />
                Premium unisex salon experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Koramangala Salon</h4>
              <p>
                Koramangala, Bengaluru
                <br />
                {SALON_INFO.phoneDisplay}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Quick Links</h4>
              <p>
                <a href="#offers" className="hover:underline">
                  Offers
                </a>
                <br />
                <a href="#services" className="hover:underline">
                  Services
                </a>
                <br />
                <a href="#reviews" className="hover:underline">
                  Reviews
                </a>
                <br />
                <a href="#location" className="hover:underline">
                  Location
                </a>
              </p>
            </div>
          </div>
          <div className="copybar">
            <div className="copy">
              © 2026 Turn Style Unisex Salon. Offers and pricing are subject to
              consultation and availability.
            </div>
            <div>V · 2026</div>
          </div>
        </div>
      </footer>

      {/* Floating CTAs: Call & WhatsApp */}
      <div className="floating-ctas">
        <a
          className="float-btn call"
          href={`tel:${SALON_INFO.phoneTel}`}
          aria-label={`Call Turn Style Salon at ${SALON_INFO.phoneDisplay}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6.5 h-6.5"
            style={{ width: "24px", height: "24px" }}
          >
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
              clipRule="evenodd"
            />
          </svg>
        </a>

        <a
          className="float-btn whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          href={SALON_INFO.whatsappUrl}
          aria-label="Chat on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7.5 h-7.5"
            style={{ width: "28px", height: "28px" }}
          >
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.188-1.358a9.946 9.946 0 0 0 4.82 1.238h.005c5.507 0 9.99-4.478 9.99-9.985C22.007 6.478 17.519 2 12.012 2zm0 18.29h-.003a8.27 8.27 0 0 1-4.218-1.157l-.302-.18-3.136.82.836-3.056-.197-.314a8.27 8.27 0 0 1-1.267-4.417c0-4.561 3.719-8.274 8.291-8.274 4.57 0 8.287 3.713 8.288 8.276-.002 4.562-3.722 8.276-8.293 8.276zm4.542-6.208c-.249-.125-1.472-.725-1.7-.807-.228-.083-.393-.125-.558.125-.166.249-.641.808-.785.972-.145.166-.29.187-.539.062-.25-.125-1.05-.388-2.001-1.235-.74-.658-1.239-1.47-1.385-1.7-.145-.25-.015-.385.11-.51.112-.112.249-.29.373-.436.124-.145.166-.25.249-.415.083-.166.042-.312-.02-.437-.063-.125-.559-1.347-.766-1.848-.201-.486-.421-.42-.559-.427-.123-.006-.29-.008-.456-.008-.166 0-.436.062-.664.312-.228.249-.871.85-.871 2.072 0 1.222.89 2.404.99 2.548.1.145 1.751 2.674 4.243 3.75.593.256 1.056.408 1.417.523.596.19 1.138.163 1.567.1.478-.07 1.472-.601 1.679-1.18.207-.58.207-1.078.145-1.18-.062-.102-.228-.164-.477-.29z"></path>
          </svg>
        </a>
      </div>
    </>
  );
}
