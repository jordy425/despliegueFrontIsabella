const UpdateModal = ({ children, configModal }) => {
   return (
      <div>
         <button type="button" className={`${configModal.btnClasses}`} data-toggle="modal" data-target={`#update${configModal.identify.replace(/\s/g, '')}`}>
            {configModal.nameBtn}
         </button>
         <div className="modal fade" id={`update${configModal.identify.replace(/\s/g, '')}`}>
            <div className={`modal-dialog ${configModal.modalClasses}`}>
               <div className="modal-content" style={configModal.modalStylesContent}>
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

export default UpdateModal