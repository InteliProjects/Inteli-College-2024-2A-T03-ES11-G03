const dashboardServiceTest = require('../services/dashboard.service');
const client = require("../config/db");

jest.mock("../config/db");

describe('DashboardService', () => {
  let dashboardService;

  beforeEach(() => {
    jest.clearAllMocks();
    dashboardService = dashboardServiceTest;
  });

  describe('getTopSellersByStore', () => {
    it('deve lançar um erro quando a loja não existe', async () => {
      client.query.mockResolvedValueOnce({ json: async () => [] });
      await expect(dashboardService.getTopSellersByStore(999))
        .rejects.toThrow('Loja com ID 999 não encontrada.');
    });

    it('deve retornar os vendedores top quando a loja existe', async () => {
      client.query.mockResolvedValueOnce({ json: async () => [{ store_count: 1 }] });
      const mockData = [{ cod_loja: 1, cod_vendedor: '001', nome: 'João', meta_vendedor: 1000, total_revenue: 5000 }];
      client.query.mockResolvedValueOnce({ json: async () => mockData });

      const results = await dashboardService.getTopSellersByStore(1);
      expect(results).toEqual(mockData);
      expect(client.query).toHaveBeenCalledTimes(2);
    });
  });

  describe('getTotalTransactionsByStore', () => {
    it('deve lançar um erro quando a loja não existe', async () => {
      client.query.mockResolvedValueOnce({ json: async () => [] });
      await expect(dashboardService.getTotalTransactionsByStore(123))
        .rejects.toThrow('Loja com ID 123 não encontrada.');
    });

    it('deve retornar o total de transações quando a loja existe', async () => {
      client.query.mockResolvedValueOnce({ json: async () => [{ store_count: 1 }] });
      const mockData = [{ total_transacoes: 200 }];
      client.query.mockResolvedValueOnce({ json: async () => mockData });

      const results = await dashboardService.getTotalTransactionsByStore(1);
      expect(results).toEqual(mockData);
      expect(client.query).toHaveBeenCalledTimes(2);
    });
  });

});

