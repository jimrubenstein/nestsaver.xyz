<template>
	<nav-bar class="sticky" />
	<div class="py-16" :key="`birb-${state.birb_id}`">
		<div v-if="state.loading"
			class="text-center">
			<div class="relative">
				<p class="text-8xl">🦉</p>
				<div class="absolute -top-16 left-full bg-white px-6 py-2 rounded-xl">
					<p>Loading Birb {{ $route.params.id }}</p>
					<p class="absolute -left-2 top-full border border-black" style="border-width: 0 0 20px 50px; border-color: transparent white;"></p>
					<p class="absolute -left-2 top-full border border-black" style="border-width: 0 0 20px 20px; border-color: transparent #F9FAFB;"></p>
				</div>
			</div>
        </div>
		<div v-else-if="state.birb">
			<div class="max-w-screen-md mx-auto">
				<h1 class="text-3xl font-bold">#{{ state.birb.id }}</h1>
				<div class="flex justify-between">
					<div class="w-1/2">
						<img :src="state.birb.imgUrl" class="rounded-lg" />
					</div>
					<div class="w-1/2 grid grid-cols-2 grid-rows-4">
						<div class="text-center">
							<p class="text-2xl font-extralight">
								<span>
									{{ `${state.birb.currentOwner.substr(0, 6).toUpperCase().replace('X', 'x')}...${state.birb.currentOwner.substr(-4)}` }}
								</span>
							</p>

							<p class="text-sm text-slate-500 uppercase">Current Owner</p>
						</div>

						<div class="text-center">
							<p class="text-2xl font-extralight">
								<span v-if="state.birb.nestStatus.nested">
									Nested
								</span>
								<span v-else>
									Unnested
								</span>
							</p>

							<p class="text-sm text-slate-500 uppercase">Nesting Status</p>
						</div>

						<div class="text-center">
							<p class="text-2xl font-extralight">
								<span v-if="state.birb.nestStatus.total">
									{{ Math.round( state.birb.nestStatus.total / 86400 ) }} day{{ Math.round( state.birb.nestStatus.total / 86400 ) != 1? 's' : '' }}
								</span>
								<span v-else>
									None
								</span>
							</p>

							<p class="text-sm text-slate-500 uppercase">Total Time Nested</p>
						</div>

						<div class="text-center">
							<p class="text-2xl font-extralight">
								<span v-if="state.birb.nestStatus.current">
									{{ Math.round( state.birb.nestStatus.current / 86400 ) }} day{{ Math.round( state.birb.nestStatus.current / 86400 ) != 1? 's' : '' }}
								</span>
								<span v-else>
									None
								</span>
							</p>

							<p class="text-sm text-slate-500 uppercase">Current Time Nested</p>
						</div>


					</div>
				</div>
			</div>


		</div>
	</div>
</template>
<script>
import { computed, onMounted, onUnmounted, reactive, watch } from '@vue/runtime-core'

import { useRoute, useRouter } from 'vue-router';

import web3 from '~web3/dist/web3.min.js';
import BirbABI from '../../modules/BirbABI.json';
import Birb from '../../modules/Birb.js';
import sleep from '../../modules/sleep.js';

const BIRB_ADDRESS = '0x23581767a106ae21c074b2276d25e5c3e136a68b';

const ethProvider = 'https://icy-proud-shadow.quiknode.pro/f51f81464aa62d65cc9454a06bc9b54d0092a5c6/';

export default {
	setup(props) {
		const state = reactive({
			birb_id: null,
			loading: false,
			birb: null,
		});

		const router = useRouter();
		const route = useRoute();
		let blockchain;
		// let contract;

		onMounted(async() => {
			state.birb_id = route.params.id;
			// window.addEventListener('popstate', handlePopstate);
			// window.addEventListener('pushstate', handlePopstate);
			blockchain = new web3(ethProvider);
			// contract = new blockchain.eth.Contract(BirbABI, BIRB_ADDRESS);

			await loadBirb(state.birb_id);
		});

		watch(() => route.params.id, (id) => {
			state.birb_id = id;
			loadBirb(state.birb_id);
		});

		onUnmounted(() => {
			// window.removeEventListener('popstate', handlePopstate);
			// window.removeEventListener('pushstate', handlePopstate);
		});

		function handlePopstate(evt) {
			state.birb_id = route.params.id;
			loadBirb(state.birb_id);
		}

		async function loadBirb(birbID) {
			state.loading = true;
			const sleepTimer = sleep(1);
			const birb = new Birb(blockchain);
			await birb.load(state.birb_id);
			sleepTimer.then(() => {
				state.loading = false;
				state.birb = birb;
			});

			return state.birb;
		}

		return {
			props,
			state,
		}
	}
}
</script>
