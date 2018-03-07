/**
 * Created by Hakim on 2018/3/7.
 */
import React from 'react'
import BookInfor from './BookInfor'
import {Link} from 'react-router-dom'
import * as SessionApi from './../sessionStorageApi'
import * as BooksAPI from './../BooksAPI'
class Search extends React.Component{
  constructor(props){
    super(props);
    this.state={
      bookListSearch:[],
      value:''
    }
    this.handChange=this.handChange.bind(this);
    this.moveBook = this.moveBook.bind(this);
  }
  componentDidMount(){
    //this.bookList= SessionApi.getSessionStorage();

  }
  moveBook(val,toState){
    let self=this;
    BooksAPI.update(val,toState);
  }
  handChange(e){
    let value=e.target.value;
    let self=this;
    if (value.toString().length>0){
      BooksAPI.search(value).then((data)=>{
        console.log(data)
        self.setState(function (prevState,props) {
          return {
            bookListSearch:data,
            value:value
          }
        })
      })
    }else {
      self.setState(function (prevState,props) {
        return {
          bookListSearch:[],
          value:value
        }
      })
    }

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
export default Search