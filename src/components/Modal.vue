<template>
  <div class="z-10 fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start filter drop-shadow-lg overflow-y-scroll">
    <div class="z-20 absolute inset-0 bg-transparent" @click.self="handleAwayClick"></div>

    <div class="z-30 w-full mx-8 py-6 rounded sm:my-20">

    <slot />


    </div>
  </div>
</template>

<script>
import {onMounted, onUnmounted} from "vue";
		// <component
		// 	:is="modalComponent"
		// 	:data="props.data"
    //   :close="close"
		// 	@confirm="confirm"
		// 	@cancel="cancel"
		// />

export default {
  props: {
	  modalComponent: {},
	  data: { default: {} },
    closeOnClickAway: { default: false },
  },
  emits: ['closeModal', 'cancel', 'confirm'],

  setup(props, { emit: $emit }) {

    onMounted(() => {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keyup', handleKeyup);
    });

    onUnmounted(() => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keyup', handleKeyup);
    });

    let close = () => {
      $emit('closeModal');
    }

	const confirm = (evt) => {
		// console.log('confirm event recevied from child modal, bubbling');
		$emit('confirm', evt);
	}

	const cancel = (evt) => {
		// console.log('cancel event recevied from child modal, bubbling');
		$emit('cancel', evt);
	}

    const handleAwayClick = (evt) => {
        if (props.closeOnClickAway) {
            close();
        }
    }

    const handleKeyup = (evt) => {
      if (props.closeOnClickAway) {
        if (evt.key.toLowerCase() == 'escape') {
          close();
        }
      }
    }

    return {
      props,
      close,
      confirm,
      cancel,
      handleAwayClick
    }
  }
}
</script>
