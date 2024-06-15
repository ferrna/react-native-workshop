import * as React from 'react'
import { Image, Text, View } from 'react-native'

export default function Comic({ image, name }: { image: string; name: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: image }} />
      <Text>{name}</Text>
    </View>
  )
}
