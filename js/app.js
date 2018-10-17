class App extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>Всем привет, я компонент App!</div>
      );
    }
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );