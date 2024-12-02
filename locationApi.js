import * as Location from 'expo-location';
import axios from 'axios';

// Função para buscar o endereço usando o expo-location
export const getAddressFromLocation = async () => {
  try {
    // Solicita permisão de localização
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permissão de localização não concedida');
    }

    // Recebe as coordenadas atuais
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    // Faz a geocodificação
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (address.length > 0) {
      const { city, district, street, postalCode } = address[0];

      // Caso tenha algum erro para obter alguma localização retorna pela api do correios
      if (!city || !district || !street) {
        const viacep = await getCityFromCep(postalCode);
        return {
          cidade: viacep.data.localidade || 'Cidade não encontrada',
          bairro: viacep.data.bairro,
          rua: viacep.data.logradouro,
          cep: postalCode,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
      }

      // Retorno pelo expo
      return {
        cidade: city,
        bairro: district,
        rua: street,
        cep: postalCode,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } else {
      throw new Error('Não foi possível obter o endereço');
    }

  } catch (error) {
    console.error('Erro ao obter o endereço:', error);
    throw error;
  }
};

// Função para buscar a cidade usando o CEP usando viacep
const getCityFromCep = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      throw new Error('CEP inválido');
    }

    // Retorna a cidade do CEP
    return response;
  } catch (error) {
    console.error('Erro ao buscar cidade pelo CEP:', error);
    return null;
  }
};
