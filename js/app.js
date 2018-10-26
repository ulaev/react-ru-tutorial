window.ee = new EventEmitter();

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

class Add extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    }
  }

  componentDidMount = () => { //ставим фокус в input
    ReactDOM.findDOMNode(this.refs.author).focus();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      likesIncreasing: nextProps.likeCount > this.props.likeCount
    });
  }

  onBtnClickHandler = (e) => {
    e.preventDefault();
  var textEl = ReactDOM.findDOMNode(this.refs.text);

  var author = ReactDOM.findDOMNode(this.refs.author).value;
  var text = textEl.value;

  var item = [{
    author: author,
    text: text,
    bigText: '...'
  }];

  window.ee.emit('News.add', item);

  textEl.value = '';
  this.setState({textIsEmpty: true});
  }

  onFieldChange = (fieldName, e) => {
    var next = {};
    if (e.target.value.trim().length > 0) {
      next[fieldName] = false;
      this.setState(next);
    } else {
      next[fieldName] = true;
      this.setState(next);
    }
  }

  onCheckRuleClick = (e) => {
    this.setState({ agreeNotChecked: !this.state.agreeNotChecked }); //устанавливаем значение в state
  }

  render() {
    var agreeNotChecked = this.state.agreeNotChecked,
      authorIsEmpty = this.state.authorIsEmpty,
      textIsEmpty = this.state.textIsEmpty;

    return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          defaultValue=''
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
          placeholder='Ваше имя'
          ref='author'
        />
        <textarea
          className='add__text'
          defaultValue=''
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
          placeholder='Текст новости'
          ref='text'
        ></textarea>
        <label className='add__checkrule'>
          <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick} />Я согласен с правилами
        </label>
        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
          ref='alert_button'>
          Показать alert
        </button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      news: my_news
    };
  }

  componentDidMount = () => {
    var self = this;
    window.ee.addListener('News.add', function (item) {
      var nextNews = item.concat(self.state.news);
      self.setState({ news: nextNews });
    });
  }

  componentWillUnmount = () => {
    window.ee.removeListener('News.add');
  }

  render() {
    return (
      <div className="app">
        <h3>Новости</h3>
        <Add /> {/* добавили вывод компонента */}
        <News data={this.state.news} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);