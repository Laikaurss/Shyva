import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'; 
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

export default function Calendario() {
  const navigation = useNavigation();

  return (
    <View style={styles.view}>
      <TouchableOpacity 
        style={styles.sair} 
        onPress={() => navigation.navigate('SOS')} 
      >
        <Image source={require('../assets/setarosa.png')} style={styles.imagem} />
      </TouchableOpacity>

      <Calendar style={styles.calendar} />
      <Calendar style={styles.calendario} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomePage')}
      >
        <Text style={styles.buttonText}>Editar menstruação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FFE9E9',
    height: '100%',
    width: '100%',
  },
  calendar: {
    backgroundColor: 'transparent',
    top: 80,
  },
  calendario: {},
  button: {
    backgroundColor: '#F9497D',
    padding: 10,
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    
  },
  sair: {
    position: 'absolute',
    top: 40, 
    padding: 10,
    backgroundColor: 'transparent',
    left:15,
  },
  imagem: {
    width: 10,  
    height: 15, 
   
  },
});
