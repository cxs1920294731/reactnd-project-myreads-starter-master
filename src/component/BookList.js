/**
 * Created by Hakim on 2018/3/7.
 */
import React from 'react'
import BookInfor from './BookInfor'
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
export default BookList