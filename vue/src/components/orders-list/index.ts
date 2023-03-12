import { defineComponent } from "vue";

export default defineComponent({
  name: "OrdersList",
  label: "OrdersList",
  props: {
    orders: {
      type: Array<any>,
      default: () => [],
    },
  },
});
