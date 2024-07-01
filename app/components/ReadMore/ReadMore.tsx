import "./ReadMore.css";

type Props = {
  isExpanded: boolean;
  children: React.ReactNode;
};

function ReadMore({ isExpanded, children }: Props) {
  return (
    <div className="read-more-container">
      <span className={isExpanded ? "read-more" : "read-more closed"}>
        {children}
      </span>
    </div>
  );
}

export default ReadMore;
