"use client";

type Props = {
  id: string;
  children: React.ReactNode;
};

function Card({ id, children }: Props) {
  return (
    <div
      className="card"
      id={id}
      onMouseMove={(event) => {
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
