"use client";

type Props = {
  className?: string;
  id?: string;
  individualEffect?: boolean;
  tabIndex?: number;
  onClick?: () => void;
  children: React.ReactNode;
};

function Card({
  id = "",
  className = "card",
  individualEffect = true,
  tabIndex = 0,
  onClick = () => {},
  children,
}: Props) {
  return (
    <div
      className={className}
      id={id}
      tabIndex={tabIndex}
      onClick={onClick}
      onMouseMove={(event) => {
        if (!individualEffect) return;
        const card = event.currentTarget as HTMLElement;
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
