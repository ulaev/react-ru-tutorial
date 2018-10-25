var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      counter: 0
    }
  }

  readmoreClick = (e) => {
    e.preventDefault();
    this.setState({ visible: true });
  }

  render() {
    var author = this.props.data.author,
      text = this.props.data.text,
      bigText = this.props.data.bigText;

    return (
      <div className='article'>
        <p className='news__author'>{author}:</p>
        <p className='news__text'>{text}</p>

        {/* для ссылки readmore: не показывай ссылку, если visible === true */}
        <a href="#" onClick={this.readmoreClick} className={'news__readmore ' + (this.state.visible ? 'none' : '')}>Подробнее</a>

        {/* для большо текста: не показывай текст, если visible === false */}
        <p className={'news__big-text ' + (this.state.visible ? '' : 'none')}>{bigText}</p>
      </div>
    );
  }
}

class News extends React.Component {

  constructor(props) {
    super(props);
  }

  onTotalNewsClick = () => {
    this.setState({ counter: ++this.state.counter });
  };

  render() {
    const data = this.props.data;

    const newsTemplate = data.length > 0 ? data.map(function (item, index) {
      return (
        <div key={index}>
          <Article data={item} />
        </div>
      )
    }) : <p>К сожалению новостей нет</p>

    return (
      <div className="news">
        {newsTemplate}
        <strong onClick={this.onTotalNewsClick}> className={data.length > 0 ? '' : 'none'}>Всего новостей: {data.length}</strong>
      </div>
    );
  }
}

class TestInput extends React.Component {

  constructor(props) {
    super(props);
  }

  onBtnClickHandler = (e) => {
    console.log(this.refs);
    alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
  }

  render() {
    return (
      <div>
        <input
          className='test-input'
          defaultValue=''
          placeholder='введите значение'
          ref='myTestInput'
        />
        <button onClick={this.onBtnClickHandler} ref='alert_button'>Показать alert</button>
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
        <TestInput /> {/* добавили вывод компонента */}
        <News data={my_news} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);