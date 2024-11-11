const { format } = require("path");
const client = require("../config/db");

class DashboardService {
  // Método para retornar todos os vendedores de cada loja, rankeando-os por retorno (receita)
  async getTopSellersByStore(storeId, month) {
    try {
      const storeExists = await this.checkStoreExists(storeId);
      if (!storeExists) {
        throw new Error(`Loja com ID ${storeId} não encontrada.`);
      }

      const query = `
        SELECT 
          cod_loja, 
          cod_vendedor, 
          nome, 
          meta_vendedor, 
          vendas AS total_revenue,
          ano_mes
        FROM 
          default.vw_top_sellers
        WHERE 
          cod_loja = {storeId: String} AND ano_mes = {ano_mes: String}
        ORDER BY 
          total_revenue DESC
      `;

      const result = await client.query({
        query,
        query_params: { storeId, ano_mes: month },
        format: "JSONEachRow",
      });

      return result.json();
    } catch (error) {
      console.error(`Erro ao buscar top sellers: ${error.message}`);
      throw error;
    }
  }

  // Método para retornar o total de transações de cada loja
  async getTotalTransactionsByStore(storeId) {
    try {
      const storeExists = await this.checkStoreExists(storeId);
      if (!storeExists) {
        throw new Error(`Loja com ID ${storeId} não encontrada.`);
      }

      const query = `
        SELECT total_transacoes
        FROM default.vw_total_transactions_per_store
        WHERE cod_loja = {storeId: String}
      `;

      const result = await client.query({
        query,
        query_params: { storeId },
        format: "JSONEachRow",
      });

      return result.json();
    } catch (error) {
      console.error(`Erro ao buscar total de transações: ${error.message}`);
      throw error;
    }
  }

  // Método para retornar a meta de vendas de cada loja no mês
  async getSalesTargetByStore(storeId, month) {
    try {
      const storeExists = await this.checkStoreExists(storeId, month);
      if (!storeExists) {
        throw new Error(`Loja com ID ${storeId} não encontrada.`);
      }
      const query = `
        SELECT story_id, month, sales_target
        FROM target_store_final
        WHERE story_id = {storeId: String} AND month = {month: String}
      `;

      const result = await client.query({
        query,
        query_params: { storeId, month },
        format: "JSONEachRow",
      });

      const data = await result.json();
      return data;
    } catch (error) {
      console.error(`Erro ao buscar meta de vendas: ${error.message}`);
      throw error;
    }
  }

  // Método para retornar a receita até a data de cada loja
  async getRevenueToDateByStore(storeId, month) {
    try {
      const storeExists = await this.checkStoreExists(storeId);
      if (!storeExists) {
        throw new Error(`Loja com ID ${storeId} não encontrada.`);
      }

      const query = `
        SELECT *
        FROM default.vw_average_ticket_per_store
        WHERE cod_loja = {storeId: String} AND ano_mes = {ano_mes: String}
        GROUP BY cod_loja, ano_mes, total_quantidade, receita, ticket_medio
      `;

      const result = await client.query({
        query,
        query_params: { storeId, ano_mes: month },
        format: "JSONEachRow",
      });

      const data = await result.json();
      return data;
    } catch (error) {
      console.error(`Erro ao buscar receita diária: ${error.message}`);
      throw error;
    }
  }

  async getTopProducts(storeId, month) {
    try {
      const storeExists = await this.checkStoreExists(storeId);
      if (!storeExists) {
        throw new Error(`Loja com ID ${storeId} não encontrada.`);
      }

      const query = `
        SELECT nome_completo, marca, quantidade, ano_mes
        FROM default.vw_top_products
        WHERE cod_loja = {storeId: String} AND ano_mes = {ano_mes: String}
      `;

      const result = await client.query({
        query,
        query_params: { storeId, ano_mes: month },
        format: "JSONEachRow",
      });

      const data = await result.json();
      return data;
    } catch (error) {
      console.error(`Erro ao buscar receita diária: ${error.message}`);
      throw error;
    }
  }

  // Método para retornar a receita diária de cada loja
  async getRevenueByStore(storeId, month) {
    try {
      const storeExists = await this.checkStoreExists(storeId);
      if (!storeExists) {
        throw new Error(`Loja com ID ${storeId} não encontrada.`);
      }

      const query = `
        SELECT cod_loja, transaction_data, SUM(receita) AS total_revenue, ano_mes
        FROM default.vw_total_sales_per_store_per_date
        WHERE cod_loja = {storeId: String} AND ano_mes = {ano_mes: String}
        GROUP BY cod_loja, ano_mes, transaction_data
      `;

      const result = await client.query({
        query,
        query_params: { storeId, ano_mes: month },
        format: "JSONEachRow",
      });

      const data = await result.json();
      return data;
    } catch (error) {
      console.error(`Erro ao buscar receita diária: ${error.message}`);
      throw error;
    }
  }

  async getRankedStorePerformance(month) {
    const query = `
      SELECT nome_loja, regiao, percentual_meta
      FROM default.vw_top_regional_stores
      WHERE mes_meta = {month: String}
    `;
    const result = await client.query({
      query,
      query_params: { month },
      format: "JSONEachRow",
    });

    const data = await result.json();
    return data;
  }

  async getManagerBonus(storeId, month, regiao) {
    try {
      const storeExists = await this.checkStoreExists(storeId);
      if (!storeExists) {
        throw new Error(`Loja com ID ${storeId} não encontrada.`);
      }

      const baseSalary = 5000;
      const additionalIfAchieve = 3000;
      const bonusRegional = 2000;

      const query = `
        SELECT *
        FROM default.vw_top_regional_stores
        WHERE nome_loja = {storeId: String} AND mes_meta = {month: String} AND regiao = {regiao: String}
        GROUP BY nome_loja, mes_meta, regiao, meta_loja, vendas, percentual_meta
      `;

      const result = await client.query({
        query,
        query_params: { storeId, month, regiao },
        format: "JSONEachRow",
      });

      const storeData = await result.json();

      const targetAchieved =
        storeData.length > 0 && storeData[0].percentual_meta >= 100;

      const regionalQuery = `
      SELECT nome_loja, regiao, percentual_meta
      FROM default.vw_top_regional_stores
      WHERE mes_meta = {month: String} AND regiao = {regiao: String}
      ORDER BY percentual_meta DESC
      LIMIT 1
    `;

      const regionalResult = await client.query({
        query: regionalQuery,
        query_params: { month, regiao },
        format: "JSONEachRow",
      });

      const regionalData = await regionalResult.json();
      const isTopStore =
        regionalData.length > 0 && regionalData[0].nome_loja === storeId;

      // Calcula o salário total do gerente
      let totalSalary = baseSalary;

      if (targetAchieved) {
        totalSalary += additionalIfAchieve;
      }

      if (isTopStore) {
        totalSalary += bonusRegional;
      }

      return { totalSalary, storeData };
    } catch (error) {
      console.error(`Erro ao buscar receita diária: ${error.message}`);
      throw error;
    }
  }

  // Método auxiliar para verificar se a loja existe
  async checkStoreExists(storeId) {
    const query = `
      SELECT COUNT(*) as store_count
      FROM default.vw_transaction_fact_v6_all
      WHERE cod_loja = {storeId: String}
    `;

    try {
      const result = await client.query({
        query,
        query_params: { storeId },
        format: "JSONEachRow",
      });

      const data = await result.json();

      return data.length > 0 && data[0].store_count > 0;
    } catch (error) {
      console.error(`Error checking if store exists: ${error.message}`);
      throw error;
    }
  }
}

const dashboardService = new DashboardService();

module.exports = dashboardService;
