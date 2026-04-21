import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DadosPessoaisForm = ({ onNavigate }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [inicio, setInicio] = useState('');
  const [tipo, setTipo] = useState('selecione');

  const formatCPF = (value) => {
    // Remove tudo que não for dígito
    const digits = value.replace(/\D/g, '');
    let formatted = digits;
    if (digits.length > 9) {
      formatted = digits.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (digits.length > 6) {
      formatted = digits.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (digits.length > 3) {
      formatted = digits.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    return formatted;
  };

  const formatDate = (value) => {
    // Remove tudo que não for dígito
    const digits = value.replace(/\D/g, '');
    let formatted = digits;
    if (digits.length > 4) {
      formatted = digits.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (digits.length > 2) {
      formatted = digits.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }
    return formatted;
  };

  const handleCpfChange = (text) => {
    const formatted = formatCPF(text);
    setCpf(formatted);
  };

  const handleDateChange = (text) => {
    const formatted = formatDate(text);
    setInicio(formatted);
  };

  const handleProx = () => {
    if (!nome.trim() || !cpf.trim() || !idade.trim() || !inicio.trim() || !tipo) {
      Alert.alert('Campos incompletos', 'Preencha todos os campos antes de prosseguir.');
      return;
    }
    
    const formData = { nome, cpf, idade, inicio, tipo };
    console.log('📋 Enviando dados:', formData);
    
    if (onNavigate) {
      onNavigate(formData);
    } else {
      Alert.alert('Próximo', `Formulário enviado - Tipo: ${tipo}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* Título: DADOS / PESSOAIS */}
          <View style={styles.titleBlock}>
            <Text style={styles.titleLine}>DADOS</Text>
            <Text style={styles.titleLine}>PESSOAIS</Text>
          </View>

          {/* Linha 1: Nome | CPF */}
          <View style={styles.formRow}>
            <View style={styles.field}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor="#94a3b8"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>CPF</Text>
              <TextInput
                style={styles.input}
                placeholder="000.000.000-00"
                placeholderTextColor="#94a3b8"
                value={cpf}
                onChangeText={handleCpfChange}
                keyboardType="numeric"
                maxLength={14}
              />
            </View>
          </View>

          {/* Linha 2: Idade | INICIO */}
          <View style={styles.formRow}>
            <View style={styles.field}>
              <Text style={styles.label}>Idade</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua idade"
                placeholderTextColor="#94a3b8"
                value={idade}
                onChangeText={setIdade}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>INICIO</Text>
              <TextInput
                style={styles.input}
                placeholder="dd/mm/aaaa"
                placeholderTextColor="#94a3b8"
                value={inicio}
                onChangeText={handleDateChange}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
          </View>

          {/* Seletor: Filho ou Visitante */}
          <View style={styles.fieldFull}>
            <Text style={styles.label}>Você é um:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tipo}
                onValueChange={setTipo}
                style={styles.picker}
              >
                <Picker.Item label="Selecione..." value="" />
                <Picker.Item label="Filho" value="filho" />
                <Picker.Item label="Visitante" value="visitante" />
              </Picker>
            </View>
          </View>

          {/* Botão Prox → */}
          <TouchableOpacity
            style={styles.proxButton}
            onPress={handleProx}
            activeOpacity={0.8}
          >
            <Text style={styles.proxButtonText}>Prox  </Text>
            <Text style={styles.arrowBtn}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e5e7eb',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    paddingVertical: 28,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  titleBlock: {
    marginBottom: 32,
  },
  titleLine: {
    fontWeight: '700',
    fontSize: 32,
    letterSpacing: -0.5,
    color: '#0b1e33',
    textTransform: 'uppercase',
    lineHeight: 38,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  field: {
    flex: 1,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    color: '#1e293b',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '450',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  pickerContainer: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#0f172a',
    fontSize: 16,
  },
  fieldFull: {
    width: '100%',
    marginBottom: 16,
  },
  proxButton: {
    backgroundColor: '#0b1e33',
    borderRadius: 60,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1e2f44',
    shadowColor: '#0b1e33',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 8,
  },
  proxButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -0.2,
  },
  arrowBtn: {
    fontSize: 26,
    color: '#ffffff',
    lineHeight: 28,
    marginLeft: 4,
  },
});

export default DadosPessoaisForm;



//aqui eu fiquei cansado de editar o código, então parei, mas o código acima é a versão mais recente do App