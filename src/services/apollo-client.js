import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: process.env.NEXT_PUBLIC_API_KEY || "",
  },
})

export default client
