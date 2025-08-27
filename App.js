import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Touchable } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Adicionado para o dropdown

import iconCalculadora from './assets/calc.png';
import Feather from '@expo/vector-icons/Feather';

export default function App() {

  const [valor1, setValor1] = useState(0);
  const [valor2, setValor2] = useState(0);
  const [resultado, setResultado] = useState(0);
  const [operacao, setOperacao] = useState('')

  function calcular(operacao) {
    if (valor1 === '' || valor2 === '') {
      Alert.alert('ERRO:', 'Por favor, preencha todos os campos!');
      return;
    }

    const v1 = Number.parseFloat(valor1.replace(',', '.'));
    const v2 = Number.parseFloat(valor2.replace(',', '.'));
    if (operacao === ''){
      Alert.alert('ERRO:', 'Selecione uma operação!');
      return;
    }
    else{
        if(isNaN(v1) || isNaN(v2)){
          Alert.alert('ERRO:', 'Valores inválidos! Use apenas números.');
          return;
        }
        else{
          let res = `${v1} ${operacao} ${v2}`;
          setResultado(eval(res));
          Alert.alert('Resultado:', `O resultado: ${v1} ${operacao} ${v2} = ${eval(res)}`);
        }
    }    
  }

  function Limpar(){
    setValor1(0);
    setValor2(0);
    setResultado(0);
    setOperacao('');
  }


  return (
    <View style={styles.container}>
      <Image source={iconCalculadora} style={{ width: 100, height: 100, marginBottom: 15 }} />
      <Text style={styles.titulo}>Calculadora</Text>

      <Text style={styles.labelCampo}>Digite o primeiro valor: </Text>
      <TextInput style={styles.caixaTexto}
        keyboardType="decimal-pad"
        value={valor1.toString()}
        onChangeText={(text) => setValor1(text)}
      />

      <Text style={styles.labelCampo}>Digite o segundo valor: </Text>
      <TextInput style={styles.caixaTexto}
        keyboardType="decimal-pad"
        value={valor2.toString()}
        onChangeText={(text) => setValor2(text)}
      />

      
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={operacao}
          onValueChange={(itemValue) => setOperacao(itemValue)}
          style={styles.picker}
        >
          {/*
          Icons do EXPO
          <Feather name="plus" size={24} color="black" />
          <Feather name="minus" size={24} color="black" />
          <Feather name="x" size={24} color="black" /> value="multiplicar" />
          <Feather name="divide" size={24} color="black" /> value="dividir" />
          <Feather name="power" size={24} color="black" />*/}

          <Picker.Item label="Selecione uma operação..." value="" />
          <Picker.Item label="➕" value="+" />
          <Picker.Item label="➖" value="-" />
          <Picker.Item label="✖️" value="*" />
          <Picker.Item label="➗" value="/" />
          <Picker.Item label="x^Y" value="**" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.botao}
        onPress={() => calcular(operacao)}
      >
        <Text style={styles.botaoTexto}>Calcular</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={Limpar}>
        <Feather name="trash-2" size={30} color="#f000ff" style={{ marginTop: 20 }} />
      </TouchableOpacity>

      <Text style={styles.labelCampo}>Resultado: {resultado}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: '#aaaaaa',
    borderRadius: 5,
    marginBottom: 15,
    width: '57%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  picker: {
    color: '#000',
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },
  op: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#515050',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontFamily: 'Courier New',
    color: '#f000ff',
    marginBottom: 15,
    borderColor: '#fff',
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  },
  caixaTexto: {
    borderBottomColor: '#000',
    borderWidth: 1,
    borderBottomWidth: 3,
    width: '57%',
    marginBottom: 15,
    padding: 5,
    fontSize: 20,
    backgroundColor: '#aaaaaa',
    color: '#fff',
    borderRadius: 5,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#f000ff',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    width: '40%',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  labelCampo: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    paddingTop: 10,
  },
});
