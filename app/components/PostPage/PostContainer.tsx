type Props = {
  data: { [key: string]: any };
};

function PostContainer({ data }: Props) {
  return (
    <div id="container">
      <div className="post">
        <div className="post-image"></div>
        <h2></h2>
        <div className="post-intro"></div>
        <p className="paragraph-small"></p>
      </div>
    </div>
  );
}

export default PostContainer;
