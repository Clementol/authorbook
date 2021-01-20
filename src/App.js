import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";


//Components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

//Apollo client setup
const client = new ApolloClient({
  uri: 'https://authorbook100.herokuapp.com/graphql'
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client }>
        <div id="main">
          <h1>Ninja's Reading List</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}


export default App;

let  date = new Date()
console.log(date.toISOString())