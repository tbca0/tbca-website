import Image from "next/image";

const invitationImages = [
  {
    src: "/invitation/durga-puja-invitation-01.jpg",
    alt: "TBCA Durga Puja 2026 invitation cover",
    title: "Durga Puja 2026 Invitation",
  },
  {
    src: "/invitation/durga-puja-invitation-02.jpg",
    alt: "TBCA Durga Puja 2026 partnership invitation letter",
    title: "Partner invitation letter",
  },
  {
    src: "/invitation/durga-puja-invitation-03.jpg",
    alt: "TBCA Durga Puja 2026 schedule",
    title: "Puja schedule",
  },
];

export default function UpcomingEventVideo() {
  return (
    <div className="upcoming-invitation-block" aria-label="Durga Puja 2026 invitation cards">
      <div className="upcoming-invitation-head">
        <div>
          <p className="upcoming-invitation-kicker">Official Invitation</p>
          <h3>Durga Puja 2026 invitation card</h3>
        
        </div>
        <span>13 Oct - 21 Oct 2026</span>
      </div>

      <div className="upcoming-invitation-grid">
        <article className="upcoming-invitation-featured">
          <Image
            src="/invitation/durga-puja-envelope-card.jpeg"
            alt="TBCA Shubho Durgotsav invitation card and envelope"
            width={1600}
            height={900}
            className="upcoming-invitation-envelope"
            priority={false}
          />
        </article>

        <div className="upcoming-invitation-pages">
          {invitationImages.map((image) => (
            <figure key={image.src} className="upcoming-invitation-card">
              <Image
                src={image.src}
                alt={image.alt}
                width={816}
                height={1056}
                className="upcoming-invitation-image"
              />
              <figcaption>{image.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
