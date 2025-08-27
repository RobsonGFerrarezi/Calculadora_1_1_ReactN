import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Adicionado para o dropdown

export default function App() {

  const [valor1, setValor1] = useState(0);
  const [valor2, setValor2] = useState(0);
  const [resultado, setResultado] = useState(0);
  const [operacao, setOperacao] = useState('')

  function calcular() {
    if (valor1 === '' || valor2 === '') {
      Alert.alert('ERRO:', 'Por favor, preencha todos os campos!');
      return;
    }

    const v1 = Number.parseFloat(valor1.replace(',', '.'));
    const v2 = Number.parseFloat(valor2.replace(',', '.'));

    switch (operacao) {
      case 'somar':
        const soma = v1 + v2;
        setResultado(soma);
        Alert.alert('Resultado:', `A soma: ${valor1} + ${valor2} = ${soma}`);
        break;
      case 'subtrair':
        const sub = v1 - v2;
        setResultado(sub);
        Alert.alert('Resultado:', `A subtração: ${valor1} - ${valor2} = ${sub}`);
        break;
      case 'multiplicar':
        const prod = v1 * v2;
        setResultado(prod);
        Alert.alert('Resultado:', `O produto: ${valor1} x ${valor2} = ${prod}`);
        break;
      case 'dividir':
        if (v2 === 0) {
          Alert.alert('ERRO:', 'O segundo valor não pode ser 0 para uma divisão!');
          return;
        }
        const div = v1 / v2;
        setResultado(div);
        Alert.alert('Resultado:', `A divisão: ${valor1} / ${valor2} = ${div}`);
        break;
      case 'exponencial':
        const expo = v1 ** v2;
        setResultado(expo);
        Alert.alert('Resultado:', `A exponencial: ${valor1} ^ ${valor2} = ${expo}`);
        break;
      default:
        Alert.alert('ERRO:', 'Selecione uma operação!');
    }
    
  }


  return (
    <View style={styles.container}>
      <Text style={styles.labelCampo}>Digite o primeiro valor: </Text>
      <TextInput style={styles.caixaTexto}
        keyboardType="decimal-pad"
        onChangeText={(text) => setValor1(text)}
      />

      <Text style={styles.labelCampo}>Digite o segundo valor: </Text>
      <TextInput style={styles.caixaTexto}
        keyboardType="decimal-pad"
        onChangeText={(text) => setValor2(text)}
      />

      {/* Dropdown de seleção de operação */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={operacao}
          onValueChange={(itemValue) => setOperacao(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma operação..." value="" />
          <Picker.Item label="Somar" value="somar" />
          <Picker.Item label="Subtrair" value="subtrair" />
          <Picker.Item label="Multiplicar" value="multiplicar" />
          <Picker.Item label="Divisão" value="dividir" />
          <Picker.Item label="Exponenciação" value="exponencial" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.botao}
        onPress={() => calcular()}
      >
        <Text style={styles.botaoTexto}>Calcular</Text>
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
  },
  picker: {
    color: '#000',
    fontSize: 18,
    width: '100%',
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
