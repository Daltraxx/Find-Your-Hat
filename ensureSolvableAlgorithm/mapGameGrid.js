"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionGraph_js_1 = require("./data structures/PositionGraph.js");
const getPositionString_js_1 = require("./getPositionString.js");
const mapGameGrid = (gameGrid) => {
    const gameGraph = new PositionGraph_js_1.default();
    const mapHeight = gameGrid.length;
    const mapWidth = gameGrid[0].length;
    for (let row = 0; row < gameGrid.length; row++) {
        for (let col = 0; col < gameGrid[row].length; col++) {
            gameGraph.addVertex((0, getPositionString_js_1.default)([row, col]));
        }
    }
    //add edges
    for (let row = 0; row < gameGrid.length; row++) {
        for (let col = 0; col < gameGrid[row].length; col++) {
            let currentVertex = gameGraph.getVertexByValue((0, getPositionString_js_1.default)([row, col]));
            if (currentVertex !== undefined) {
                //fix why vertexes could possibly be undefined later
                //down
                if (row + 1 < mapHeight - 1) {
                    let downVertex = gameGraph.getVertexByValue((0, getPositionString_js_1.default)([row + 1, col]));
                    if (downVertex !== undefined) {
                        gameGraph.addEdge(currentVertex, downVertex);
                    }
                }
                //right
                if (col + 1 < mapWidth - 1) {
                    let rightVertex = gameGraph.getVertexByValue((0, getPositionString_js_1.default)([row, col + 1]));
                    if (rightVertex !== undefined) {
                        gameGraph.addEdge(currentVertex, rightVertex);
                    }
                }
            }
        }
    }
    return gameGraph;
};
exports.default = mapGameGrid;
