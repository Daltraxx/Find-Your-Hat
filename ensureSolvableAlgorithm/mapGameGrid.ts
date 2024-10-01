import PositionGraph from "./PositionGraph";
import getPositionString
 from "./getPositionString";
const mapGameGrid = (gameGrid) => {
    const gameGraph = new PositionGraph();

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

    return gameGraph;
}

export default mapGameGrid;