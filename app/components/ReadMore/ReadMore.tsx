import "./ReadMore.css";

type Props = {
  isExpanded: boolean;
  children: React.ReactNode;
};

function ReadMore({ isExpanded, children }: Props) {
  return (
    <p className="paragraph-small read-more-container">
      <span className={isExpanded ? "read-more" : "read-more closed"}>
        {children}
      </span>
    </p>
  );
}

export default ReadMore;
