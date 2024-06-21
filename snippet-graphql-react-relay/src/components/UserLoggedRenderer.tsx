import React from 'react'
import { Text, View } from 'react-native'
import { QueryRenderer, graphql } from 'react-relay'
import environment from '../../relay/environment'

const UserLoggedRenderer = () => {
  const renderContent = (viewer: any) => {
    if (!viewer?.user) {
      return null
    }

    const { user } = viewer

    return (
      <View style={{ marginTop: 15, alignItems: 'center' }}>
        <Text>User {user?.username || user?.email} logged</Text>
      </View>
    )
  }

  return (
    // @ts-ignore
    <QueryRenderer
      environment={environment}
      query={graphql`
        query UserLoggedRendererQuery {
          viewer {
            user {
              id
              createdAt
              updatedAt
              username
            }
            sessionToken
          }
        }
      `}
      variables={null}
      render={({
        error,
        props,
      }: {
        error: { message: string }
        props: { viewer: any }
      }) => {
        if (error) {
          return (
            <View>
              <Text>{error.message}</Text>
            </View>
          )
        } else if (props) {
          return renderContent(props.viewer)
        }
        return (
          <View>
            <Text>loading</Text>
          </View>
        )
      }}
    />
  )
}

export default UserLoggedRenderer
