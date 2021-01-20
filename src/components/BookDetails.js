import React from 'react';
import {graphql} from 'react-apollo'
import {getBookQuery} from '../queries/queries'

class BookDetails extends React.Component {

    bookDetails(book) {
      if (book) {
        return (
          <div>
            <h2>{book.name}</h2>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
            <p>{book.author.age}</p>
            <h3>All Books by {book.author.name}</h3>
            <ul className="other-books">
              {
                book.author.books.map( item => {
                  return (
                    <li key={item.id}>{item.name}</li>
                  )
                })
              }
            </ul>
          </div>
        )
      } 
        return (
          <div>No book Selected</div>
        )
  
    }

    displayBookDetails() {
      const {loading, book} = this.props.data;
      if (loading) {
        return <div>Loading</div>
      }
      return this.bookDetails(book) 
    }
    render() {
      console.log(this.props)
      return (
        <div id="book-details"> 
          <p>Output book detail here</p>
          { this.displayBookDetails() }
        </div>
      );
    }
  }

  export default graphql(getBookQuery, {
    options: props => {
      return {
        variables: {
          id: props.bookids
        }
      }
    }
  })(BookDetails) 