type Props = {
  childCardsClassName: string;
  className?: string;
  id?: string;
  children: React.ReactNode;
};

function CardRegion({
  id = "",
  className = "",
  childCardsClassName,
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
            `.${childCardsClassName}`
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

export default CardRegion;
