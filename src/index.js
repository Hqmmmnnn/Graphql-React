import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import App from './App';

const defaultState = {
  isEditMode: false
};

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage
})
.then(() => {
  const client = new ApolloClient({
    cache,
    uri: "https://api-euwest.graphcms.com/v1/cjqe3m3z8kw1901b0gj8gr8m8/master",
    clientState: {
      defaults: defaultState,
      resolvers: {}
    }
  });
  
  render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>, 
    document.querySelector('#root')
  );
});


