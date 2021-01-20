import React from 'react';
import {graphql} from 'react-apollo';
import {compose} from 'redux'
import {getAuthorsQuery, getBooksQuery, addBookMutation} from '../queries/queries'


class AddBook extends React.Component {
  constructor(props) {
    super(props)
    this.onChangeBookName = this.onChangeBookName.bind(this)
    this.onChangeGenre = this.onChangeGenre.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }

    onChangeBookName(event) {
      this.setState({
        name: event.target.value
      })
    }

    onChangeGenre(event) {
      this.setState({
        genre: event.target.value
      })
    }

    onSubmit(event) {
      event.preventDefault()
      this.props.addBookMutation({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorId
        },
        refetchQueries: [{query: getBooksQuery}]
        
      } )
      
    }

    displayAuthors() {
      // console.log(this.props)
      let data = this.props.getAuthorsQuery
      if(data.loading) {
        return ( 
          <option disabled>Loading Authors</option>
         ) 
      } else {
        return data.authors.map( author => {
          return (
          <option key={author.id} value={author.id}>{ author.name}</option>
          )
        })
      }
    }

    render() {
      
      return (
        <form id="add-book" onSubmit={this.onSubmit}>
          
          <div className="field form-group">
            <label>Book Name</label> <br />
            <input type="text" 
              className="form-control"
              required
              autoComplete="true"
              value={this.state.name}
              onChange={ this.onChangeBookName }
            />
          </div>

          <div className="field form-group">
            <label>Genre</label> <br />
            <input type="text" 
              className="form-control"
              required
              value={this.state.genre}
              onChange={ this.onChangeGenre }
            />
          </div>

          <div className="field form-group">
            <label>Author</label> <br />
            <select
              className="form-control" 
              required
              value={this.state.authorId}
              onChange={ e => this.setState({authorId: e.target.value}) }
            >
              <option>Select Author</option>
              {this.displayAuthors()}
            </select>
          </div>
          <div className="form-group">
            <button type='submit' className="btn btn-primary btn-group-sm">Add Book</button>
          </div>
        </form>
      );
    }
  }
  
  
export default compose (
  graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
  graphql(addBookMutation, {name: 'addBookMutation'})
  )(AddBook) ;