const express = require("express");
const dashboardService = require("../services/dashboard.service");


class DashboardController {
  async getTopSellersByStore(req, res) {
    try {
      const storeId = req.user.store_id
      const { month } = req.body;
      const data = await dashboardService.getTopSellersByStore(storeId, month);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTotalTransactionsByStore(req, res) {
    try {
      const storeId = req.user.store_id
      console.log(storeId)
      const data = await dashboardService.getTotalTransactionsByStore(storeId);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getSalesTargetByStore(req, res) {
    try {
      const storeId = req.user.store_id
      const data = await dashboardService.getSalesTargetByStore(storeId);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getRevenueToDateByStore(req, res) {
    try {
      const storeId = req.user.store_id
      const { month } = req.body;
      const data = await dashboardService.getRevenueToDateByStore(storeId, month);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getRevenueByStore(req, res) {
    try {
      const storeId = req.user.store_id
      const { month } = req.body;
      const data = await dashboardService.getRevenueByStore(storeId, month);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTopProducts(req, res) {
    try {
      const storeId = req.user.store_id
      const { month } = req.body;
      const data = await dashboardService.getTopProducts(storeId, month)
      res.status(200).json(data)
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getStorePerformance(req, res) {
    try {
      const { month } = req.body;

      if (!month) {
        return res.status(400).json({ message: 'month is required. (YYYY-MM)' });
      }

      const performanceData = await dashboardService.getRankedStorePerformance(month);

      res.status(200).json(performanceData);
    } catch (error) {
      console.error(`Error fetching store performance: ${error.message}`);
      res.status(500).json({ message: `Error fetching store performance: ${error.message}` });
    }
  }
  
  async getManagerBonus(req, res) {
    try{
      const storeId = req.user.store_id
      const { month, regiao } = req.body

      if (!month) return res.status(400).json({ message: 'month is required. (YYYY-MM)' });

      const salary = await dashboardService.getManagerBonus(storeId, month, regiao)

      res.status(200).json(salary);
    } catch (error) {
      console.error(`Error fetching manager salary: ${error.message}`);
      res.status(500).json({ message: `Error fetching manager salary: ${error.message}` });      
    }
  }
}

module.exports = new DashboardController();
