import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="policy-page">
        <div className="policy-hero">
          <div className="w">
            <div className="policy-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Privacy Policy</span>
            </div>
            <div className="eye">Turn Style Unisex Salon</div>
            <h1 className="title policy-title">Privacy Policy</h1>
            <p className="policy-dates">
              <span>Effective Date: 10 September 2026</span>
              <span className="policy-dot">·</span>
              <span>Last Updated: 10 September 2026</span>
              <span className="policy-dot">·</span>
              <span>Koramangala, Bengaluru</span>
            </p>
          </div>
        </div>

        <div className="policy-content-wrapper">
          <div className="w policy-container">
            <div className="policy-card">
              <p className="policy-intro">
                Turn Style Unisex Salon (“Turn Style”, “we”, “our” or “us”)
                respects your privacy. This Privacy Policy explains how we
                collect, use, store and protect information when you visit our
                website, book an appointment, visit our salon, participate in an
                offer or communicate with us.
              </p>
              <p className="policy-subintro">
                By using our website or services, you acknowledge that you have
                read this Privacy Policy.
              </p>

              <section className="policy-section">
                <h2>1. Information We Collect</h2>

                <h3>Personal Information</h3>
                <ul className="policy-list">
                  <li>Name</li>
                  <li>Phone number and email address</li>
                  <li>Location</li>
                  <li>Appointment details and service preferences</li>
                  <li>Enquiries, feedback and reviews</li>
                  <li>Payment and transaction information</li>
                  <li>Marketing and communication preferences</li>
                </ul>

                <h3 style={{ marginTop: "24px" }}>
                  Health and Service-Related Information
                </h3>
                <p>
                  To provide services safely, you may voluntarily share
                  information about skin or scalp conditions, allergies and
                  sensitivities, previous chemical treatments, hair-treatment
                  history, medication or other relevant health considerations.
                  Please provide accurate information before receiving chemical,
                  hair, skin or beauty treatments.
                </p>

                <h3 style={{ marginTop: "24px" }}>Technical Information</h3>
                <p>
                  When you visit our website, we may automatically collect your
                  IP address, browser and device information, pages visited, time
                  spent on the website, referral source, cookie identifiers and
                  website performance information.
                </p>
              </section>

              <section className="policy-section">
                <h2>2. How We Use Your Information</h2>
                <ul className="policy-list">
                  <li>Schedule, confirm and manage appointments</li>
                  <li>Provide requested salon services</li>
                  <li>Respond to enquiries and support requests</li>
                  <li>Send appointment confirmations and reminders</li>
                  <li>Process payments and maintain transaction records</li>
                  <li>Personalise your salon experience</li>
                  <li>Manage promotions, offers and loyalty programmes</li>
                  <li>Request feedback or reviews</li>
                  <li>Improve our services, website and security</li>
                  <li>Fulfil legal and regulatory obligations</li>
                </ul>
                <p style={{ marginTop: "16px" }}>
                  With your consent, we may send promotional messages through
                  WhatsApp, SMS, email or telephone. You may opt out of
                  promotional communications at any time.
                </p>
              </section>

              <section className="policy-section">
                <h2>3. Cookies and Tracking Technologies</h2>
                <p>
                  Our website may use cookies and similar technologies to
                  remember preferences, analyse traffic, improve functionality
                  and measure marketing performance. You can disable cookies
                  through your browser settings, although some website features
                  may then work differently or become unavailable.
                </p>
              </section>

              <section className="policy-section">
                <h2>4. Analytics and Advertising</h2>
                <p>
                  We may use services such as Google Analytics, Google Ads,
                  Meta advertising tools and social media insights to understand
                  website usage and evaluate advertising performance. These
                  independent platforms process information under their own
                  privacy policies.
                </p>
              </section>

              <section className="policy-section">
                <h2>5. Sharing of Information</h2>
                <p>
                  We do not sell or rent your personal information. We may share
                  information where reasonably necessary with:
                </p>
                <ul className="policy-list">
                  <li>
                    Appointment-management and customer-support providers
                  </li>
                  <li>Payment processors</li>
                  <li>Website hosting and technology providers</li>
                  <li>Marketing and analytics partners</li>
                  <li>Professional advisers</li>
                  <li>
                    Government, regulatory or legal authorities where required
                    by law
                  </li>
                  <li>
                    A successor organisation in connection with a lawful
                    merger, restructuring or transfer of the business
                  </li>
                </ul>
                <p style={{ marginTop: "16px" }}>
                  Service providers may use information only for the agreed
                  purpose and subject to their applicable contractual and legal
                  responsibilities.
                </p>
              </section>

              <section className="policy-section">
                <h2>6. Data Security</h2>
                <p>
                  We apply reasonable administrative, technical and physical
                  safeguards to protect personal information against
                  unauthorised access, alteration, disclosure, misuse or loss.
                  However, no internet transmission or electronic storage
                  method can be guaranteed to be completely secure.
                </p>
              </section>

              <section className="policy-section">
                <h2>7. Data Retention</h2>
                <p>
                  We retain personal information only for as long as reasonably
                  necessary to provide services, maintain business and
                  transaction records, fulfil legal obligations, resolve
                  disputes and prevent fraud or misuse. Information that is no
                  longer required may be deleted, anonymised or securely
                  archived.
                </p>
              </section>

              <section className="policy-section">
                <h2>8. Your Rights</h2>
                <p>
                  Subject to applicable law, you may ask us to access or correct
                  your personal information, withdraw consent, stop promotional
                  communications, request deletion of eligible information or
                  raise a concern about how your information is used. We may need
                  to verify your identity before completing a request.
                </p>
              </section>

              <section className="policy-section">
                <h2>9. Photographs and Social Media</h2>
                <p>
                  We may occasionally take photographs or videos inside the
                  salon for promotional purposes. Identifiable customer images
                  will be used for marketing only after appropriate consent has
                  been obtained. You may withdraw consent for future use by
                  contacting us, although withdrawal will not affect material
                  lawfully published before the request was received.
                </p>
              </section>

              <section className="policy-section">
                <h2>10. Third Party Links</h2>
                <p>
                  Our website may link to social media pages, booking
                  platforms, payment services or other external websites. We are
                  not responsible for the content, security or privacy
                  practices of third-party platforms.
                </p>
              </section>

              <section className="policy-section">
                <h2>11. Children and Minors</h2>
                <p>
                  We do not knowingly collect personal information from minors
                  without the consent of a parent or legal guardian. Services
                  involving minors must be booked or approved by a parent or
                  guardian where appropriate.
                </p>
              </section>

              <section className="policy-section">
                <h2>12. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy when our services,
                  practices or legal requirements change. The revised policy
                  will be published with an updated date.
                </p>
              </section>

              <section className="policy-section">
                <h2>13. Contact Us</h2>
                <p>
                  For privacy-related questions or requests, contact Turn Style
                  Unisex Salon through the official contact details displayed
                  on our website or at our Koramangala salon in Bengaluru,
                  Karnataka.
                </p>
                <div className="policy-contact-box">
                  <strong>Turn Style Unisex Salon</strong>
                  <span>Koramangala, Bengaluru, Karnataka</span>
                  <span>Phone: +91 89716 76928</span>
                  <a
                    href="https://wa.me/918971676928"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="policy-contact-link"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
