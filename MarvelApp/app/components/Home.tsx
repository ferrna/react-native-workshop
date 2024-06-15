import { useEffect, useState } from 'react'
import apiParams from '../../config.js'
import axios from 'axios'
import { ActivityIndicator, FlatList, ScrollView, StyleSheet } from 'react-native'
import CharacterCard from './CharacterCard'
import { Searchbar } from 'react-native-paper'

export default function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const { ts, apikey, hash, baseURL } = apiParams

  useEffect(() => {
    axios
      .get(`${baseURL}/v1/public/characters`, {
        params: {
          ts,
          apikey,
          hash,
        },
      })
      .then((response) => {
        console.log(response)
        setData(response.data.data.results)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  function searchCharacter() {
    if (search) {
      setLoading(true)
      axios
        .get(`${baseURL}/v1/public/characters`, {
          params: {
            ts,
            apikey,
            hash,
            nameStartsWith: search,
          },
        })
        .then((response) => setData(response.data.data.results))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <div>
          <Searchbar
            placeholder="Search for character..."
            onChangeText={(value) => setSearch(value)}
            value={search}
            onIconPress={searchCharacter}
            onSubmitEditing={searchCharacter}
          />
          <FlatList
            data={data}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <CharacterCard
                id={item.id}
                image={`${item?.thumbnail?.path}.${item.thumbnail.extension}`}
                name={item.name}
                navigation={navigation}
              />
            )}
          />
        </div>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
