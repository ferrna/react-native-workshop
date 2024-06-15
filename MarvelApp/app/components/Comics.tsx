import * as React from 'react'
import { ActivityIndicator, FlatList, ScrollView, StyleSheet } from 'react-native'
import Comic from './Comic'
import axios from 'axios'
import apiParams from '../../config.js'

export default function Comics({ listComics }: { listComics: any[] }) {
  const { ts, apikey, hash } = apiParams
  const [isLoading, setLoading] = React.useState<any>(true)
  const [data, setData] = React.useState<any[]>([])

  React.useEffect(() => {
    const promisesArray = listComics.map((c) =>
      axios.get(c.resourceURI, {
        params: {
          ts,
          apikey,
          hash,
        },
      })
    )
    Promise.all(promisesArray)
      .then((responses) => setData(responses.map((r) => r?.data?.data?.results[0])))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          pagingEnabled
          contentContainerStyle={{ alignItems: 'center' }}
          data={data}
          keyExtractor={({ id }) => id.toString()}
          horizontal
          renderItem={({ item }) => (
            <Comic
              key={item.id}
              name={item.title}
              image={`${item?.thumbnail?.path}.${item.thumbnail.extension}`}
            />
          )}
        />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
})
