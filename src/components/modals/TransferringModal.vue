<template>
	<div class="w-full max-w-screen-sm mx-auto bg-gray-100 rounded-2xl px-4 sm:px-8 py-4 shadow-lg drop-shadow-lg py-6">
		<h1 class="text-center text-3xl">Your Birb is Transferring</h1>

		<div class="flex justify-center my-12">
			<div class="">
				<span class="font-semibold text-xl">#{{ props.birb.token_id }}</span>
				<img :src="props.birb.image_preview_url" class="rounded-xl mx-auto">
			</div>
		</div>

		<div class="sm:text-center space-y-2">
			<p>
				<span class="sm:text-xl font-semibold">Transaction: </span>
				<a :href="`https://etherscan.io/tx/${props.txHash}`"
					class="text-blue-500 hover:text-blue-600" target="_blank">
					<span class="text-sm sm:hidden font-mono block">
						{{ `${props.txHash.substr(0, 12)}...${props.txHash.substr(-10)}` }}
					</span>
					<span class="text-sm hidden sm:inline font-mono">{{ props.txHash }}</span>
				</a>
			</p>
		</div>

		<div
			v-if="! props.receipt"
			class="my-6 text-center text-2xl font-bold">
			Awaiting Confirmation <i class="fa fa-spinner fa-spin text-lg"></i>
		</div>
		<div v-else
			class="my-6 text-center text-2xl font-bold">
			<button class="bg-green-600 text-white hover:bg-green-500 shadow hover:shadow-none py-4 text-center block w-full rounded-xl hover leading-none"
				@click="close">
				Birb Transferred
				<br>
				<span class="text-sm">Click to close</span>
			</button>
		</div>
	</div>
</template>
<script>
export default {
	props: ['birb', 'src', 'dest', 'txHash', 'receipt'],
	emits: ['send', 'close'],
	setup(props, { emit: $emit }) {
		function send() {
			$emit('send');
		}

		function close() {
			$emit('close');
		}

		return {
			props,
			send,
			close,
		}
	}
}
</script>
