// src/components/Home.js
import React from 'react';
import './Home.css';

function Home() {
  // Ano atual para o rodapé
  const currentYear = new Date().getFullYear();

  return (
    <div className="home">
      <section className="hero has-background-grey-lighter">
        <div className="hero-body">
          <p className="title has-text-grey-darker">
            Sistema de Acompanhamento de Dor
          </p>
          <p className="subtitle has-text-grey-darker">
            Seja bem-vindo! Este sistema permite o registro e acompanhamento do nível de dor de pacientes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="box">
                <h2 className="title has-text-centered">Login</h2>
                <div className="buttons are-large is-centered">
                  <a href="patient-login" className="button is-success is-fullwidth is-rounded">Paciente</a>
                  <a href="therapist-login" className="button is-success is-fullwidth is-rounded">Fisioterapeuta</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer content has-text-centered">
          <p>
            &copy; {currentYear} Sistema de Acompanhamento de Dor
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
