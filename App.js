import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Text, View, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SosScreen from './screens/sos';
import Configuracoes from './screens/configuracoes';
import Contatos from './screens/contatos';
import Calendario from './screens/calendario';
import HomePage from './screens/homePage';
import Addcontatos from './screens/addContato';
import ConfigBotao from './screens/configBotao';
import Informacoes from './screens/informacoes';
import FAQScreen from './screens/perguntas';
import Galeria from './screens/Galeria';
import Cofre from './screens/cofre';
import EditarContato from './screens/EditarContato';
import Mensagem from './screens/mensagem';

function HomeScreen({ navigation }) {
  const [name, setName] = useState('');

  //Pula etapa de inserir nome caso tenha algum salvo na memoria
  useEffect(() => {
    const checkName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        console.log('Nome salvo', storedName);  // Debugging
        if (storedName) {
          setName(storedName);  // Define o nome no estado se estiver salvo
          navigation.navigate('HomePage');
          console.log(name)
        }
      } catch (error) {
        console.error('Erro ao verificar o nome:', error);
      }
    };

    checkName(); //Verifica se se o nome está salvo

  }, [navigation]);


  const handleNameSubmit = async () => {
    try {
      // Salva o nome no cache do dispositivo
      await AsyncStorage.setItem('name', name);
      console.log('Nome salvo:', name);  // Confirmação
      navigation.navigate('HomePage');
    } catch (error) {
      console.error('Erro ao salvar o nome:', error);
    }
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: '#fff', paddingTop:60 }}>
      <Image source={require('./viva.jpeg')} style={{ width: '56%', height: 90 }} />
      <Image source={require('./logo.jpeg')} style={{ width: '100%', height: 250 }} />

      <Text style={{ textAlign: 'center', marginTop: '10%', color: '#000000B2', fontSize: 12 }}>
        Vamos nos conhecer!
      </Text>
      <Text style={{ color: '#F7054F', textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>
        Como devemos chamar você?
      </Text>

      <TextInput
        style={{
          backgroundColor: '#EDEFF1',
          height: 40,
          textAlign: 'center',
          borderRadius: 10,
          width: '80%',
          paddingHorizontal: 10,
          marginTop: 20,
        }}
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        onPress={handleNameSubmit}
        style={{
          alignItems: 'center',
          width: '45%',
          marginTop: '20%',
          backgroundColor: '#F9497D',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 15,
        }}
      >
        <Text style={{ color: '#fff' }}>Vamos lá!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ position: 'absolute', right: 20, top: 20 }}
        onPress={() => navigation.navigate('HomePage')}
      >
        <Text style={{ color: '#808080', fontSize: 12 }}>Pular</Text>
      </TouchableOpacity>

      <Text
        style={{
          marginLeft: '2%',
          marginRight: '2%',
          marginTop: '10%',
          fontSize: 8,
          fontWeight: '400',
          lineHeight: 20,
          letterSpacing: -0.408,
          textAlign: 'center',
          color: '#000000',
        }}
      >
        Ao fazer login, você concorda com nossos Termos e Condições, saiba como usamos seus dados em nossa Política de Privacidade.
      </Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <>
      <StatusBar backgroundColor="#F9497D" barStyle="light-content" />
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false, // Remove o cabeçalho em todas as telas
        }}
      >
        <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: '' }} />
        <HomeStack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <HomeStack.Screen name="SOS" component={SosScreen} options={{ headerShown: false }} />
        <HomeStack.Screen name="calendario" component={Calendario} options={{ headerShown: false }} />
        <HomeStack.Screen name="configuracoes" component={Configuracoes} options={{ headerShown: false }} />
        <HomeStack.Screen name="contatos" component={Contatos} options={{ headerShown: false }} />
        <HomeStack.Screen name="configBotao" component={ConfigBotao} options={{ headerShown: false }} />
        <HomeStack.Screen name="addcontatos" component={Addcontatos} options={{ headerShown: false }} />
        <HomeStack.Screen name="EditarContato" component={EditarContato} options={{ headerShown: false }} />
        <HomeStack.Screen name="informacoes" component={Informacoes} options={{ headerShown: false }} />
        <HomeStack.Screen name="perguntas" component={FAQScreen} options={{ headerShown: false }} />
        <HomeStack.Screen name="cofre" component={Cofre} options={{ headerShown: false }} />
        <HomeStack.Screen name="galeria" component={Galeria} options={{ headerShown: false }} />
        <HomeStack.Screen name="Mensagem" component={Mensagem} options={{ headerShown: false }} />
      </HomeStack.Navigator>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <HomeStackScreen />
    </NavigationContainer>
  );
}
