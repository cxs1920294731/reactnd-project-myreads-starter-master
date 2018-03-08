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
      console.log(data)
      self.setState({
        booklist:data
      })
    })
  }
  moveBook(book,toState){
    let self=this;
    BooksAPI.update(book,toState).then((bookIDList)=>{
      console.log(bookIDList);

      self.setState({
        booklist:self.state.booklist.map((value)=>{
          if(bookIDList.currentlyReading.indexOf(value.id)>-1){
             value.shelf='currentlyReading';
          }else if(bookIDList.wantToRead.indexOf(value.id)>-1){
            value.shelf='wantToRead';
          }else  if(bookIDList.read.indexOf(value.id)>-1){
            value.shelf='read';
          }
          return value;
        })
      })
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
