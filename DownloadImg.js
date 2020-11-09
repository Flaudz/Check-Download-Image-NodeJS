import * as fs from 'fs';
import request from 'request';
var imgArray = [];
async function download(url, dest) {

    /* Create an empty file where we can save data */
    const file = fs.createWriteStream(dest);

    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    await new Promise((resolve, reject) => {
      request({
        /* Here you should specify the exact link to the file you are trying to download */
        uri: url,
        gzip: true,
      })
          .pipe(file)
          .on('finish', async () => {
            console.log(`The file is finished downloading.`);
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
    })
        .catch((error) => {
          console.log(`Something happened: ${error}`);
        });
}

let rawdata = fs.readFileSync("games.json");
let gamesJson = JSON.parse(rawdata);

gamesJson.forEach(element => {
    element.forEach((function(game, idx, array){
        let img = game["box_art_url"];
        img = img.replace("{width}", "52");
        img = img.replace("{height}", "72");
        (async () => {
            const data = await download(img, `images/${game["id"]}.png`);
            var test = {
                name: `${game["name"]}`,
                box_art_url: `${game["id"]}.png`
            }
            imgArray.push(test);
            if(idx === array.length -1){
                const JsonString = JSON.stringify(imgArray);
                fs.writeFileSync('test.json', JsonString);
            }
        })();
    }));
});


