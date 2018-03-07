/**
 * Created by Hakim on 2018/3/7.
 */
import React from 'react'
class BookInfor extends React.Component{
  constructor(props) {
    super(props);
    this.hand =this.hand.bind(this);
    this.state={
      bookState: this.props.book.shelf
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
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+this.props.book.imageLinks.smallThumbnail+')'  }}></div>
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
        <div className="book-authors">{this.props.book.authors ? this.props.book.authors[0] : ''}</div>
      </div>
    );
  }
}
export default BookInfor