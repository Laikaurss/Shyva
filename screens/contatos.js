import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput, Modal } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { excluirContato, carregarContatos } from './addContato';

export default function Contatos() {
    const navigation = useNavigation();
    const [contatos, setContatos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [mensagem, setMensagem] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            const fetchContatos = async () => {
                const contatosCarregados = await carregarContatos();
                setContatos(contatosCarregados);
            };
            fetchContatos();
        }, [])
    );

    const abrirModal = () => {
        console.log('Abrindo modal'); // Debug para verificar se a função está sendo chamada
        setModalVisible(true);
    };

    const fecharModal = () => {
        console.log('Fechando modal'); // Debug para verificar se a função está sendo chamada
        setModalVisible(false);
    };

    const salvarMensagem = () => {
        console.log('Mensagem salva:', mensagem);
        fecharModal();
    };

    return (
        <View style={styles.view}>
            <TouchableOpacity 
                style={styles.sair} 
                onPress={() => navigation.navigate('configuracoes')} 
            >
                <Image source={require('../assets/setaesquerda.png')} style={styles.setaesquerda} />
            </TouchableOpacity>
            
            <Text style={styles.texto}> Contatos </Text>
                <View style={styles.botoes}> 
                <FlatList
                    data={contatos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.contactItem}
                            onPress={() => navigation.navigate('EditarContato', { contato: item })}
                        >
                            <Text style={styles.contactText}>{item.nome}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.contatosList}
                />
                <TouchableOpacity 
                    style={styles.botao} 
                    onPress={() => navigation.navigate('addcontatos')} 
                >                    
                    <Text style={styles.textoBotao}> Adicionar contato </Text>
                    <Image source={require('../assets/setinha.png')} style={styles.setinha} />
                    <Image source={require('../assets/adicionar.png')} style={styles.imagem} />
                </TouchableOpacity>
            </View>

            {/* Modal para gravar/editar mensagem */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={fecharModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Mensagem automática</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Olá, preciso de ajuda urgente. Estou em uma situação de violência. Por favor, venham me ajudar o mais rápido possível. Obrigada. "
                            value={mensagem}
                            onChangeText={setMensagem}
                            multiline
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={salvarMensagem} style={styles.saveButton}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={fecharModal} style={styles.cancelButton}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={abrirModal} style={{ position:'absolute', borderRadius: 5, top:55, right:10}}>
            <Image source={require('../assets/Group_177.png')} style={{ width: 50, height: 30 }} resizeMode='contain' />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: "#FFE9E9",
        height: "100%",
        width: "100%", 
        alignItems: "center",
        paddingTop:40
    },
    texto: {
        marginTop: 20,
        fontSize: 17,
        textAlign: "center",
    },
    botoes: {
        marginTop: 60, 
        width: '100%',  
    },
    botao: {
        backgroundColor: "#fff", 
        padding: 20,
        borderColor: "#A9A4A4",
        borderTopWidth: 0.5,
        width: "100%", 
    },
    setinha: {
        position: "absolute",
        right: 15,
        width: 10,
        height: 20,
        top: 20,
    },
    imagem: {
        position: "absolute",
        left: 20,
        width: 28,
        height: 28,
        top: 14,
    },  
    textoBotao: {
        textAlign: "justify",
        marginLeft: 50,
        color:"#4092FF"
    },
    sair: {
        position: "absolute",
        width: 30,
        height: 30,
        top: 25,
        left: 20,
    },
    setaesquerda:{
        width: 10,
        height: 15,
        top:40
    },
    btnMensagem:{
        position: 'absolute',
        top: -25,
        right: -170
    },
    contatosList: {
        marginTop: 30,
        width: '100%',
    },
    contactItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF99',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        alignItems: 'center',
    },
    contactText: {
        fontSize: 18,
        marginLeft: 10
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
        backgroundColor: '#F9497D',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 14,
        marginBottom: 15,
        color:"#ffffff"
    },
    input: {
        width: '100%',
        height: 100,
        borderColor: '#F9F6F6',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
        backgroundColor:"#fff",
            
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#F9497D',
        fontWeight: 'bold',
    },
});
