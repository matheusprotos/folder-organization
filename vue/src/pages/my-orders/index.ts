import { defineComponent } from "vue";
import OrdersList from "../../components/orders-list/index.vue";
import { MyOrdersService } from "../../services/my-orders.service";
import { useOrdersStore } from "../../stores/ContextStore";

export default defineComponent({
  name: "Orders",
  label: "Orders",
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
    this.ordersStore.instance = new MyOrdersService();

    this.loadOrders();
  },
});
