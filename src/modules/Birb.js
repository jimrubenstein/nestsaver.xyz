import web3 from '~web3/dist/web3.min.js';
import axios from 'axios';
import BirbABI from './BirbABI.json';
const BIRB_ADDRESS = '0x23581767a106ae21c074b2276d25e5c3e136a68b';

const genesisBlock = 14591056;
const metadataUrl = 'https://live---metadata-5covpqijaa-uc.a.run.app/metadata/';

export default class Birb {
	constructor(provider) {
		this.provider = provider;
		this.contract = new this.provider.eth.Contract(BirbABI, BIRB_ADDRESS);
		this.events = [];
		this.nestStatus = null;
		this.currentOwner = null;
		this.transfers = [];
		this.nestEvents = [];
		this.metadata = {};
		this.imgUrl;
	}

	async load(id) {
		this.id = id;
		this.imgUrl = `https://live---metadata-5covpqijaa-uc.a.run.app/images/${this.id}`;

		await this.loadOwner(this.id);
		await this.loadNestingStatus(this.id);
		this.loadPreviousEvents(this.id);
	}

	async loadNestingStatus(id) {
		this.nestStatus = await this.contract.methods.nestingPeriod( id ).call({
			gas: 100_000,
		});
	}

	async loadOwner(id) {
		this.currentOwner = await this.contract.methods.ownerOf( id ).call({
			gas: 100_000,
		});
	}

	async loadPreviousEvents(id) {
		const latestBlock = await this.provider.eth.getBlockNumber();
		const start = genesisBlock;
		let current = start;
		let end = Math.min(latestBlock, current + 5000);
		do {
			// console.log('polling', current, end);
			const events = Object.values(await this.contract.getPastEvents('allEvents', {
				filter: {
					"tokenId": [ id ],
				},
				fromBlock: current,
				toBlock: end,
			})).filter(evt => evt.returnValues.tokenId == id);

			this.events = [
				...this.events,
				...events,
			];

			current = end + 1;
			end = Math.min( current + 10_000, latestBlock );
		} while ( current <= latestBlock);

		this.parseEvents(this.events);
	}

	parseEvents(events) {
		for (const evt of events) {
			if (evt.event == 'Transfer') {
				this.transfers.push( evt );
			} else if (evt.event.match(/nest/i)) {
				this.nestEvents.push( evt );
			}
		}
	}
}
