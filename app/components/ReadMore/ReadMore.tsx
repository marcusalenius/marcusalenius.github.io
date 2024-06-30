import "./ReadMore.css";

type Props = {
  isReadMoreOpen: boolean;
  children: React.ReactNode;
};

function ReadMore({ isReadMoreOpen, children }: Props) {
  return (
    <div className={isReadMoreOpen ? "read-more" : "read-more closed"}>
      {children}
    </div>
  );
}

export default ReadMore;
