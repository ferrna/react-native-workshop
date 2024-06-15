import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Information from './Information'
import Comics from './Comics'
import apiParams from '../../config.js'
import axios from 'axios'

const Tab = createBottomTabNavigator()

export default function Detail({ route }: { route: any }) {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<any>({})
  const { ts, apikey, hash, baseURL } = apiParams

  useEffect(() => {
    axios
      .get(`${baseURL}/v1/public/characters/${route.params.itemId}`, {
        params: {
          ts,
          apikey,
          hash,
        },
      })
      .then((response) => {
        console.log(response)
        setData(response.data.data.results[0])
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh' }}>
      <Tab.Navigator initialRouteName="Information">
        <Tab.Screen
          name="Information"
          options={{
            tabBarIcon: ({ color, size }) => <div></div>,
          }}
        >
          {() =>
            isLoading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <Information
                image={`${data?.thumbnail?.path}.${data.thumbnail.extension}`}
                name={data.name}
                description={data.description}
              />
            )
          }
        </Tab.Screen>
        <Tab.Screen
          name="Comics"
          options={{
            tabBarIcon: ({ color, size }) => <div></div>,
          }}
        >
          {() =>
            isLoading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <Comics listComics={data?.comics?.items} />
            )
          }
        </Tab.Screen>
      </Tab.Navigator>
    </div>
  )
}
