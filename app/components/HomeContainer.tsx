import Hero from './Hero';

type Props = {
  data: { [key:string]: any};
};

function HomeContainer({data}: Props) {
  return (
    <div id="container">
      <Hero data={data} />
    </div>
  );
}

export default HomeContainer;