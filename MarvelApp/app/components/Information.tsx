import * as React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default function Information({
  image,
  name,
  description,
}: {
  image: string
  name: string
  description: string
}) {
  return (
    <div>
      <ScrollView contentContainerStyle={styles.container}>
        <img src={image} alt="character-image" />
        <Text>{name}</Text>
        <Text>{description}</Text>
      </ScrollView>
    </div>
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
