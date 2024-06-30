import "./ReadMore.css";

type Props = {
  isShowingAll: boolean;
  children: React.ReactNode;
};

function ReadMore({ isShowingAll, children }: Props) {
  return (
    <span className={isShowingAll ? "read-more" : "read-more closed"}>
      {children}
    </span>
  );
}

export default ReadMore;
