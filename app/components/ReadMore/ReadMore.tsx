import "./ReadMore.css";

type Props = {
  isShowingAll: boolean;
  children: React.ReactNode;
};

function ReadMore({ isShowingAll, children }: Props) {
  return (
    <div className="read-more-container">
      <span className={isShowingAll ? "read-more" : "read-more closed"}>
        {children}
      </span>
    </div>
  );
}

export default ReadMore;
