import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, Switch, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConfigBotao() { 
    const navigation = useNavigation(); 

    const [gravarPanic, setGravarPanic] = useState(false);
    const [chamadaEmergencia, setChamadaEmergencia] = useState(false);
    const [mensagemEmergencia, setMensagemEmergencia] = useState(false);
    const [mensagemTexto, setMensagemTexto] = useState('');

    return (
        <View style={styles.view}>
            <StatusBar translucent backgroundColor="#F9497D" barStyle="dark-content"/>
            
            <TouchableOpacity 
                style={styles.sair} 
                onPress={() => navigation.navigate('configuracoes')} 
            >
                <Image source={require('../assets/sair.png')} style={styles.imagemsair} />
            </TouchableOpacity>
            
            <Text style={styles.texto}> Configurar botões </Text>
            
            <View style={styles.botoes}> 
                <View style={styles.botao}>
                    <Text style={styles.textoBotao}>Iniciar gravação com botão de pânico</Text>
                    <Switch 
                        value={gravarPanic} 
                        onValueChange={(value) => setGravarPanic(value)} 
                        style={styles.switch}
                    />
                </View>
                
                <View style={styles.botao}>
                    <Text style={styles.textoBotao}>Realizar chamada automática para contato de emergência</Text>
                    <Switch 
                        value={chamadaEmergencia} 
                        onValueChange={(value) => setChamadaEmergencia(value)} 
                        style={styles.switch}
                    />
                </View>
                
                <View style={styles.botao}>
                    <Text style={styles.textoBotao}>Enviar mensagem automática para contatos de emergência</Text>
                    <Switch 
                        value={mensagemEmergencia} 
                        onValueChange={(value) => setMensagemEmergencia(value)} 
                        style={styles.switch}
                    />
                </View> 

                <TouchableOpacity style={styles.botao}>
                    <Text style={styles.textoBotao}>Tempo limite para gravação de áudio</Text>
                    <Image source={require('../assets/setinha.png')} style={styles.setinha} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao}>
                    <Text style={styles.textoBotao}>Permitir acesso</Text>
                    <Image source={require('../assets/setinha.png')} style={styles.setinha} />
                </TouchableOpacity>
            </View>

            <Text style={styles.mensagemTitulo}>Mensagem automática</Text>

            <View style={styles.mensagem}>

                <TextInput 
                    style={styles.textInput} 
                    placeholder=" Olá, preciso de ajuda urgente. Estou em uma situação de violência. Por favor, venham me ajudar o mais rápido possível. Obrigada." 
                    value={mensagemTexto} 
                    onChangeText={text => setMensagemTexto(text)} 
                    multiline
                    />
                      <TouchableOpacity style={styles.botaoMensagem}>
                    <Image source={require('../assets/editar.jpeg')} style={styles.imagemBotaoMensagem} />
                    </TouchableOpacity>
                    
                
            </View>
            <View style={styles.rodape}>
            <TouchableOpacity style={styles.botaoFinal}>
                <Image source={require('../assets/adicionar1.png')} style={styles.imagemBotaoFinal} />
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: "#FFE9E9",
        height: "100%",
        width: "100%", 
        alignItems: "center",
        paddingTop: 40,
    },
    texto: {
        marginTop: 20,
        fontSize: 17,
        textAlign: "center",
    },
    botoes: {
        marginTop: 25, 
        width: '100%',  
    },
    botao: {
        borderColor: "#A9A4A4",
        borderBottomWidth: 0.5,
        width: "100%", 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingLeft: 25,
        paddingRight: 10,
    },
    textoBotao: {
        color: '#727272',
        marginRight: 10,
        flex: 1,
        fontSize: 12,
    },
    switch: {
        marginLeft: 10,
    },
    sair: {
        position: "absolute",
        left: -10,
        width: 30,
        height: 30,
        top: -1,
    },
    imagemsair: {
        position: "absolute",
        left: 20,
        width: 30,
        height: 30,
        top: 54,
    },
    setinha: {
        position: "absolute",
        right: 20,
        width: 5,
        height: 12,
        top: 20,
    },
    mensagemTitulo: {
        marginTop: 20,
        fontSize: 17,    
    },
    mensagem: {
        marginTop: 20,
        backgroundColor: "white",
        height: 100,
        width: "95%",
        borderWidth: 0.5,          
        borderColor: "#B4B4B4",  
        borderRadius: 0.5,  
    },
    textInput: {
        height: "100%",       
        fontSize: 12,
        textAlignVertical: 'top', 
        backgroundColor: "#F5F5F5",
        paddingLeft: 8,
        paddingRight: 10,
        textAlign: "justify"
    },
    botaoFinal: {
        marginTop: 100,          
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#F9497D",
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    rodape:{
        width:"100%",
        height:"50",
        backgroundColor:"white",
        marginTop:190,
        borderWidth: 0.5,          
        borderColor: "#B4B4B4",  
        borderRadius: 0.5,  
        alignItems: "center",
    },

    imagemBotaoFinal: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: -120,
    },

    imagemBotaoMensagem:{
        width:20,
        height:15,
        position: 'absolute',
        top:-20,
        right:3,
        


    },
});
