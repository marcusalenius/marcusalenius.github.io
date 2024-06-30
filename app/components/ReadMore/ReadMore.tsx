type Props = {
  children: React.ReactNode;
};

function ReadMore({ children }: Props) {
  const text = children as string;
  console.log(text);
  return text;
}
