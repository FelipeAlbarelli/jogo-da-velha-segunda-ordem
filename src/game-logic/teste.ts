import { getBoardProjections, type Board } from "./game";
import { emptyMegaBoard } from "./matrix-helpers";
import { getRandom12UniqNumber, randIntOnInterval } from "./zodiac-heavenly-aritmetic";


for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        const x = randIntOnInterval({min: i , max : i + j , type: 'int'});
        if (x < i || x > (i + j)) {
            console.log(`${i} ${i + j} : ${x}`)
        }
    }
}
    
