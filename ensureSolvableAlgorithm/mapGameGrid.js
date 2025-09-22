"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PositionGraph_js_1 = require("./data structures/PositionGraph.js");
var getPositionString_js_1 = require("./getPositionString.js");
var mapGameGrid = function (gameGrid) {
    var gameGraph = new PositionGraph_js_1.default();
    var mapHeight = gameGrid.length;
    var mapWidth = gameGrid[0].length;
    for (var row = 0; row < gameGrid.length; row++) {
        for (var col = 0; col < gameGrid[row].length; col++) {
            gameGraph.addVertex((0, getPositionString_js_1.default)([row, col]));
        }
    }
    //add edges
    for (var row = 0; row < gameGrid.length; row++) {
        for (var col = 0; col < gameGrid[row].length; col++) {
            var currentVertex = gameGraph.getVertexByValue((0, getPositionString_js_1.default)([row, col]));
            if (currentVertex !== undefined) {
                //fix why vertexes could possibly be undefined later
                //down
                if (row + 1 < mapHeight - 1) {
                    var downVertex = gameGraph.getVertexByValue((0, getPositionString_js_1.default)([row + 1, col]));
                    if (downVertex !== undefined) {
                        gameGraph.addEdge(currentVertex, downVertex);
                    }
                }
                //right
                if (col + 1 < mapWidth - 1) {
                    var rightVertex = gameGraph.getVertexByValue((0, getPositionString_js_1.default)([row, col + 1]));
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
