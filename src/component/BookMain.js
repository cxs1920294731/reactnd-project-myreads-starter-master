/**
 * Created by Hakim on 2018/3/7.
 */
import React from 'react'
import BookList from './BookList'
import {Link} from 'react-router-dom'
import * as SessionApi from './../sessionStorageApi'
import * as BooksAPI from './../BooksAPI'
class BookMain extends React.Component{
  constructor(props){
    super(props);
    this.state={
      readingList:[],
      toReadList:[],
      readList:[]
    };
  }
  componentDidMount(){
   /* console.log(this.props.name);
    let self= this;
    self.bookListGet=[];
    BooksAPI.getAll().then((bookList)=>{
      self.bookListGet=bookList;
      self.setState({
        readingList:bookList.filter(function (val) {
          return (val.shelf=='currentlyReading') ? true : false;
        }),
        toReadList:bookList.filter(function (val) {
          return (val.shelf=='wantToRead') ? true : false;
        }),
        readList:bookList.filter(function (val) {
          return (val.shelf=='read') ? true : false;
        })
      })
    })*/
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
                <BookList index="currentlyReading" bookReading= {this.props.bookList.filter(function (val) {
                  return (val.shelf=='currentlyReading') ? true : false;})} moveBook={this.props.moveBook} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookList index="wantToRead" bookReading= {this.props.bookList.filter(function (val) {
                  return (val.shelf=='wantToRead') ? true : false;
                })} moveBook={this.props.moveBook} />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookList index="read" bookReading= {this.props.bookList.filter(function (val) {
                  return (val.shelf=='read') ? true : false;
                })} moveBook={this.props.moveBook} />
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
export default BookMain