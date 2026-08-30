"use client";

interface CtaBannerProps {
  onOpenBooking: () => void;
}

export function CtaBanner({ onOpenBooking }: CtaBannerProps) {
  return (
    <div className="cta">
      <div className="w reveal-on-scroll">
        <h2>Ready for your Turn Style moment?</h2>
        <button className="btn book" onClick={onOpenBooking}>
          Reserve Your Slot
        </button>
      </div>
    </div>
  );
}
