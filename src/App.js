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
    SessionApi.ininSessionStorage();
  }
  componentDidMount(){
    BooksAPI.getAll().then((data)=>{console.log(data)})
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
