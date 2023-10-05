import { Fragment } from 'react';
import MotivosComite from './motivos_comite/MotivosComite';
import EstadoDecision from './estado_decision/EstadoDecision';
import EstadoQuejas from './estados_quejas/EstadosQuejas';
import DecisionComite from './decision_comite/DecisionComite';

const Administrador = () => {
   return (
      <Fragment>
         <h2 className='text-4xl mb-2'>Administración</h2>
         <div className='card mb-20'>
            <div className='card-body'>
               <ul className="nav nav-tabs">
                  <li className="nav-item">
                     <a className="nav-link active" data-toggle="tab" href="#menu1">Motivos Comité</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" data-toggle="tab" href="#menu4">Decisiones Comité</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" data-toggle="tab" href="#menu3">Estado Quejas</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" data-toggle="tab" href="#menu2">Estado Decisión</a>
                  </li>
               </ul>
               <div className="tab-content">
                  <div className="tab-pane active" id="menu1">
                     <MotivosComite />
                  </div>
                  <div className="tab-pane container fade" id="menu4">
                     <DecisionComite />
                  </div>
                  <div className="tab-pane container fade" id="menu3">
                     <EstadoQuejas />
                  </div>
                  <div className="tab-pane container fade" id="menu2">  
                     <EstadoDecision />
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
}

export default Administrador