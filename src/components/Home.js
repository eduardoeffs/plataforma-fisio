// src/components/Home.js
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header>
        <h1>Sistema de Acompanhamento de Dor</h1>
        <p>Seja bem-vindo! Este sistema permite o registro e acompanhamento do nível de dor de pacientes.</p>
      </header>
      <main>
        <section className="login-section">
          <h2>Login</h2>
          <a href="patient-login" className="login-link">Paciente</a>
          <a href="therapist-login" className="login-link">Fisioterapeuta</a>
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Sistema de Acompanhamento de Dor</p>
      </footer>
    </div>
  );
}

export default Home;
