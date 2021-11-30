import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import fetch from "isomorphic-unfetch"
import { createUploadLink } from "apollo-upload-client"
import https from "https"

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: createUploadLink({
      uri: "https://localhost:4000/graphql", // Server URL (must be absolute)
      credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
      fetch,
      fetchOptions: {
        agent: new https.Agent({ rejectUnauthorized: false }),
      },
    }),
    cache: new InMemoryCache().restore(initialState),
  })
}
