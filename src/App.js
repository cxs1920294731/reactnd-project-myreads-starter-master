import React from 'react'
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
    this.bookList= [
      {
        url:'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
        states:'reading',
        title:'To Kill a Mockingbird',
        authors:'Harper Lee',
        id:1
      },
      {
        url:'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
        states:'reading',
        title:'Ender\'s Game',
        authors:'Orson Scott Card',
        id:2
      },
      {
        url:'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")',
        states:'toRead',
        title:'1776',
        authors:'David McCullough',
        id:3
      },
      {
        url:'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")',
        states:'toRead',
        title:'Harry Potter and the Sorcerer\'s Stone',
        authors:'J.K. Rowling',
        id:4
      },
      {
        url:'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")',
        states:'read',
        title:'The Hobbit',
        authors:'J.R.R. Tolkien',
        id:5
      },
      {
        url:'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")',
        states:'read',
        title:'Oh, the Places You\'ll Go!',
        authors:'Seuss',
        id:6
      },
      {
        url:'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
        states:'read',
        title:'The Adventures of Tom Sawyer',
        authors:'Mark Twain',
        id:7
      },
    ];
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
    this.bookList=[
      {
        url:'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
        states:'reading',
        title:'To Kill a Mockingbird',
        authors:'Harper Lee',
        id:1
      },
      {
        url:'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
        states:'reading',
        title:'Ender\'s Game',
        authors:'Orson Scott Card',
        id:2
      },
      {
        url:'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")',
        states:'toRead',
        title:'1776',
        authors:'David McCullough',
        id:3
      },
      {
        url:'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")',
        states:'toRead',
        title:'Harry Potter and the Sorcerer\'s Stone',
        authors:'J.K. Rowling',
        id:4
      },
      {
        url:'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")',
        states:'read',
        title:'The Hobbit',
        authors:'J.R.R. Tolkien',
        id:5
      },
      {
        url:'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")',
        states:'read',
        title:'Oh, the Places You\'ll Go!',
        authors:'Seuss',
        id:6
      },
      {
        url:'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
        states:'read',
        title:'The Adventures of Tom Sawyer',
        authors:'Mark Twain',
        id:7
      },
    ]
    this.state={
      bookListSearch:[],
      value:''
    }
    this.handChange=this.handChange.bind(this);
    this.moveBook = this.moveBook.bind(this);
  }
  moveBook(val,toState){

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
      domLi.push(<li key={val.id}> <BookInfor book={val} moveBook={self.state.moveBook}/>  </li>)
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
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
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
