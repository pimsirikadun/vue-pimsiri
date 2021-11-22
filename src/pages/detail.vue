<template>
  <div class="container text-center">
    <h1>Device ID : {{ id }}</h1>
    <p>----------------------</p>
    <p>{{ device.Title }}</p>
    <p>{{ device.Processor }}</p>
    <p>Price : ${{ device.Price }}</p>
    <img class="block mx-auto" :src="device.Photo" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router/dist/vue-router.esm-bundler';
import axios from 'axios';
export default {
  name: 'Detail',
  setup() {
    const route = useRoute();
    const id = computed(() => route.params.id);
    return {
      id,
    };
  },
  data: () => ({
    device: [
      {
        Title: '',
        Processor: '',
        Photo: '',
        Price: '',
      },
    ],
  }),
  created() {
    axios
      .get(`https://service2.ahead-coop.work/devices?id=${this.id}`)
      .then((res) => {
        [this.device] = res.data;
        console.log(this.device);
      });
  },
};
</script>
Workshop 10 - Devices.vue
<template>
  <h1 class="font-black mb-3">Devices</h1>
  <div class="grid grid-cols-3 gap-4 border border-black ml-0 mr-5 p-3">
    <ul v-for="device in devices" :key="device.id">
      <li>
        <router-link
          :to="{
            name: 'device',
            params: { id: device.id },
          }"
        >
          <img :src="device.Photo" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    manufacturerId: Number,
  },
  data: () => ({
    devices: [
      { id: 1, DeviceName: 'Asus ROG' },
      { id: 2, DeviceName: 'Dell XP13' },
    ],
  }),
  created() {
    console.log('factId:', this.manufacturerId);
    if (this.manufacturerId !== 0) {
      axios
        .get(
          `https://service2.ahead-coop.work/devices?ManufacturerID=${this.manufacturerId}`
        )
        .then((res) => {
          this.devices = res.data;
        });
    } else {
      axios.get(`https://service2.ahead-coop.work/devices`).then((res) => {
        this.devices = res.data;
      });
    }
  },
  watch: {
    manufacturerId: function (newId, oldId) {
      // watch it
      console.log('Prop changed: ', newId, ' | was: ', oldId);
      this.getDeviceByManufacturer(newId);
    },
  },
  methods: {
    getDeviceByManufacturer(id) {
      axios
        .get(
          `https://service2.ahead-coop.work/devices?ManufacturerID=${this.manufacturerId}`
        )
        .then((res) => {
          this.devices = res.data;
        });
    },
  },
};
</script>
