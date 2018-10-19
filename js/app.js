const my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четверг, четвертого числа...'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000'
  }
];

class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const author = this.props.data.author,
        text = this.props.data.text;

    return (
      <div className='article'>
        <p className='news__author'>{author}:</p>
        <p className='news__text'>{text}</p>
      </div>
    );
  }
}

class News extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.data;

    const newsTemplate = data.length > 0 ? data.map(function(item, index) {
      return (
        <div key={index}>
          <Article data={item} />
        </div>
      )
    }) : <p>К сожалению новостей нет</p>

    return (
      <div className="news">
        {newsTemplate}
        <strong className={data.length > 0 ? '':'none'}>Всего новостей: {data.length}</strong>
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
        <h3>Новости</h3>
        <News data={my_news}/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);