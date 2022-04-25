import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';

import './index.css';

/** pages */
import transfer from './components/pages/Transfer.vue';
import leaderboard from './components/pages/Leaderboard.vue';
import birb from "./components/pages/Birb.vue";

/** global components */
import NavComponent from './components/Nav.vue';

const routes = [
	{ path: '/', component: transfer },
	{ path: '/birb/:id', component: birb, name: 'birb-lookup', },
	{ path: '/leaderboard', component: leaderboard }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

const app = createApp(App)
	.use(router);

app.component('NavBar', NavComponent);

app.directive('focus', {
	mounted(el) {
		el.focus();
	}
});

app.mount('#app')
