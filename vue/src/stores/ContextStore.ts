import { defineStore } from "pinia";
import type OrdersService from "../services/orders.service";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    instance: undefined as OrdersService | undefined,
  }),
  actions: {
    getOrders() {
      if (this.instance) {
        return this.instance.listar();
      }

      return [];
    },
  },
});
