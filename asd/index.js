import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import App from './dados-pessoais';
import App2 from './atualizacao-de-cadastro';
import App3 from './app3';

function RootNavigator() {
  const [currentPage, setCurrentPage] = useState('login');
  const [formData, setFormData] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // Navegar do login para cadastro
  const handleNavigateToCadastro = () => {
    console.log('🔀 Navegando para cadastro...');
    setCurrentPage('cadastro');
  };

  // Navegar do cadastro para processamento (app2)
  const handleNavigateToApp2 = (data) => {
    console.log('📋 Dados do Formulário de Cadastro:', data);
    setFormData(data);
    setCurrentPage('app2');
  };

  // Voltar para login
  const handleBackToLogin = () => {
    setCurrentPage('login');
    setFormData(null);
    setUsuarioLogado(null);
  };

  // Sucesso no login
  const handleLoginSuccess = (usuario) => {
    console.log('✅ Usuário logado:', usuario);
    setUsuarioLogado(usuario);
    setCurrentPage('app2');
  };

  return currentPage === 'login' ? (
    <App3 
      onNavigateToCadastro={handleNavigateToCadastro} 
      onLoginSuccess={handleLoginSuccess}
    />
  ) : currentPage === 'cadastro' ? (
    <App onNavigate={handleNavigateToApp2} />
  ) : (
    <App2 
      onBack={handleBackToLogin} 
      formData={formData}
      usuarioLogado={usuarioLogado}
    />
  );
}

registerRootComponent(RootNavigator);
