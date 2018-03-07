import React from 'react'
import * as SessionApi from './sessionStorageApi'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Link,Route} from 'react-router-dom'
class BookInfor extends React.Component{
  constructor(props) {
    super(props);
    this.hand =this.hand.bind(this);
    this.state={
      bookState: this.props.book.states
    }
  }
  componentDidMount(){

  }
  hand(e){
    this.setState({
      bookState:''
    });
    this.setState({
      bookState:e.target.value
    });
    this.props.moveBook(this.props.book,e.target.value)
  }
  render(){
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.book.url }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.bookState}  onChange={this.hand}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    );
  }
}
class BookList extends React.Component{
  state ={
  }
  render(){
    let self=this;
    let BookDom=[];
    this.props.bookReading.map(function (val,index) {
      BookDom.push(<li key={val.id}><BookInfor book={val} moveBook={self.props.moveBook} /></li>)
    });
    return (
      <ol className="books-grid">
        {BookDom}
      </ol>
    )
  }
}
class BookMain extends React.Component{
  constructor(props){
    super(props);
    this.bookList= SessionApi.getSessionStorage();
    this.state={
      readingList:this.bookList.filter(function (val) {
        return (val.states=='reading') ? true : false;
      }),
      toReadList:this.bookList.filter(function (val) {
        return (val.states=='toRead') ? true : false;
      }),
      readList:this.bookList.filter(function (val) {
        return (val.states=='read') ? true : false;
      })
    };
    this.moveBook=this.moveBook.bind(this);
  }
  componentDidMount(){
    let self=this;
  }
  moveBook(val,toState){
    let self=this;
    let curremtBookIndex;
    this.bookList.forEach(function (value,index) {
      if (val.id===value.id){
        curremtBookIndex=index;
      }
    });
    switch (toState){
      case "currentlyReading":
        this.bookList[curremtBookIndex].states="reading";
        SessionApi.updateSessionStorage(this.bookList[curremtBookIndex],'reading')
        this.setState(function (prevState,props) {
          return {
            readingList:this.bookList.filter(function (val) {
              return (val.states=='reading') ? true : false;
            }),
            toReadList:this.bookList.filter(function (val) {
              return (val.states=='toRead') ? true : false;
            }),
            readList:this.bookList.filter(function (val) {
              return (val.states=='read') ? true : false;
            })
          };
        });
        break;
      case "wantToRead":
        this.bookList[curremtBookIndex].states="toRead";
        SessionApi.updateSessionStorage(this.bookList[curremtBookIndex],'toRead')
        this.setState(function (prevState,props) {
          return {
            readingList:this.bookList.filter(function (val) {
              return (val.states=='reading') ? true : false;
            }),
            toReadList:this.bookList.filter(function (val) {
              return (val.states=='toRead') ? true : false;
            }),
            readList:this.bookList.filter(function (val) {
              return (val.states=='read') ? true : false;
            })
          };
        });
        break;
      case "read":
        this.bookList[curremtBookIndex].states="read";
        SessionApi.updateSessionStorage(this.bookList[curremtBookIndex],'read')
        this.setState(function (prevState,props) {
          return {
            readingList:this.bookList.filter(function (val) {
              return (val.states=='reading') ? true : false;
            }),
            toReadList:this.bookList.filter(function (val) {
              return (val.states=='toRead') ? true : false;
            }),
            readList:this.bookList.filter(function (val) {
              return (val.states=='read') ? true : false;
            })
          };
        });
        break;
      default:break;
    }
  }
  render(){
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BookList index="currentlyReading" bookReading= {this.state.readingList} moveBook={this.moveBook} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookList index="wantToRead" bookReading= {this.state.toReadList} moveBook={this.moveBook} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookList index="read" bookReading= {this.state.readList} moveBook={this.moveBook} />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
class Search extends React.Component{
  constructor(props){
    super(props);
    this.bookList= SessionApi.getSessionStorage();
    this.state={
      bookListSearch:[],
      value:''
    }
    this.handChange=this.handChange.bind(this);
    this.moveBook = this.moveBook.bind(this);
  }
  moveBook(val,toState){
    let self=this;
    let curremtBookIndex;
    this.bookList.forEach(function (value,index) {
      if (val.id===value.id){
        curremtBookIndex=index;
      }
    });
    switch (toState){
      case "currentlyReading":
        this.bookList[curremtBookIndex].states="reading";
        SessionApi.updateSessionStorage(this.bookList[curremtBookIndex],'reading')
        break;
      case "wantToRead":
        this.bookList[curremtBookIndex].states="toRead";
        SessionApi.updateSessionStorage(this.bookList[curremtBookIndex],'toRead')
        break;
      case "read":
        this.bookList[curremtBookIndex].states="read";
        SessionApi.updateSessionStorage(this.bookList[curremtBookIndex],'read')
        break;
      default:break;
    }
  }
  handChange(e){
    let value=e.target.value;
    let newBookList=this.bookList.filter(function (val) {
      if(value.toString().length<1){
        return false;
      }
      else if(val.title.toLowerCase().indexOf(value.toString().toLowerCase()) >-1 || val.authors.toLowerCase().indexOf(value.toString().toLowerCase())>-1){
        return true;
      }else {
        return false;
      }
    });
    this.setState(function (prevState,props) {
      return {
        bookListSearch:newBookList,
        value:value
      }
    })
  }
  render(){

    let domLi=[];
    let self=this;
    this.state.bookListSearch.forEach(function (val,index) {
      domLi.push(<li key={val.id}> <BookInfor book={val} moveBook={self.moveBook}/>  </li>)
    });
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.value} onChange={this.handChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {domLi}
          </ol>
        </div>
      </div>
    );
  }
}
class BooksApp extends React.Component {
  constructor(props){
    super(props)
    SessionApi.ininSessionStorage();
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BookMain}></Route>
        <Route exact path="/search" component={Search}></Route>
      </div>
    )
  }
}
export default BooksApp
