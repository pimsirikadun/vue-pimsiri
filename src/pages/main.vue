<template>
  <div class="container">
    <Manufacturer v-slot="data">
      <Devices :manufacturerId="data.factId" />
    </Manufacturer>
  </div>
</template>

<script>
import Manufacturer from '../components/Manufacturer.vue';
import Devices from '../components/Devices.vue';
export default {
  components: {
    Manufacturer,
    Devices,
  },
};
</script>
