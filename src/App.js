import React from 'react'
import * as SessionApi from './sessionStorageApi'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import BookMain from './component/BookMain'
import Search from './component/Search'
import './App.css'
class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.state={
      booklist:[]
    };

    this.moveBook = this.moveBook.bind(this);
  }
  componentDidMount(){
      BooksAPI.getAll().then((data)=>{
          let self=this;
          self.setState({
              booklist:data
          })
      });
  }
  moveBook(book,toState){
    let self=this;
    BooksAPI.update(book,toState).then((bookIDList)=>{
      //如果toState为空
      let newBookList=[];
      if(toState =='none'){
        newBookList=self.state.booklist.filter(function (val,index) {
          return (val.id==book.id) ? false : true;
        });
        self.setState({
          booklist:newBookList
        })
      }else{
        let bookListIDArr=[],isSearch=true;
        self.state.booklist.forEach(function (val) {
          bookListIDArr.push(val.id);
        });
        bookIDList.currentlyReading.forEach((val)=>{
            if (bookListIDArr.indexOf(val)<0 && isSearch){
              isSearch=false;
              BooksAPI.get(val).then((book)=>{
                console.log(book);
                self.setState({
                  booklist:self.state.booklist.concat(book)
                });
                console.log(self.state.booklist);
              });
            }
        });
        bookIDList.wantToRead.forEach((val)=>{
          if (bookListIDArr.indexOf(val)<0 && isSearch){
            isSearch=false;
            BooksAPI.get(val).then((book)=>{
              console.log(book);
              self.setState({
                booklist:self.state.booklist.concat(book)
              })
            })
          }
        });
        bookIDList.read.forEach((val)=>{
          if (bookListIDArr.indexOf(val)<0&& isSearch){
            isSearch=false;
            BooksAPI.get(val).then((book)=>{
              self.setState({
                booklist:self.state.booklist.concat(book)
              })
            })
          }
        });
        if (isSearch){
          newBookList=self.state.booklist.map((value)=>{
            if(bookIDList.currentlyReading.indexOf(value.id)>-1){
              value.shelf='currentlyReading';
            }else if(bookIDList.wantToRead.indexOf(value.id)>-1){
              value.shelf='wantToRead';
            }else  if(bookIDList.read.indexOf(value.id)>-1){
              value.shelf='read';
            }
            return value;
          })
          self.setState({
            booklist:newBookList
          });
        }

      }
    });
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(<BookMain bookList={this.state.booklist} moveBook={this.moveBook}/>)}/>
        <Route exact path="/search" render={()=>(<Search bookList={this.state.booklist} moveBook={this.moveBook}/>)}/>
      </div>
    )
  }
}
export default BooksApp
