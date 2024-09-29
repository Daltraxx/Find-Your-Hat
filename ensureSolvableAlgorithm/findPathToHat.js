const { PositionGraph } = require('./PositionGraph');

const hole = 'O';
const hat = '^';

const gameGraph = new PositionGraph();

const getPositionString = (position) => {
    const positionString = `${position[0]}-${position[1]}`;
    return positionString;
}

const mapGameGrid = (gameGrid) => {
    const mapHeight = gameGrid.length;
    const mapWidth = gameGrid[0].length;

    
    
    for (let row = 0; row < gameGrid.length; row++) {
        for (let col = 0; col < gameGrid[row].length; col++) {
            gameGraph.addVertex(getPositionString([row, col]));
        }
    }

    //add edges
    for (let row = 0; row < gameGrid.length; row++) {
        for (let col = 0; col < gameGrid[row].length; col++) {
            let currentVertex = gameGraph.getVertexByValue(getPositionString([row, col]));

            //down
            if (row + 1 < mapHeight) {
                gameGraph.addEdge(currentVertex, gameGraph.getVertexByValue(getPositionString([row + 1, col])));
            }

            //right
            if (col + 1 < mapWidth) {
                gameGraph.addEdge(currentVertex, gameGraph.getVertexByValue(getPositionString([row, col + 1])));
            }
        }
    }

    
}

const findPathToHat = (startingPoint, gameMap, visitedPositions = [startingPoint]) => {
    let foundHat = false;

    for (let edge of startingPoint.edges) {
        let neighborPosition = edge.end.data.split('-');

        let rowPosition = Number(neighborPosition[0]);
        let colPosition = Number(neighborPosition[1]);

        if (gameMap[rowPosition][colPosition] === hat) {
            return true;
        }

        if (gameMap[rowPosition][colPosition] === hole) startingPoint.removeEdge(edge.end);
        
    }

    startingPoint.edges.forEach((edge) => {
        const neighbor = edge.end;

        if (!visitedPositions.includes(neighbor)) {
            visitedPositions.push(neighbor);
            foundHat = findPathToHat(neighbor, gameMap, visitedPositions);
        }
    })

    return foundHat;
}


/* For testing 
const testField = [
    ['!', 'O', 'O'],
    ['░', '░', '░'],
    ['O', '^', '░'],
]
mapGameGrid(testField);
const startingPoint = gameGraph.getVertexByValue(getPositionString([0, 0]));
console.log(findPathToHat(startingPoint, testField));
*/

module.exports = {
    gameGraph,
    getPositionString,
    mapGameGrid,
    findPathToHat,
};