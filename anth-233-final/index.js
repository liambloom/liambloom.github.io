
noise.seed(Math.random());

import opentype from "./node_modules/opentype.js/dist/opentype.module.js";

const main = document.getElementById("main");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let canvasWidth = 500;
let canvasHeight = 400;

// Sets canvas size to canvasWidth x canvasHeight with correct scaling
let removeResizeListener;
function updateCanvasSize() {
    if (removeResizeListener !== undefined) {
        removeResizeListener();
    }
    canvas.width = canvasWidth * devicePixelRatio;
    canvas.height = canvasHeight * devicePixelRatio;
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const media = matchMedia(`(resolution: ${devicePixelRatio}dppx)`);
    media.addEventListener("change", updateCanvasSize);
    removeResizeListener = () => media.removeEventListener("change", this.setCanvasSize);
}
updateCanvasSize();

class QBezierCalculator {
    /*
        For curve (50, 150, 150, 50, 250, 150)
        190 points gives 3 decimal places of precision
        460 points gives 4 decimal places of precision
    */
    static ARCLENGTH_BINARY_SEARCH_ITERS = 9;
    static ARCLENGTH_POINTS = (2 ** QBezierCalculator.ARCLENGTH_BINARY_SEARCH_ITERS) - 1; // 511

    constructor(x0, y0, x1, y1, x2, y2) {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        
        // https://gamedev.stackexchange.com/a/5427
        let arcLengths = this.arcLengths = new Array(QBezierCalculator.ARCLENGTH_POINTS);

        let prevX = this.x0;
        let prevY = this.y0; 
        let cumLen = arcLengths[0] = 0;
        for(var i = 1; i < QBezierCalculator.ARCLENGTH_POINTS; i += 1) {
            const [x, y] = this.pointAt(i / (QBezierCalculator.ARCLENGTH_POINTS - 1));
            const dx = prevX - x;
            const dy = prevY - y;        
            cumLen += Math.sqrt(dx ** 2 + dy ** 2);
            this.arcLengths[i] = cumLen;
            prevX = x;
            prevY = y;
        }
        
        this.arcLength = cumLen;
    }

    static fromPath(path, i) {
        let {x: x0, y: y0} = path.commands[i - 1];
        let {x1, y1, x: x2, y: y2} = path.commands[i]
        return new QBezierCalculator(x0, y0, x1, y1, x2, y2);
    }

    static axisPointAt(t, p0, p1, p2) {
        return (1 - t) ** 2 * p0 + 2 * (1 - t) * t * p1 + t ** 2 * p2;
    }

    pointAt(t) {
        return [
            QBezierCalculator.axisPointAt(t, this.x0, this.x1, this.x2),
            QBezierCalculator.axisPointAt(t, this.y0, this.y1, this.y2)
        ]
    }

    static axisDerivativeAt(t, p0, p1, p2) {
        return -2 * (1 - t) * p0 + 2 * (1 - 2 * t) * p1 + 2 * t * p2;
    }

    tangentVectorAt(t) {
        return [
            QBezierCalculator.axisDerivativeAt(t, this.x0, this.x1, this.x2),
            QBezierCalculator.axisDerivativeAt(t, this.y0, this.y1, this.y2)
        ]
    }

    static vectorMagnitude(x, y) {
        return Math.sqrt(x ** 2 + y ** 2);
    }

    static normalizeVector([x, y]) {
        let magnitude = QBezierCalculator.vectorMagnitude(x, y);
        return [x / magnitude, y / magnitude];
    }

    unitTangentVectorAt(t) {
        return QBezierCalculator.normalizeVector(this.tangentVectorAt(t));
    }

    unitNormalVectorAt(t) {
        let [dx, dy] = this.tangentVectorAt(t);
        return QBezierCalculator.normalizeVector([-dy, dx]);
    }

