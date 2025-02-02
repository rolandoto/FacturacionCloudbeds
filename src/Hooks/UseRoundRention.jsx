const UseRoundRetention = ({ Price = 0 }) => {

  function roundTo(value, decimals) {
      return Number((Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals));
  }

  const RountValue = (round) => {
      return Math.round(round * 100000) / 100000;
  }

  const CalculateRetention = (ValorProduct) => {
      let totalDeseado = ValorProduct;
      let tasaIVA = 0.19;
      let tasaRetefuente = 0.035;
      let factor = 1 + tasaIVA - tasaRetefuente;

      let subtotal = totalDeseado / factor;
      subtotal = roundTo(subtotal, 5);  // Redondeamos a 5 decimales para mayor precisión

      let iva = roundTo(subtotal * tasaIVA, 2);
      let retefuente = roundTo(subtotal * tasaRetefuente, 2);
      let total = roundTo(subtotal + iva - retefuente, 2);

      // Ajuste fino para lograr la coincidencia exacta con totalDeseado
      if (total !== totalDeseado) {
          let adjustment = roundTo((totalDeseado - total) / (1 + tasaIVA - tasaRetefuente), 5);
          subtotal = roundTo(subtotal + adjustment, 5);
          iva = roundTo(subtotal * tasaIVA, 2);
          retefuente = roundTo(subtotal * tasaRetefuente, 2);
          total = roundTo(subtotal + iva - retefuente, 2);
      }

      return { subtotal, retefuente, total, iva };
  }

  const { subtotal, retefuente, total, iva } = CalculateRetention(Price);

  const SubtotalDian = RountValue(subtotal);
  const TotalIva = RountValue(iva);
  const TotalRetentionDian = RountValue(retefuente);
  const TotalPay = RountValue(total);

  return { SubtotalDian, TotalIva, TotalRetentionDian, TotalPay };
}

export default UseRoundRetention;
