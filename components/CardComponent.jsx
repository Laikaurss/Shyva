// components/CardComponent.js

import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const CardComponent = ({
  images,
  titleStyle,
  borderStyle,
  cardWidth = width * 0.9, // Largura do card padrão
  cardHeight = 200, // Altura do card padrão
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
      {images.map((image) => (
        <View key={image.id} style={[styles.card, { width: cardWidth, height: cardHeight }, borderStyle]}>
          <Image 
            source={image.source} 
            style={styles.image} // A imagem vai ocupar 100% do card
            resizeMode="cover" 
          />
          <Text style={[styles.title, titleStyle]}>{image.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    margin: 10
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden', // Para garantir que a borda arredondada seja aplicada
    marginRight: 10, // Espaço entre os cards
    justifyContent: 'center', // Centralizar conteúdo
    alignItems: 'flex-start', // Alinhamento do título
  },
  title: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Cor do título
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente para melhor legibilidade
    padding: 5,
    borderRadius: 5, // Bordas arredondadas para o fundo do título
  },
  image: {
    width: '100%', // A imagem ocupa 100% da largura do card
    height: '100%', // A imagem ocupa 100% da altura do card
  },
});

export default CardComponent;