    // This is a binary search that returns the 
    inverseArcLength(len) {
        let currentEl = (2 ** (QBezierCalculator.ARCLENGTH_BINARY_SEARCH_ITERS - 1)) - 1
        for (let i = 2; i <= QBezierCalculator.ARCLENGTH_BINARY_SEARCH_ITERS; i++) {
            if (this.arcLengths[currentEl] === len) {
                return currentEl / (QBezierCalculator.ARCLENGTH_POINTS - 1)
            }
            const modifier = (2 ** (QBezierCalculator.ARCLENGTH_BINARY_SEARCH_ITERS - i))
            if (len < this.arcLengths[currentEl]) {
                currentEl -= modifier;
            }
            else {
                currentEl += modifier;
            }
        }
        let lowerIndex, upperIndex;
        if (currentEl % 4 === 0) {
            lowerIndex = currentEl;
            upperIndex = currentEl + 1;
        }
        else {
            lowerIndex = currentEl - 1;
            upperIndex = currentEl;
        }

        const lower = this.arcLengths[lowerIndex];
        const upper = this.arcLengths[upperIndex];

        return (lowerIndex + (len - lower) / (upper - lower)) / (QBezierCalculator.ARCLENGTH_POINTS - 1);
    }

    adjustPoint(s, h) {
        const t = this.inverseArcLength(s);
        const [px, py] = this.pointAt(t);
        const [nx, ny] = this.unitNormalVectorAt(t);
        return [px + h * nx, py + h * ny];
    }
}

const [font, words] = await Promise.all([
    opentype.load("fonts/Modak.ttf"), 
    fetch("words.json").then(r => r.json())
]);

// https://stackoverflow.com/a/12646864
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

for (let word of words) {
    shuffleArray(word.definitions);
}

class WordMover {
    static MIN_CORNER_DIST = 20;
    static PROB_H = (canvasWidth - 2 * WordMover.MIN_CORNER_DIST) / (canvasWidth + canvasHeight - 4 * WordMover.MIN_CORNER_DIST);

    wordSeed = Math.random();
    frameCounter = 0;

    constructor({ word, defWord = word, script, definitions, color = `hsl(${Math.floor(Math.random() * 271)}, 100%, 50%)` }) { // random color from red (h=0) to violet (h=270) (no pinks)
        this.word = word;
        this.defWord = defWord;
        this.wordPath = (script === "han" ? hanFont : font).getPath(word.toUpperCase(), 0, 0, 110);
        this.definitions = definitions;
        if (Array.isArray(color)) {
            this.color = color[Math.floor(Math.random() * color.length)];
        }
        else {
            this.color = color;
        }

        const movePath = this.movePath = new opentype.Path();
        let pathSegments = this.pathSegments = [];

        let initialTheta, initialX0, initialY0;

        // create offscreen first path segment
        {
            const isH = Math.random() < WordMover.PROB_H;
            this.wallIsLT = Math.random() < 0.5;
            const normWallSize = isH ? canvasWidth : canvasHeight;
            const wallPos = Math.floor(Math.random() * (normWallSize - 2 * WordMover.MIN_CORNER_DIST)) + WordMover.MIN_CORNER_DIST;

            const tanWallSize = isH ? canvasHeight : canvasWidth;
            const tan = [wallPos, wallPos, wallPos];
            let norm;

            if (this.wallIsLT) {
                norm = [-1000, -500, 0];
            }
            else {
                norm = [tanWallSize + 1000, tanWallSize + 500, tanWallSize];
            }

            const [x0, x1, x2] = isH ? tan : norm;
            const [y0, y1, y2] = isH ? norm : tan;

            movePath.moveTo(x0, y0);
            movePath.quadraticCurveTo(x1, y1, x2, y2);

            pathSegments.push(new QBezierCalculator(x0, y0, x1, y1, x2, y2));

            initialX0 = x2;
            initialY0 = y2;
            if (isH) {
                if (this.wallIsLT) {
                    initialTheta = 3 * Math.PI / 2;
                }
                else {
                    initialTheta = Math.PI / 2;
                }
            }
            else {
                if (this.wallIsLT) {
                    initialTheta = 0;
                }
                else {
                    initialTheta = Math.PI;
                }
            }
        }

        // create rest of curve
        while (pathSegments.length < 4) {
            let theta = initialTheta;
            let x0 = initialX0;
            let y0 = initialY0;
            pathSegments.length = 1;
            movePath.commands.length = 1;
            let notDone = true;
            while (notDone | (notDone = x0 >= 0 && x0 <= canvasWidth && y0 >= 0 && y0 <= canvasHeight)) {
                const r1 = notDone ? (Math.random() * 50) + 50 : 1000; // adjust numbers to change range
                const [dx1, dy1] = WordMover.polarToRectangular(r1, theta);
                const x1 = x0 + dx1;
                const y1 = y0 + dy1;

                if (notDone) {
                    theta += ((Math.random() - 0.5) * Math.PI) / 1.5;
                }           
                const r2 = notDone ? (Math.random() * 50) + 50 : 10000;
                const [dx2, dy2] = WordMover.polarToRectangular(r2, theta);
                const x2 = x1 + dx2;
                const y2 = y1 + dy2;

                movePath.quadraticCurveTo(x1, y1, x2, y2);
                pathSegments.push(new QBezierCalculator(x0, y0, x1, y1, x2, y2));

                x0 = x2;
                y0 = y2;
            }
        }

        this.arcLengths = [];
        this.arcLengths[-1] = 0;
        for (let i = 0; i < pathSegments.length; i++) {
            this.arcLengths[i] = this.arcLengths[i - 1] + pathSegments[i].arcLength;
        }
    }

