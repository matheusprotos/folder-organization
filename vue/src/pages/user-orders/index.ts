import { defineComponent } from "vue";
import OrdersList from "../../components/orders-list/index.vue";
import { UserOrdersService } from "../../services/user-orders.service";
import { useOrdersStore } from "../../stores/ContextStore";

export default defineComponent({
  name: "UserOrders",
  label: "UserOrders",
  components: {
    OrdersList,
  },
  data() {
    return {
      ordersStore: useOrdersStore(),
      orders: [] as any[],
    };
  },
  methods: {
    loadOrders() {
      this.orders = this.ordersStore.getOrders();
    },
  },
  created() {
    this.ordersStore.instance = new UserOrdersService();

    this.loadOrders();
  },
});
