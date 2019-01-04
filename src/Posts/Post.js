import React, { Component } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UpdatePost from "./UpdatePost";
import EditMode from "./EditMode"

export default class Post extends Component {
  render() {
    const { match } = this.props
    return (
      <div>
        <Query 
          query={POST_QUERY}
          variables={{
            id: match.params.id,
          }}
        >
          {({data, loading}) => {
              if(loading) return "Loading...";
              const { post, isEditMode } = data;
              return (
                <div>
                  <EditMode isEditMode={isEditMode}/>
                  {isEditMode ? (
                  <section>
                    <h1>edit post</h1>
                    <UpdatePost post={post}/>
                  </section>
                ) : (
                  <section>
                    <h1>{post.body}</h1>
                  </section>
                )}
                </div>
              )
            }
          }
        </Query>
      </div>
    )
  }
}

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where:{id: $id}) {
      id
      title
      body
    }

    isEditMode @client
  }
`;