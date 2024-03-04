import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import React, { useContext } from 'react'
import { context } from '../auth/AuthContex';
import { setContext } from '@apollo/client/link/context';


const ApolloClients = ({children}) => {

  const {getToken} = useContext(context);

  const token = getToken();

  const httpLink = createHttpLink({
    uri: `${process.env.API_SERVER}/graphql`,
  });
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });


  return (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
  )
}

export default ApolloClients;