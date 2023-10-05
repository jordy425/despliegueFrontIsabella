import { useMemo, useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import _ from "lodash"

const DataTable = ({ headers, body, createModal, configTable }) => {
   const [search, setSearch] = useState('')
   // const [] = useState(null)
   const [page, setPage] = useState(1)
   const [rowsPerPage, setRowsPerPage] = useState(configTable.initialRows)

   const startRow = (page - 1) * rowsPerPage + 1
   const endRow = Math.min(startRow + rowsPerPage - 1, body.length)

   const filteredData = body.filter(row => {
      return headers.some(col => {
         if (Array.isArray(col.prop)) {
            return col.prop.some(subProp => {
               const values = Array.isArray(subProp)
                  ? subProp.map(sub => {
                       return sub.includes('.') ? _.get(row, sub, '') : row[sub];
                    })
                  : [subProp.includes('.') ? _.get(row, subProp, '') : row[subProp]];
               const concatenatedValue = values.join(' ');
               return concatenatedValue.toLowerCase().includes(search.toLowerCase());
            });
         } else {
            const value = _.get(row, col.prop, '');
            return value.toString().toLowerCase().includes(search.toLowerCase());
         }
      });
   });
   

   const showMessage = useMemo(() => {
      if (body.length === 0) {
         return "Mostrando 0 Registros";
      }
      if (filteredData.length === body.length) {
         return `Mostrando ${startRow} - ${endRow} de ${body.length} Registros`
      }
      return `${filteredData.length === 1 ? 'Coincide' : 'Coinciden'} ${filteredData.length} de ${body.length} ${body.length === 1 ? 'Registro' : 'Registros'}`
   }, [startRow, endRow, body, filteredData])

   const sortedData = useMemo(() => {
      return filteredData;
      // if (!sortConfig) return filteredData;

      // const sorted = [...filteredData];
      // sorted.sort((a, b) => {
      //   if (a[sortConfig.key] < b[sortConfig.key]) {
      //     return sortConfig.direction === 'asc' ? -1 : 1;
      //   }
      //   if (a[sortConfig.key] > b[sortConfig.key]) {
      //     return sortConfig.direction === 'asc' ? 1 : -1;
      //   }
      //   return 0;
      // });
      // return sorted;
      //  }, [filteredData, sortConfig]);
   }, [filteredData]);

   const arrayProps = (row, col, tool) => {
      if (Array.isArray(col.prop)) {
         const props = col.prop.map((i) => i.includes('.') ? _.get(row, i, '') : row[i])
         const value = props.join(' ');
         if (tool === false) {
            if (value.length > 20) {
               return value.substring(0, 20) + "...";
            }
         }
         return value;
      } else {
         if (col.prop === '') {
            return col.message;
         } else {
            const value = col.prop.includes('.') ? _.get(row, col.prop, '') : row[col.prop];
            if (tool === false) {
               if (value.length > 20) {
                  return value.substring(0, 20) + "...";
               }
            }
            return value;
         }
      }
   };
   

   // TODO: Forma de pasar otro tipo de elemento a la tabla { title: "Actions", prop: "", cell: (row) => (<button onClick={() => { alert(`Id: ${row.idProgramaFormativo}`) }}>Ver ID</button>) },

   const lastRow = page * rowsPerPage
   const firstRow = lastRow - rowsPerPage
   const showRows = sortedData.slice(firstRow, lastRow)
   return (
      <div className={`flex-col`}>
         <div className="flex justify-between w-full mb-2 items-center">
            <div className="flex">
               {configTable.rowPage && (
                  <div className='mr-2'>
                     <label className="mr-2">Registros por página: </label>
                     <select name="cantidadPagina" onChange={(e) => { setRowsPerPage(e.target.value); setPage(1) }} className="px-3 py-2 border appearance-none rounded-md text-sm focus:outline-none">
                        {configTable.rowPage.maxRows.map((i, index) => (
                           <option key={index} value={i}>{i}</option>
                        ))}
                     </select>
                  </div>
               )}
               {createModal !== null && (
                  <div>
                     {createModal}
                  </div>
               )}
            </div>
            {configTable.filtrable && (
               <div className="">
                  <input type="text" name="buscar" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." className="px-3 py-2 border rounded-md text-sm focus:outline-none" />
               </div>
            )}
         </div>
         <div className="overflow-x-auto w-full">
            <table className="table table-hover table-bordered">
               <thead className="st-head">
                  <tr>
                     {headers.map((col, index) => (
                        <th key={index}>{col.title}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {showRows.length === 0 ? (
                     <tr>
                        <td className='text-center' colSpan={`${headers.length}`}>No se encontraron resultados</td>
                     </tr>
                  ) : (
                     showRows.map((row, index) => (
                        <tr key={index}>
                           {headers.map((col) => (
                              <td key={col.prop} data-toggle="tooltip" title={!col.cell ? arrayProps(row, col, true) : null} >
                                 {col.cell ? col.cell(row) : (
                                    arrayProps(row, col, false)
                                 )}
                              </td>
                           ))}
                        </tr>
                     ))
                  )}
               </tbody>
            </table>
         </div>
         <div className="flex justify-between items-center">
            <div className="">
               <p>{configTable.message && showMessage}</p>
            </div>
            {configTable.pagination && (
               <div className="rounded min-w-[20%] st-pagination px-3 py-1.5 flex justify-between items-center">
                  <button onClick={() => setPage(page - 1)} disabled={page === 1}><BsArrowLeft /></button>
                  <span>{page}</span>
                  <button onClick={() => setPage(page + 1)} disabled={lastRow >= sortedData.length}><BsArrowRight /></button>
               </div>
            )}
         </div>
      </div>

   )
}

export default DataTable