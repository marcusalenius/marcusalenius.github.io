"use client";

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function CardRegion({
  id = "",
  className = "",
  children,
}: Props) {
  return (
    <div
      className={className}
      id={id}
      onMouseMove={(event) => {
        const cardRegion = event.currentTarget as HTMLElement;
        Array.from(
          cardRegion.querySelectorAll(
            `.card-region-child`
          ) as NodeListOf<HTMLElement>
        ).forEach((card: HTMLElement) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          card.style.setProperty("--mouseX", `${x}px`);
          card.style.setProperty("--mouseY", `${y}px`);
        });
      }}
    >
      {children}
    </div>
  );
}
