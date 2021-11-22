import {
  createRouter,
  createWebHistory,
} from 'vue-router/dist/vue-router.esm-bundler';
import main from './pages/main.vue';
import detail from './pages/detail.vue';

const routes = [
  { path: '/', name: 'home', component: main },
  { path: '/detail/:id', name: 'device', component: detail },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
