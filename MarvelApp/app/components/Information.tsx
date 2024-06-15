import * as React from 'react'
import { ScrollView, Text } from 'react-native'

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
      <ScrollView>
        <img src={image} alt="character-image" />
        <Text>{name}</Text>
        <Text>{description}</Text>
      </ScrollView>
    </div>
  )
}
