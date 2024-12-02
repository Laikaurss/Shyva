import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para salvar a mensagem
export const saveMessage = async (message) => {
    try {
        await AsyncStorage.setItem('userMessage', message);
    } catch (error) {
        console.error('Erro ao salvar a mensagem:', error);
    }
};

// Função para carregar a mensagem
export const loadMessage = async () => {
    try {
        const savedMessage = await AsyncStorage.getItem('userMessage');
        return savedMessage || 'Preciso de Ajuda!!'; //Mensagem padrão
    } catch (error) {
        console.error('Erro ao carregar a mensagem:', error);
        return '';
    }
};
