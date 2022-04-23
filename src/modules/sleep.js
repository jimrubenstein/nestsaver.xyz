export default async function sleep(secs) {
	return new Promise((resolv, reject) => {
		setTimeout(resolv, secs * 1000);
	});
}