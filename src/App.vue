<style scoped>
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 50px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #58557A;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
<template>
  <main class="w-screen h-screen flex flex-col justify-center items-center bg-gray-50">
    <div v-if=" ! state.web3detected">
      <div class="text-center">
        <p><i class="fa fa-circle-exclamation fa-10x text-red-500"></i></p>
        <p class="text-center text-4xl my-8">
          No wallet detected.
        </p>
      </div>
    </div>
    <div v-else-if=" ! state.connected">
      <button
        class="bg-slate-600 text-gray-50 py-4 px-8 text-center text-2xl rounded-xl shadow-xl drop-shadow-lg
        hover:bg-slate-500 hover:shadow-md hover:drop-shadow-md hover:text-white"
        @click="connectWallet"
      >
        Connect your wallet
      </button>
    </div>
    <div v-else-if="state.loadingBirbs">
      <div class="text-center">
        <div class="relative">
          <p class="text-8xl">🦉</p>
          <div class="absolute -top-16 left-full bg-white px-6 py-2 rounded-xl">
            <p>hoot! hoot!</p>
            <p class="absolute -left-2 top-full border border-black" style="border-width: 0 0 20px 50px; border-color: transparent white;"></p>
            <p class="absolute -left-2 top-full border border-black" style="border-width: 0 0 20px 20px; border-color: transparent #F9FAFB;"></p>
          </div>
        </div>
      </div>
      <div class="text-lg">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
      <p class="text-[#58557A]">loading birbs</p>
    </div>
    <div v-else-if="state.noBirbs">
      <div class="text-center">
        <div class="relative">
          <p class="text-8xl">🦉</p>
          <div class="absolute -top-16 left-full bg-white px-6 py-2 rounded-xl">
            <p>No Birbs?!</p>
            <p class="absolute -left-2 top-full border border-black" style="border-width: 0 0 20px 50px; border-color: transparent white;"></p>
            <p class="absolute -left-2 top-full border border-black" style="border-width: 0 0 20px 20px; border-color: transparent #F9FAFB;"></p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-center text-slate-600">
        <h1 class="text-4xl font-semibold drop-shadow-lg">Transfer Your Birbs</h1>
        <h2 class="text-xl my-2 font-light drop-shadow">without leaving the nest</h2>
      </div>
      <div class="flex justify-between sm:px-2 items-end mt-12">
        <p class="text-3xl font-semibold text-slate-700">#{{ currentBirb.token_id }}</p>
        <p v-if="state.birbs.length > 1">
          <button class="bg-slate-300 px-4 py-2 rounded-xl font-semibold hover:bg-slate-300 shadow hover:shadow-none text-slate-600 hover:text-slate-800"
            @click="state.chooseBirb = true"
          >Choose Birb
          </button>
        </p>
      </div>
      <div class="sm:flex items-start mt-2 space-y-4 sm:space-y-0 sm:space-x-8 sm:bg-gray-200 sm:p-12 rounded-3xl sm:shadow-xl">
        <div>
          <img :src="currentBirb.image_preview_url"
            class="rounded-3xl w-full shadow">
        </div>
        <div class="space-y-2 w-full text-slate-700">
          <p>
            <span class="font-light text-xl">Current Wallet:</span>
            <br>
            <span class="sm:hidden font-mono">{{ `${currentBirb.owner.address.substr(0, 12)}...${currentBirb.owner.address.substr(-12)}` }}</span>
            <span class="hidden sm:block font-mono">{{ currentBirb.owner.address }}</span>
          </p>
          <p>
            <span class="font-light text-xl">Destination Wallet:</span>
            <br>
            <input
              type="text"
              class="w-full mt-1 rounded-xl text-2xl font-mono text-slate-600 placeholder-slate-400 sm:placeholder-slate-300 px-2 py-2 shadow"
              placeholder="0x..."
              maxlength="42"
              @focus="e => e.target.select()"
              @keyup="checkEns"
              autofocus
              v-model="state.dest">

              <p
                class="text-right font-mono font-sm text-gray-500 leading-loose">
                <span v-if="state.destWallet">{{ `${destWallet.substr(0, 12)}...${destWallet.substr(-12)}` }}</span>
                <span v-else>&nbsp;</span>
              </p>
          </p>
          <p>
            <button
              class="
              block w-full text-2xl bg-green-600 rounded-2xl py-4 px-6 hover:bg-green-500 shadow hover:shadow-none text-white
              disabled:bg-gray-300 disabled:text-gray-400
              "
              :disabled="! xferAddressValid"
              @click="confirmXfer"
            >
              Transfer Birb
            </button>
          </p>
        </div>
      </div>
    </div>
    <div class="mt-24 text-slate-500 text-center">
      <p>
        made by
        <a href="https://twitter.com/entropy"
          class="hover:text-slate-800 hover:underline">
          <i class="fab fa-twitter"></i> entropy
        </a>
      </p>
      <p>
        view the source on
        <a href="https://github.com/jimrubenstein/nestsaver.xyz">
          <i class="fab fa-github"></i>
          github
        </a>
      </p>
    </div>
  </main>
  <modal
    v-if="state.chooseBirb"
    :closeOnClickAway="true"
    @closeModal="() => state.chooseBirb = false">
    <birb-modal
      :data="{ birbs: state.birbs }"
      @selectBirb="selectBirb"
    />
  </modal>

  <modal
    v-if="state.confirmXfer"
    :closeOnClickAway="true"
    @closeModal="cancelTransfer">
    <transfer-modal
      :birb="currentBirb"
      :src="state.wallet"
      :dest="destWallet"
      :awaiting-signature="state.awaitingSignature"
      @send="executeTransfer"
      @close="cancelTransfer"
    />
  </modal>

  <modal
    v-if="state.birbs.length > 0 && currentBirb && state.xferring">
    <transferring-modal
      :birb="currentBirb"
      :src="state.wallet"
      :dest="state.dest"
      :txHash="state.txHash"
      :receipt="state.receipt"

      @close="done"
    />
  </modal>

  <modal
    v-if="state.err"
    :closeOnClickAway="true"
    @closeModal="closeError">
    <error-modal
      :err="state.err"
      @close="closeError"
    />
  </modal>
