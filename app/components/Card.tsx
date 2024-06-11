"use client";

type Props = {
  id: string;
  individualEffect: boolean;
  tabIndex?: number;
  onClick?: () => void;
  children: React.ReactNode;
};

function Card({
  id,
  individualEffect: individualEffect,
  tabIndex = 0,
  onClick = () => {},
  children,
}: Props) {
  return (
    <div
      className="card"
      id={id}
      tabIndex={tabIndex}
      onClick={onClick}
      onMouseMove={(event) => {
        if (!individualEffect) return;
        const card = event.target as HTMLElement;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty("--mouseX", `${x}px`);
        card.style.setProperty("--mouseY", `${y}px`);
      }}
    >
      <div className="card-border"></div>
      {children}
    </div>
  );
}

export default Card;