    static polarToRectangular(r, theta) {
        return [r * Math.cos(theta), r * -Math.sin(theta)];
    }

    drawMovePath(showControlPoints) {
        this.movePath.fill = null;
        this.movePath.stroke = "gray";
        this.movePath.draw(ctx);
        if (showControlPoints) {
            for (let c of this.movePath.commands) {
                ctx.fillStyle = "red"
                ctx.fillRect(c.x - 2, c.y - 2, 4, 4);
                if (c.type === "Q") {
                    ctx.fillStyle = "blue";
                    ctx.fillRect(c.x1 - 2, c.y1 - 2, 4, 4);
                }
            }
        }
    }

    drawAt(t) {
        this.startTime ??= t;
        t -= this.startTime;
        const speedT = t / 15;
        const noiseT = t / 6000;
        const wordPath = new opentype.Path();
        for (let command of this.wordPath.commands) {
            const commandCopy = {};
            Object.assign(commandCopy, command);
            wordPath.commands.push(commandCopy);
        }
        wordPath.fill = this.color;
        wordPath.stroke = "black";

        const {x1: left, x2: right, y1: top, y2: bottom} = wordPath.getBoundingBox();
        const midH = (top - bottom) / 2 + bottom;

        const { arcLengths, pathSegments, wordSeed, definitions } = this;
        function adjustSinglePoint(x, y) {
            const s = -left -x + arcLengths[0] + speedT;
            let curveCalculator;
            let sSingle;

            for (let i = 0; i < arcLengths.length; i++) {
                if (s < arcLengths[i]) {
                    sSingle = s - arcLengths[i - 1];
                    curveCalculator = pathSegments[i];
                    break;
                }
            }

            let hNoise = definitions.length === 1 ? 1 : (noise.simplex3(s / 100, noiseT, wordSeed) * 0.20) + 1;
            return curveCalculator.adjustPoint(sSingle, (midH - y) * hNoise);
        }

        let prevX, prevY;
        for (let i = 0; i < wordPath.commands.length; i++) {
            let command = wordPath.commands[i];
            let {x, y, x1, y1} = command;
            if (command.type == "L" && prevX !== x) {
                command = wordPath.commands[i] = {
                    type: "Q",
                    x: x,
                    y: y,
                    x1: x1 = (prevX + x) / 2,
                    y1: y1 = (prevY + y) / 2,
                }
            }
            switch (command.type) {
                case "Q":
                    const [newX1, newY1] = adjustSinglePoint(x1, y1);
                    command.x1 = newX1;
                    command.y1 = newY1;
                case "L":
                case "M":
                    const [newX, newY] = adjustSinglePoint(x, y);
                    command.x = newX;
                    command.y = newY;
            }
            prevX = x;
            prevY = y;
        }

        wordPath.draw(ctx);

        this.latestPath = wordPath;

        let {x1, y1, x2, y2} = wordPath.getBoundingBox()
        if (t > 200 && (x2 < 0 || y2 < 0 || x1 > canvasWidth || y1 > canvasHeight)) {
            return true;
        }

        return false;
    }

