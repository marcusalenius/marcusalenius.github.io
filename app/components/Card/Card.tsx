"use client";

import "./Card.css";

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

export default function Card({
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

  if (href === "") {
    return (
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
  } else {
    const external = href.startsWith("http");
    return (
      <Link
        className={className}
        id={id}
        tabIndex={tabIndex}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onMouseMove={mouseMoveFunction as any}
      >
        {content}
      </Link>
    );
  }
}
