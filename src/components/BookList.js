import React from 'react';
import {graphql} from 'react-apollo'
import {getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails';


class BookList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }
  displayBooks() {
    let data = this.props.data
    if (data.loading) {
      return (
        <div>
          loading ...
        </div>
      )
    } else {

      return data.books.map( book => {
        return (
          <li key={book.id} onClick={ () => {this.setState({selected: book.id})} } >{book.name}</li>
        )
      })
    }
  }


  render() {
    // console.log(this.props)
    
    return (
      <div className="book-list-container">
        <ul id="book-list" >
            {this.displayBooks()}
        </ul>
        <BookDetails bookids={this.state.selected} />
      </div>
    );
  }
}


export default graphql(getBooksQuery)(BookList) ;
