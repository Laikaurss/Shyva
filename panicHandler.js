import axios from "axios";
import { carregarContatos } from "./screens/addContato";
import { getAddressFromLocation } from "./locationApi";
import { loadMessage } from "./messageStorage";


export const handlePanic = async () => {
    const contatos = await carregarContatos();
    const userMessage = await loadMessage();

    if (contatos.length === 0) {
       
        console.log("Nenhum contato salvo");
        return;
    }


    const getLocationData = async () => {
        try {
          const address = await getAddressFromLocation();
          
          // Cria link do google masps
          const googleMapsLink = `https://www.google.com/maps?q=${address.latitude},${address.longitude}`;
          
          
          // Retorna a mensagem com localização e o link para o google maps
          return `Cidade: ${address.cidade}, Bairro: ${address.bairro}, Rua: ${address.rua}, CEP: ${address.cep}\nLink do Google Maps: ${googleMapsLink}`;
        } catch (error) {
          return "Erro ao obter localização";
        }
      };
    
      const local = await getLocationData();

    contatos.forEach(async (contato) => {
        try {
            console.log(`Enviando mensagem para o número: ${contato.numeroComDdd}`);
            console.log(local);
            const response = await axios.post('https://2bf1-2804-7d74-82-f900-712e-41ac-220b-2285.ngrok-free.app/message/sendText/Alerta', {
                number: contato.numeroComDdd,
                textMessage: {
                    text: `${userMessage} \nLocalização: ${local}`
                },
                options: {
                    delay: 0,
                    presence: "composing",
                    linkPreview: true
                }
            }, {
                headers: {
                    'apikey': 'B6D711FCDE4D4FD5936544120E713976'
                }
            });
            console.log(`Mensagem enviada para ${contato.celular}:`, response.data);
        } catch (error) {
            if (error.response) {
                console.error(`Erro ao enviar para ${contato.celular}:`, error.response.data);
            } else {
                console.error(`Erro ao enviar para ${contato.celular}:`, error.message);
            }
        }
    });
};
