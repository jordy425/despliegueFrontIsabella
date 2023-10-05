import { Fragment } from 'react';
import  Competencias  from "./Competencias/Competencias";
import ResultadosAprendizaje from "./ResultadosAprendizaje/ResultadosAprendizaje";
import ProgramasFormativos from "./programas_formativos/ProgramasFormativos";

const Gestion = () => {
   return (
      <Fragment>
         <h2 className='text-4xl mb-2'>Programas Formativos</h2>
         <div className='card mb-20'>
            <div className='card-body'>
               <ul className="nav nav-tabs">
                  <li className="nav-item">
                     <a className="nav-link active" data-toggle="tab" href="#menu1">Programas Formativos</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" data-toggle="tab" href="#menu2">Competencias</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" data-toggle="tab" href="#menu3">Resultados de Aprendizaje</a>
                  </li>
               </ul>
               <div className="tab-content">
                  <div className="tab-pane active" id="menu1">
                     <ProgramasFormativos/>
                  </div>
                  <div className="tab-pane container fade" id="menu2">
                     <Competencias/>
                  </div>
                  <div className="tab-pane container fade" id="menu3">
                     <ResultadosAprendizaje/>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
}

export default Gestion