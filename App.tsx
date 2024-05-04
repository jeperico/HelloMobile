import { View, StyleSheet } from 'react-native';
import HelloWorld from './src/components/HelloWorld';

export default function App() {

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <HelloWorld catName='Blue'></HelloWorld>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d8fad',
    alignItems: 'center',
    justifyContent: 'center',
  },
});