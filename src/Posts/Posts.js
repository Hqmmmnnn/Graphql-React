import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

export default class Posts extends Component{
  render() {
    return (
      <ul>
        <Query query={POSTS_QUERY}>
          {({loading, data, fetchMore }) => {
            if(loading) return "loading...";
            const { posts } = data;
            return (
              <Fragment>
                {posts.map(post => (
                  <li key={post.id}>
                    <Link to={`/post/${post.id}`}>
                      {post.title}
                    </Link>
                  </li>                   
                ))}
                <li>
                  <button onClick={() => fetchMore({
                    variables: {
                      skip: posts.length
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if(!fetchMoreResult) return prev;
                      return Object.assign({}, {
                        posts: [...prev.posts, ...fetchMoreResult.posts]
                      })
                    }
                })}
                >
                  Load more
                  </button>
                </li>
              </Fragment>
            )
          }}
        </Query>
      </ul>
    )
  }
}

const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_ASC, first: 2, skip: $skip) {
      id
      title
      body
    }
  }
`;