const client = require("../config/db");

async function createViews() {
  console.log("Creating Views")
  const createCumprimentoMetasMensalView = `
      CREATE VIEW IF NOT EXISTS default.vw_cumprimento_metas_mensal_vendedor AS
      SELECT 
        tsf.id_employee,
        tsf.month,
        tsf.sales_target,
        COALESCE(SUM(tf.preco), 0) AS total_vendido
      FROM 
        targets_salesperson_final_v6 tsf
      LEFT JOIN 
        x2024 tf 
      ON 
        tsf.id_employee = tf.cod_vendedor 
        AND tsf.month = formatDateTime(toDate(tf.data), '%m/%Y')
      GROUP BY 
        tsf.id_employee, tsf.month, tsf.sales_target;
    `;

  const createProductMarginView = `
    CREATE VIEW IF NOT EXISTS default.vw_margem_produtos AS 
    SELECT 
      tsf.cod_prod,
      tsf.data_inicio,
      tsf.data_fim,
      (SUM(tf.preco) / SUM(tf.quantidade)) - tsf.custo AS margem_produto
    FROM 
      sku_cost tsf
    LEFT JOIN
      transaction_fact_v6_2024 tf 
    ON 
      tsf.cod_prod = tf.cod_prod
    WHERE 
      tf.data BETWEEN tsf.data_inicio AND tsf.data_fim
      AND tf.quantidade > 0 
    GROUP BY 
      tsf.cod_prod, 
      tsf.data_inicio, 
      tsf.data_fim, 
      tsf.custo;

      `;

  try {
    await client.command({ query: createCumprimentoMetasMensalView, createProductMarginView });
    console.log("View vw_cumprimento_metas_mensal_vendedor created or already exists.");
  } catch (err) {
    console.error("Error creating view vw_cumprimento_metas_mensal_vendedor:", err);
  }

}

module.exports = {
  createViews
};
