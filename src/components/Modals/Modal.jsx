function Modal({ children, configModal }) {
   return (
      <div>
         <button type="button" className={`${configModal.btnClasses}`} data-toggle="modal" data-target={`#crear${configModal.identify.replace(/\s/g, '')}`}>
            {configModal.nameBtn}
         </button>
         <div className="modal fade w-full p-0" id={`crear${configModal.identify.replace(/\s/g, '')}`}>
            <div className={`modal-dialog ${configModal.modalClasses}`}>
               <div className="modal-content" style={configModal.modalContent}>
                  <div className="modal-header">
                     <h4 className="modal-title text-xl">{configModal.nameTitle}</h4>
                     <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body">
                     {children}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
// function Modal({ children, name, styles }) {
//    return (
//       <div>
//          <button type="button" className="smc-button p-2 rounded" data-toggle="modal" data-target={`#crear${name.replace(/\s/g, '')}`}>
//             {name}
//          </button>
//          <div className="modal fade w-full p-0" id={`crear${name.replace(/\s/g, '')}`}>
//             <div className={`modal-dialog ${styles.modalWidth === null ? '' : styles.modalWidth}`}>
//                <div className="modal-content" style={styles.content}>
//                   <div className="modal-header">
//                      <h4 className="modal-title text-2xl">{name}</h4>
//                      <button type="button" className="close" data-dismiss="modal">&times;</button>
//                   </div>
//                   <div className="modal-body">
//                      {children}
//                   </div>
//                </div>
//             </div>
//          </div>
//       </div>
//    )
// }

export default Modal