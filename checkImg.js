import * as fs from 'fs';
import Rembrandt from 'rembrandt';
var imgArray = [];
const testFolder = './images/';
const json = fs.readFileSync("test.json");
const gamesString = JSON.parse(json);
gamesString.forEach((function(file, idx, array) {
    console.log(file);
    const rembrandt = new Rembrandt({
        // `imageA` and `imageB` can be either Strings (file path on node.js,
        // public url on Browsers) or Buffers
        imageA: fs.readFileSync('checkImg.png'),
        imageB: fs.readFileSync(`images/${file["box_art_url"]}`),
        
        // Needs to be one of Rembrandt.THRESHOLD_PERCENT or Rembrandt.THRESHOLD_PIXELS
        thresholdType: Rembrandt.THRESHOLD_PERCENT,
        
        // The maximum threshold (0...1 for THRESHOLD_PERCENT, pixel count for THRESHOLD_PIXELS
        maxThreshold: 0.01,
        
        // Maximum color delta (0...1):
        maxDelta: 0.02,
        
        // Maximum surrounding pixel offset
        maxOffset: 0,
        
        renderComposition: true, // Should Rembrandt render a composition image?
        compositionMaskColor: Rembrandt.Color.RED // Color of unmatched pixels
    })

    // Run the comparison
    rembrandt.compare()
    .then(function (result) {
        if(result.passed == false){
            console.log("false");
            imgArray.push(file);
        }
        if(idx === array.length -1){
            let stringArray = JSON.stringify(imgArray);
            fs.writeFileSync('bait.json', stringArray);
        }
    })
    .catch((e) => {
        console.error(e)
    })
  }));