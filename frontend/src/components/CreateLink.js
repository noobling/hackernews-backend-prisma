import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

export default class CreateLink extends Component {
  state = {
    description: '',
    url: ''
  }

  render() {
    const { description, url } = this.state
    return (
      <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
        {postMutation => (
          <div className="flex flex-column mt3">
            <input
              className="mb2"
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
              type="text"
              required
              placeholder="A description for the link"
            />
            <input
              className="mb2"
              value={url}
              onChange={e => this.setState({ url: e.target.value })}
              type="text"
              required
              placeholder="The URL for the link"
            />
            <button onClick={postMutation}>Submit</button>
          </div>
        )}
      </Mutation>
    )
  }
}
