import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

type HelloWorldProps = {
  catName: string;
}

export default function HelloWorld(props: HelloWorldProps) {

  const [number, setNumber] = useState('');
  const [hungry, setHungry] = useState(true);

  function pressButton() {
    setTimeout(() => {
      setHungry(true);
    }, 4000);
    setHungry(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.helloWorld}>Hello, World!</Text>
      <Image 
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={styles.imageCat}
      />
      <Text style={styles.data}>Cat name - {props.catName} </Text>
      <Text style={styles.data}>Cat age - {number || 0} </Text>
      <TextInput
        placeholder='Insert'
        placeholderTextColor='#fff'
        value={number}
        keyboardType='numeric'
        onChangeText={setNumber}
        style={styles.input}
      />
      <Button
        onPress={() => pressButton()}
        disabled={!hungry}
        title={hungry ? "I'm Hungry, fooooooooood!!" : 'Thank you insignificant creature'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d8fad',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  helloWorld: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 32,
  },
  imageCat: {
    height: 200,
    width: 200,
  },
  data: {
    textAlign: 'center',
    lineHeight: 24,
    color: '#fff',
    fontSize: 12,
  },
  input: {
    backgroundColor: '#3da4c4a0',
    color: '#fff',
    width: 200,
    textAlign: 'center',
    margin: 10,
    padding: 5,
  },
});