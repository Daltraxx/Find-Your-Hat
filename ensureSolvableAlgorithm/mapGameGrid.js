"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionGraph_1 = require("./PositionGraph");
const getPositionString_1 = require("./getPositionString");
const mapGameGrid = (gameGrid) => {
    const gameGraph = new PositionGraph_1.default();
    const mapHeight = gameGrid.length;
    const mapWidth = gameGrid[0].length;
    for (let row = 0; row < gameGrid.length; row++) {
        for (let col = 0; col < gameGrid[row].length; col++) {
            gameGraph.addVertex((0, getPositionString_1.default)([row, col]));
        }
    }
    //add edges
    for (let row = 0; row < gameGrid.length; row++) {
        for (let col = 0; col < gameGrid[row].length; col++) {
            let currentVertex = gameGraph.getVertexByValue((0, getPositionString_1.default)([row, col]));
            //down
            if (row + 1 < mapHeight) {
                gameGraph.addEdge(currentVertex, gameGraph.getVertexByValue((0, getPositionString_1.default)([row + 1, col])));
            }
            //right
            if (col + 1 < mapWidth) {
                gameGraph.addEdge(currentVertex, gameGraph.getVertexByValue((0, getPositionString_1.default)([row, col + 1])));
            }
        }
    }
    return gameGraph;
};
exports.default = mapGameGrid;