    static replaceWord(old) {
        const newWord = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        if (old !== null) {
            words.push(old);
        }
        return new WordMover(newWord);
    }

    containsPoint(x, y) {
        if (!this.latestPath) {
            return false;
        }
        const tempCtx = document.createElement("canvas").getContext("2d");
        this.latestPath.draw(tempCtx);
        return tempCtx.isPointInPath(x, y);
    }

    showDefinition() {
        const div = document.createElement("div");
        div.classList.add("definition");
        const def = this.definitions.shift();
        this.definitions.push(def);
        div.innerHTML = `<p>${this.defWord}</p><p>${def}</p><p>Click again for ${
            this.definitions.length === 1 ? "the same" : "another"} meaning.</p>`;
        main.append(div);
        let { clientWidth: width, clientHeight: height } = div;
        const [x, y] = WordMover.getDonutPoint(width, height);
        div.style.top = y + "px";
        div.style.left = x + "px";
        setTimeout(() => {
            div.classList.add("disappear");
        }, ((def.match(/ /g) || []).length + 7) / 180 * 60000) // (assumes reader reads a 180 wpm, adult avg is 230)
        div.addEventListener("animationend", () => {
            div.remove();
        });
    }

    static getDonutPoint(pointWidth, pointHeight) {
        const { clientWidth: outerWidth, clientHeight: outerHeight } = main;
        const { right, left, top, bottom } = canvas.getBoundingClientRect();

        let x, y;
        while (!(x < 50 || x + pointWidth > outerWidth - 50 || x + pointWidth < left || x > right)
            && !(y < 50 || y + pointHeight > outerHeight - 50 || y + pointHeight < top || y > bottom)) {
            x = Math.floor(Math.random() * (outerWidth - pointWidth));
            y = Math.floor(Math.random() * (outerHeight - pointHeight));
        }

        return [x, y];
    }
}

const currentWords = [];

document.getElementById("instructions").addEventListener("animationend", event => {
    if (event.target.id === "instructions") {
        for (let i = 0; i < 7; i++) {
            setTimeout(() => {
                currentWords.push(WordMover.replaceWord(null));
            }, i * 1000);
        }
    }
});

let movePathCheckbox = document.getElementById("showMovePaths");
let showMovePath = movePathCheckbox.checked;
movePathCheckbox.addEventListener("change", () => {
    showMovePath = movePathCheckbox.checked;
})

function frame(time) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < currentWords.length; i++) {
        let replace;
        try {
            // if too much time has passed since the last frame (e.g. you left the tab and
            // came back), then drawAt will throw an error because the distance traveled by
            // the word will have exceed the arclength of every pathSegments so curveCalculator
            // will be undefined

            if (showMovePath) {
                currentWords[i].drawMovePath(true);
            }
            replace = currentWords[i].drawAt(time);
        }
        catch {
            replace = true;
        }

        if (replace) {
            currentWords[i] = WordMover.replaceWord(currentWords[i]);
        }
    }
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

canvas.addEventListener("click", ({ offsetX: x, offsetY: y }) => {
    for (let i = currentWords.length - 1; i >= 0; i--) {
        if (currentWords[i].containsPoint(x, y)) {
            currentWords[i].showDefinition();
            break;
        }
    }
});
