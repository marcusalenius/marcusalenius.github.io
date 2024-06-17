"use client";

import Link from "next/link";

type Props = {
  className?: string;
  id?: string;
  individualEffect?: boolean;
  tabIndex?: number;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

function Card({
  id = "",
  className = "card",
  individualEffect = true,
  tabIndex = 0,
  href = "",
  onClick = () => {},
  children,
}: Props) {
  const mouseMoveFunction = (event: MouseEvent) => {
    if (!individualEffect) return;
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mouseX", `${x}px`);
    card.style.setProperty("--mouseY", `${y}px`);
  };

  const content = (
    <>
      <div className="card-border"></div>
      {children}
    </>
  );

  return href !== "" ? (
    <Link
      className={className}
      id={id}
      tabIndex={tabIndex}
      href={href}
      onMouseMove={mouseMoveFunction as any}
    >
      {content}
    </Link>
  ) : (
    <div
      className={className}
      id={id}
      tabIndex={tabIndex}
      onClick={onClick}
      onMouseMove={mouseMoveFunction as any}
    >
      {content}
    </div>
  );
}

export default Card;
