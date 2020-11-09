const fetch = require("node-fetch");
const fs = require("fs");

const sleep = (milliseconds) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
const callTwitchApi = async () => {
	var myarray = [];
	for (let j = 1000; j < 2000; j++) {
		fetch(`https://api.twitch.tv/helix/games?id=${j}`, {
			headers: {
				authorization: "Bearer 7yhixk8nqnlk07gwa2j3a83h30l0m6",
				"client-id": "j3cl1pnqc3l59l8vmgaruealkvf9dw",
				accept: "application/vnd.twitchtv.v5+json",
			},
		})
			.then((resp) => {
				return resp.json();
			})
			.then((resp) => {
				myarray.push(resp.data);
					var disctstring = JSON.stringify(myarray);
					fs.writeFile("games.json", disctstring, function (err, result) {});
			})
			.catch((err) => {
				console.log(err);
			});
		await sleep(100);
	}
	console.log(myarray.length);
};
callTwitchApi();
