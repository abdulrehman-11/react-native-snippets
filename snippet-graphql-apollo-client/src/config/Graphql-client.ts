
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://coupons.thesinella.com/api/',
  cache: new InMemoryCache(),
})

/* 
useQuery example

import { gql, useQuery } from '@apollo/client';

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;


const { loading, error, data } = useQuery(GET_DOGS);
*/

/* 
useMutation example

import { gql, useMutation } from '@apollo/client';

const INCREMENT_COUNTER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation IncrementCounter {
    currentValue
  }
`;

function MyComponent() {
  const [mutateFunction, { data, loading, error }] = useMutation(INCREMENT_COUNTER);
}
*/
