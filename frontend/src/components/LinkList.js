import React from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export default () => {
  const FEED_QUERY = gql`
    {
      feed {
        links {
          id
          createdAt
          description
          url
        }
      }
    }
  `
  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data: { feed } }) => {
        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>
        const links = feed.links
        return (
          <div>
            {links.map(link => (
              <Link {...link} />
            ))}
          </div>
        )
      }}
    </Query>
  )
}