</template>
<script>
import { computed, onMounted, reactive, ref } from '@vue/runtime-core';
import web3 from '~web3/dist/web3.min.js';
import axios from 'axios';
import BirbABI from './modules/BirbABI.json';
import sleep from './modules/sleep.js';

import Modal from './components/Modal.vue';
import BirbModal from './components/modals/BirbModal.vue';
import TransferModal from './components/modals/TransferModal.vue';
import TransferringModal from './components/modals/TransferringModal.vue';
import ErrorModal from './components/modals/ErrorModal.vue';

const BIRB_ADDRESS = '0x23581767a106ae21c074b2276d25e5c3e136a68b';
const OS_API = '';
const imgRoot = 'https://live---metadata-5covpqijaa-uc.a.run.app/images/';

export default {
  components: { Modal, BirbModal, TransferModal, TransferringModal, ErrorModal },
  setup() {
    let blockchain;
    let contract;
    let dest = ref(null);
    let connectDelay;

    const state = reactive({
      web3detected: window.ethereum !== undefined,
      connected: false,
      accounts: [],
      wallet: null,
      chainID: null,

      /* modals */
      chooseBirb: false,
      confirmXfer: false,
      xferring: false,
      /* end modals */

      /* transaction */
      awaitingSignature: false,
      txHash: null,
      receipt: null,
      err: false,
      /* end tx info */

      loadingBirbs: false,
      birbCount: 0,
      birbs: [],
      birbIdx: 0,
      dest: null,
      destWallet: null, // used for storing destination wallet address for ens domain
    });

    onMounted(async() => {
      connectDelay = sleep(.5);
      if (window.ethereum) {
        attachEventListeners(window.ethereum);
        blockchain = new web3(window.ethereum);
        contract = new blockchain.eth.Contract(BirbABI, BIRB_ADDRESS);
        const accounts = await loadAccounts();

        if (accounts.length > 0) {
          connected();
        }

        if (dest.value) {
          dest.value.focus();
        }
      }
    });

    function attachEventListeners(eth) {
      eth.on('chainChanged', chainChanged);
      eth.on('accountsChanged', accountsChanged);
      eth.on('disconnect', disconnected);
      eth.on('connect', connected);
    }

    async function connectWallet() {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      }).then(connected);
    }

    async function loadAccounts() {
      const accounts = await blockchain.eth.getAccounts();
      if (accounts.length > 0) {
        state.accounts = accounts;
        state.wallet = accounts[0];

        return accounts;
      }

      return [];
    }

    async function connected() {
      await loadAccounts();

      connectDelay.then(() => {
        state.connected = true;
      });

      state.chainID = await window.ethereum.request({
        method: 'eth_chainId'
      }).then(
        hex => web3.utils.hexToNumber(hex)
      );

      loadBirbs();
    }

    function chainChanged() {

    }

    async function accountsChanged() {
      await loadAccounts().then(loadBirbs);
    }

    function disconnected() {

    }

    async function loadBirbs() {
      const minTimeout = sleep(2);
      state.loadingBirbs = true;
      state.noBirbs = false;
      state.birbCount = await contract.methods.balanceOf(state.wallet).call();
      state.birbs = [];

      if (state.birbCount == 0) {
        console.error("You don't hold any birbs");
        state.loadingBirbs = false;
        state.noBirbs = true;
        return;
      }

      let result = await axios.get('https://api.opensea.io/api/v1/assets', {
        headers: { 'X-API-KEY': OS_API },
        params: {
          owner: state.wallet,
          asset_contract_address: BIRB_ADDRESS,
          limit: 100,
        },
      });

      if (result.status == 200) {
        state.birbs = [ ...result.data.assets ];
        if (dest.value) {
          dest.value.focus();
        }
      }

      let prevResult = result;
      while (result.next != null) {
        result = await axios.get(result.next, {
          headers: { 'X-API-KEY': OS_API },
        });

        if (result.status == 200) {
          state.birbs = [ ...state.birbs, ...result.data.assets ];
          prevResult = result;
        } else {
          result = prevResult;
        }
      }

      minTimeout.then(() => {
        state.loadingBirbs = false;
      })
    }

    const currentBirb = computed(() => {
      return state.birbs[ state.birbIdx ];
    });

    function selectBirb(tokenID) {
      for (const idx in state.birbs) {
        const birb = state.birbs[ idx ];

        if (birb.token_id == tokenID) {
          state.birbIdx = idx;
          state.chooseBirb = false;
          break;
        }
      }

      if (dest.value) {
        dest.value.focus();
      }
    }

    const xferAddressValid = computed(() => {
      if (destWallet.value == null) return false;
      if (destWallet.value.length != 42) return false;
      if (state.wallet.toLowerCase() == destWallet.value.toLowerCase()) return false;
      if (! destWallet.value.match(/^0x[a-f0-9]{40}$/i)) return false;
      if (state.awaitingSignature) return false;

      return true;
    });

    function confirmXfer() {
      state.confirmXfer = true;
    }

    async function executeTransfer() {
      state.err = null;
      const tx = contract.methods.safeTransferWhileNesting(
        state.wallet,
        destWallet.value,
        currentBirb.value.token_id
      );

      let gasEstimate = await tx.estimateGas({
        gas: 100_000,
        from: state.wallet,
      });

      state.awaitingSignature = true;
      await tx.send({
        from: state.wallet,
        gas: Math.round(gasEstimate * 1.25),
      }).on('transactionHash', hash => {
        state.txHash = hash;

        state.confirmXfer = false;
        state.xferring = true;
      }).on('receipt', receipt => {
        state.receipt = receipt;
        state.awaitingSignature = false;
      }).catch( err => {
        state.awaitingSignature = false;

        if (err.code != 4001) {
          state.err = err;
        }

        state.confirmXfer = false;
        state.xferring = false;
      });
    }

    function cancelTransfer() {
      state.confirmXfer = false;
    }

    function done() {
      state.xferring = false;
      loadBirbs();
    }

    function closeError() {
      state.err = null;
    }

    async function checkEns(e) {
      if (e.key.toLowerCase() == 'enter' && xferAddressValid.value) {
        confirmXfer();
        return;
      }

      const val = e.target.value;

      if (val.match(/^\S+\.eth$/i)) {
        let wallet = await blockchain.eth.ens.getAddress(val);
        state.destWallet = wallet;
        return;
      }

      else state.destWallet = null;
    }

    const destWallet = computed(() => {
      if (state.destWallet) {
        return state.destWallet;
      }

      return state.dest;
    });

    return {
      state,
      connectWallet,
      dest,
      destWallet,
      checkEns,
      currentBirb,
      selectBirb,
      xferAddressValid,
      confirmXfer,
      executeTransfer,
      cancelTransfer,
      done,
      closeError,
    }
  }
}
</script>
