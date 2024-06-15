import * as React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

export type RootStackParamList = {
  Detail: { id: number } | undefined
}

export default function CharacterCard({
  id,
  image,
  name,
  navigation,
}: {
  id: number
  image: string
  name: string
  navigation: any
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('components/Detail', {
          itemId: id,
          otherParam: 'anything you want here',
        })
      }
    >
      <Text style={styles.font}>{name}</Text>
      <div style={{ ...padding(10, 10, 5, 10), color: 'black' }}>
        <img style={styles.image} src={image} />
      </div>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    maxWidth: '100%',
  },
  font: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

function padding(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b !== undefined ? b : a,
    paddingBottom: c !== undefined ? c : a,
    paddingLeft: d !== undefined ? d : b !== undefined ? b : a,
  }
}
