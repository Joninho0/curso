import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';

export default function App({ onBack, formData }) {
  const [nome, setNome] = useState(formData?.nome || '');
  const [cpf, setCpf] = useState(formData?.cpf || '');
  const [idade, setIdade] = useState(formData?.idade || '');
  const [orixa, setOrixa] = useState('');
  const [tempoCasa, setTempoCasa] = useState('');

  const handleSubmit = () => {
    Alert.alert('Sucesso', 'Cadastro atualizado com sucesso!');
    console.log({ nome, cpf, idade, orixa, tempoCasa });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Atualização</Text>
            <Text style={styles.title}>Cadastral</Text>
          </View>

          <View style={styles.iconCircle}>
            <Text style={styles.icon}>✦</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
              />
            </View>

            <View style={styles.fieldHalf}>
              <Text style={styles.label}>CPF</Text>
              <TextInput
                style={styles.input}
                value={cpf}
                onChangeText={setCpf}
                placeholder="Digite seu CPF"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>Idade</Text>
              <TextInput
                style={styles.input}
                value={idade}
                onChangeText={setIdade}
                placeholder="Sua idade"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.fieldHalf}>
              <Text style={styles.label}>Orixá</Text>
              <TextInput
                style={styles.input}
                value={orixa}
                onChangeText={setOrixa}
                placeholder="Digite o orixá"
              />
            </View>
          </View>

          <View style={styles.fieldFull}>
            <Text style={styles.label}>Tempo de Casa</Text>
            <TextInput
              style={styles.input}
              value={tempoCasa}
              onChangeText={setTempoCasa}
              placeholder="Ex: 2 anos"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          {onBack && (
            <TouchableOpacity 
              style={[styles.button, styles.buttonBack]} 
              onPress={onBack}
            >
              <Text style={styles.buttonText}>← Voltar</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#222',
    position: 'relative',
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
  },
  iconCircle: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 55,
    height: 55,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  icon: {
    fontSize: 26,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  fieldHalf: {
    flex: 1,
  },
  fieldFull: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#222',
    fontWeight: '600',
  },
  input: {
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#222',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonBack: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


//aqui eu fiquei cansado de editar o código, então parei, mas o código acima é a versão mais recente do App