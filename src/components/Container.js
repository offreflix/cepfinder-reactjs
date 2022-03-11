function Container(props) {
  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      {props.children}
    </div>
  );
}

export default Container;
