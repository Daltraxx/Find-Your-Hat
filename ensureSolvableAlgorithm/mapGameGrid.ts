import PositionGraph from "./data structures/PositionGraph.js";
import getPositionString from "./getPositionString.js";

const mapGameGrid = (gameGrid : string[][]): PositionGraph => {
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

            if (currentVertex !== undefined) {
                //fix why vertexes could possibly be undefined later
                //down
                if (row + 1 < mapHeight - 1) {
                    let downVertex = gameGraph.getVertexByValue(getPositionString([row + 1, col]));
                    if (downVertex !== undefined) {
                        gameGraph.addEdge(currentVertex, downVertex);
                    }
                    
                }

                //right
                if (col + 1 < mapWidth - 1) {
                    let rightVertex = gameGraph.getVertexByValue(getPositionString([row, col + 1]));
                    if (rightVertex !== undefined) {
                        gameGraph.addEdge(currentVertex, rightVertex);
                    }
                    
                }
            }

        }
    }
        

    return gameGraph;
}

export default mapGameGrid;