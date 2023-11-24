import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const TherapistDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="menu">
        <p className="menu-label">Dashboard fisioterapeuta</p>
        <ul className="menu-list has-background-grey-lighter">
          <li>
            <NavLink to="/therapist-dashboard/therapist-home" >
              <FontAwesomeIcon icon={faHome} />
              <span className="icon-text"></span>
            </NavLink>
          </li>
          <li><NavLink to="/therapist-dashboard/add-patient" className={({ isActive }) => isActive ? "is-active" : ""}>Adicionar Paciente</NavLink></li>
          <li><NavLink to="/therapist-dashboard/patient-list" className={({ isActive }) => isActive ? "is-active" : ""}>Lista de Pacientes</NavLink></li>
          <li><NavLink to="/" className="logout"><FontAwesomeIcon icon={faSignOutAlt} /> Sair</NavLink></li>
        </ul>
        
      </aside>
      
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default TherapistDashboard;
