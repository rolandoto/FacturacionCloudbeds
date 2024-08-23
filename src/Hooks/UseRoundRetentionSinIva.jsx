
const UseRoundRetentionSinIva =({Price=0}) =>{
    function roundTo(value, decimals) {
               return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
           }
           const RountValue =(round) =>{
             return  Math.round(round * 100000) / 100000;
           }
   
           const CalculateRetention =(ValorProduct) =>{
               let totalDeseado =ValorProduct
               let tasaIVA = 0.00;
               let tasaRetefuente = 0.035;
               let factor = 1 + tasaIVA - tasaRetefuente;
               let subtotal = totalDeseado / factor;
               subtotal = roundTo(subtotal, 5);
               let iva = subtotal * tasaIVA;
               iva = roundTo(iva, 2);
               let retefuente = subtotal * tasaRetefuente;
               retefuente = roundTo(retefuente, 2);
               let total = roundTo(subtotal + iva - retefuente, 2);
               if (total !== totalDeseado) {
                   let adjustment = totalDeseado - total;
                   subtotal += adjustment;
                   iva = roundTo(subtotal * tasaIVA, 2);
                   retefuente = roundTo(subtotal * tasaRetefuente, 2);
                   total = roundTo(subtotal + iva - retefuente, 2);
               }
             return {subtotal,retefuente,total,iva}
           }
   
           const {subtotal,retefuente,total,iva} = CalculateRetention(Price)
   
           const SubtotalDianSinIva =RountValue(subtotal)
           const TotalIvaSinIva = RountValue(iva)
           const TotalRetentionDianSinIva = RountValue(retefuente)
           const TotalPaySinIva = RountValue(total)
   
           return {SubtotalDianSinIva,TotalIvaSinIva,TotalRetentionDianSinIva,TotalPaySinIva}
   
   }
   
   export default UseRoundRetentionSinIva
   