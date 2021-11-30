import React from "react"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { useMemo } from "react"
import { NextPage } from "next"
import type { NextApiRequest, NextApiResponse } from "next"

export interface GraphQlContext {
  req: NextApiRequest
  res: NextApiResponse
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

function createIsomorphicLink(context: GraphQlContext | undefined) {
  /**
   * SSG and SSR
   */
  // if (typeof window === "undefined") {
  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   const { SchemaLink } = require("@apollo/client/link/schema")
  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   const graphQlSchema = require("./schema.graphql")
  //   return new SchemaLink({ schema: graphQlSchema, context })
  // }

  /**
   * Client-side
   */
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { HttpLink } = require("@apollo/client")
  return new HttpLink({
    uri: "http://127.0.0.1:4000/graphql",

    // credentials: "cross-origin",
  })
}

const httpLink = createHttpLink({
  uri: "https://127.0.0.1:4000/graphql",
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: "1a9854c2-7475-40df-a997-9332f3c71b37",
    },
  }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createApolloClient(context?: GraphQlContext): ApolloClient<any> {
  return new ApolloClient({
    /**
     * Enable SSR mode when not running on the client-side
     */
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: any = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: GraphQlContext
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ApolloClient<any> {
  const _apolloClient = apolloClient ?? createApolloClient(context)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    const existingCache = _apolloClient.extract()

    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  /**
   * SSG and SSR
   * Always create a new Apollo Client
   */
  if (typeof window === "undefined") {
    return _apolloClient
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export const getApolloClient = initializeApollo

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApollo(initialState: any) {
  const apolloStore = useMemo(
    () => initializeApollo(initialState),
    [initialState]
  )
  return apolloStore
}

export const withApollo =
  (Comp: NextPage) =>
  (props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apolloState: any
  }) => {
    const apolloStore = useApollo(props.apolloState)
    return (
      <ApolloProvider client={apolloStore}>
        <Comp />
      </ApolloProvider>
    )
  }
