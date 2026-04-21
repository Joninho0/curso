import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import App from './App';
import App2 from './App2';

function RootNavigator() {
  const [currentPage, setCurrentPage] = useState('app1');
  const [formData, setFormData] = useState(null);

  const handleNavigateToApp2 = (data) => {
    console.log('📋 Dados do Formulário 1:', data);
    setFormData(data);
    setCurrentPage('app2');
  };

  const handleBackToApp = () => {
    setCurrentPage('app1');
  };

  return currentPage === 'app1' ? (
    <App onNavigate={handleNavigateToApp2} />
  ) : (
    <App2 onBack={handleBackToApp} formData={formData} />
  );
}

registerRootComponent(RootNavigator);
