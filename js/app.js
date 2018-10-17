class Comments extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="comments">
        Нет новостей - комментировать нечего
      </div>
    );
  }
}

class News extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="news">
        К сожалению, новостей нет.
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app">
        Всем привет, я компонент App! Я умею отображать новости.
        <News />
        <Comments />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);