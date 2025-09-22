"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PositionGraph = /** @class */ (function () {
    function PositionGraph() {
        this.vertices = [];
    }
    PositionGraph.prototype.addVertex = function (data) {
        var newVertex = new Vertex(data);
        this.vertices.push(newVertex);
        return newVertex;
    };
    PositionGraph.prototype.removeVertex = function (vertex) {
        this.vertices = this.vertices.filter(function (v) { return v !== vertex; });
    };
    PositionGraph.prototype.addEdge = function (vertexOne, vertexTwo) {
        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
            vertexOne.addEdge(vertexTwo);
            vertexTwo.addEdge(vertexOne);
        }
        else {
            throw new Error('Expected Vertex arguments.');
        }
    };
    PositionGraph.prototype.removeEdge = function (vertexOne, vertexTwo) {
        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
            vertexOne.removeEdge(vertexTwo);
            vertexTwo.removeEdge(vertexOne);
        }
        else {
            throw new Error('Expected Vertex arguments.');
        }
    };
    PositionGraph.prototype.getVertexByValue = function (value) {
        return this.vertices.find(function (vertex) { return vertex.data === value; });
    };
    PositionGraph.prototype.print = function () {
        var vertexList = this.vertices;
        vertexList.forEach(function (vertex) { return vertex.print(); });
    };
    return PositionGraph;
}());
var Vertex = /** @class */ (function () {
    function Vertex(data) {
        this.data = data;
        this.edges = [];
    }
    Vertex.prototype.addEdge = function (vertex) {
        if (vertex instanceof Vertex) {
            this.edges.push(new Edge(this, vertex));
        }
        else {
            throw new Error('Edge start and end must both be Vertex');
        }
    };
    Vertex.prototype.removeEdge = function (vertex) {
        this.edges = this.edges.filter(function (edge) { return edge.end !== vertex; });
    };
    Vertex.prototype.print = function () {
        var edgeList = this.edges.map(function (edge) {
            return edge.end.data;
        }) || [];
        var output = "".concat(this.data, " --> ").concat(edgeList.join(', '));
        console.log(output);
    };
    return Vertex;
}());
var Edge = /** @class */ (function () {
    function Edge(start, end) {
        this.start = start;
        this.end = end;
    }
    return Edge;
}());
exports.default = PositionGraph;
