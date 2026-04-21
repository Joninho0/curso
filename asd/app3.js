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
  ActivityIndicator,
} from 'react-native';

const LoginForm = ({ onNavigateToCadastro, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // email ou cpf

  // Simulação de banco de dados (em produção, seria uma API)
  const usuariosCadastrados = [
    { email: 'usuario@example.com', cpf: '123.456.789-00', nome: 'João Silva' },
    { email: 'maria@example.com', cpf: '987.654.321-11', nome: 'Maria Santos' },
    { email: 'teste@example.com', cpf: '111.222.333-44', nome: 'Teste User' },
  ];

  const formatCPF = (value) => {
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

  const handleCpfChange = (text) => {
    const formatted = formatCPF(text);
    setCpf(formatted);
  };

  const handleLogin = () => {
    setLoading(true);

    // Simulação de delay de busca no banco
    setTimeout(() => {
      setLoading(false);

      if (loginMethod === 'email') {
        if (!email.trim()) {
          Alert.alert('Atenção', 'Digite seu email para fazer login');
          return;
        }

        const usuarioEncontrado = usuariosCadastrados.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (usuarioEncontrado) {
          Alert.alert('✅ Sucesso', `Bem-vindo(a), ${usuarioEncontrado.nome}!`);
          console.log('📧 Login com email:', usuarioEncontrado);
          if (onLoginSuccess) {
            onLoginSuccess(usuarioEncontrado);
          }
        } else {
          Alert.alert('❌ Erro', 'Email não encontrado. Você precisa se cadastrar primeiro.');
        }
      } else {
        if (!cpf.trim()) {
          Alert.alert('Atenção', 'Digite seu CPF para fazer login');
          return;
        }

        const usuarioEncontrado = usuariosCadastrados.find(
          (u) => u.cpf === cpf
        );

        if (usuarioEncontrado) {
          Alert.alert('✅ Sucesso', `Bem-vindo(a), ${usuarioEncontrado.nome}!`);
          console.log('📋 Login com CPF:', usuarioEncontrado);
          if (onLoginSuccess) {
            onLoginSuccess(usuarioEncontrado);
          }
        } else {
          Alert.alert('❌ Erro', 'CPF não encontrado. Você precisa se cadastrar primeiro.');
        }
      }
    }, 1000);
  };

  const handleCadastro = () => {
    console.log('🔀 Redirecionando para cadastro...');
    if (onNavigateToCadastro) {
      onNavigateToCadastro();
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
          {/* Título */}
          <View style={styles.titleBlock}>
            <Text style={styles.titleLine}>LOGIN</Text>
            <Text style={styles.subtitle}>Acesse sua conta</Text>
          </View>

          {/* Seletor de método de login */}
          <View style={styles.methodSelector}>
            <TouchableOpacity
              style={[
                styles.methodButton,
                loginMethod === 'email' && styles.methodButtonActive,
              ]}
              onPress={() => {
                setLoginMethod('email');
                setCpf('');
              }}
            >
              <Text
                style={[
                  styles.methodButtonText,
                  loginMethod === 'email' && styles.methodButtonTextActive,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.methodButton,
                loginMethod === 'cpf' && styles.methodButtonActive,
              ]}
              onPress={() => {
                setLoginMethod('cpf');
                setEmail('');
              }}
            >
              <Text
                style={[
                  styles.methodButtonText,
                  loginMethod === 'cpf' && styles.methodButtonTextActive,
                ]}
              >
                CPF
              </Text>
            </TouchableOpacity>
          </View>

          {/* Campo de entrada - Email */}
          {loginMethod === 'email' && (
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={!loading}
              />
            </View>
          )}

          {/* Campo de entrada - CPF */}
          {loginMethod === 'cpf' && (
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
                editable={!loading}
              />
            </View>
          )}

          {/* Botão Login */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <>
                <Text style={styles.loginButtonText}>Fazer Login</Text>
                <Text style={styles.arrowBtn}>→</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Dividor */}
          <View style={styles.divider} />

          {/* Texto de cadastro */}
          <Text style={styles.cadastroText}>Não tem uma conta?</Text>

          {/* Botão Cadastro */}
          <TouchableOpacity
            style={styles.cadastroButton}
            onPress={handleCadastro}
            activeOpacity={0.8}
          >
            <Text style={styles.cadastroButtonText}>Criar nova conta</Text>
            <Text style={styles.arrowBtnSecondary}>→</Text>
          </TouchableOpacity>

          {/* Info de usuários de teste */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>👤 Usuários para teste:</Text>
            <Text style={styles.infoText}>Email: usuario@example.com</Text>
            <Text style={styles.infoText}>Email: maria@example.com</Text>
            <Text style={styles.infoText}>CPF: 123.456.789-00</Text>
          </View>
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
    marginBottom: 28,
  },
  titleLine: {
    fontWeight: '700',
    fontSize: 36,
    letterSpacing: -0.5,
    color: '#0b1e33',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  methodSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  methodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  methodButtonActive: {
    backgroundColor: '#0b1e33',
    borderColor: '#0b1e33',
  },
  methodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
  methodButtonTextActive: {
    color: '#ffffff',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    color: '#1e293b',
    marginBottom: 8,
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
  loginButton: {
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
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -0.2,
  },
  arrowBtn: {
    fontSize: 24,
    color: '#ffffff',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 20,
  },
  cadastroText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
    fontWeight: '500',
  },
  cadastroButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 60,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    marginBottom: 24,
  },
  cadastroButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b1e33',
    letterSpacing: -0.2,
  },
  arrowBtnSecondary: {
    fontSize: 22,
    color: '#0b1e33',
    marginLeft: 8,
  },
  infoBox: {
    backgroundColor: '#f0f9ff',
    borderRadius: 16,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#0284c7',
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#0c4a6e',
    marginBottom: 4,
    fontFamily: 'Courier New',
  },
});

export default LoginForm;
