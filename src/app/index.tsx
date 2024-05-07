import { View, Text, Image, Pressable, Linking, Button } from 'react-native'
import React, { useState } from 'react'

const Home = () => {

  const [count, setCounter] = useState(0)

  const handleCounter = () => {
    setCounter(count + 1)
  }

  return (
    <View className='flex-1 items-center justify-center gap-5'>
      <View className='size-32'>
        <Image source={require('../public/aupi_logo.jpeg')} alt='' className='w-full h-full'/>
      </View>

      <View>
        <Text className='text-2xl font-bold text-center'>Bem-vindo ao template padrão da</Text> 
        <Pressable onPress={() => Linking.openURL('https://aupi.com.br')}>
          <Text className='text-[#5178be] text-xl font-bold text-center'>
            Aupi Soluções em TI
          </Text>
        </Pressable>
      </View>

      <View>
        <Button color={'#5178be'} title='CLIQUE AQUI' onPress={handleCounter}></Button>

        <View>
          {count > 0 && (
            <View className=' w-full p-5 justify-center items-center'>
              <Text className='text-lg'>{count}</Text>
            </View>
          )}
        </View>
      </View>
      
    </View>
  )
}

export default Home