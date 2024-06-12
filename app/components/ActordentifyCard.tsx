import Card from "./Card";

type Props = {
  cardData: { [key: string]: any };
};

function ActordentifyCard({ cardData }: Props) {
  return (
    <Card id="actordentify-card" individualEffect={false}>
      <h3>{cardData.title}</h3>
    </Card>
  );
}

export default ActordentifyCard;
