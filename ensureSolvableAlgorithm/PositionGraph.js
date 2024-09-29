class PositionGraph {
    constructor() {
        this.vertices = [];
    }

    addVertex(data) {
        const newVertex = new Vertex(data);
        this.vertices.push(newVertex);
        return newVertex;
    }

    removeVertex(vertex) {
        this.vertices = this.vertices.filter(v => v !== vertex);
    }

    addEdge(vertexOne, vertexTwo) {
        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
            vertexOne.addEdge(vertexTwo);
            vertexTwo.addEdge(vertexOne);
        } else {
            throw new Error('Expected Vertex arguments.');
        }
    }

    removeEdge(vertexOne, vertexTwo) {
        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
            vertexOne.removeEdge(vertexTwo);
            vertexTwo.removeEdge(vertexOne);
        } else {
            throw new Error('Expected Vertex arguments.');
        }
    }

    getVertexByValue(value) {
        return this.vertices.find(vertex => vertex.data === value);
    }
    
    print() {
        const vertexList = this.vertices;
        vertexList.forEach(vertex => vertex.print());
    }
}

class Vertex {
    constructor(data) {
        this.data = data;
        this.edges = [];
    }

    addEdge(vertex) {
        if (vertex instanceof Vertex) {
            this.edges.push(new Edge(this, vertex));
        } else {
            throw new Error('Edge start and end must both be Vertex');
        }
    }

    removeEdge(vertex) {
        this.edges = this.edges.filter(edge => edge.end !== vertex);
    }

    print() {
        const edgeList = this.edges.map(edge =>
            edge.end.data) || [];
    
        const output = `${this.data} --> ${edgeList.join(', ')}`;
        console.log(output);
    }
}

class Edge {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

module.exports = {
    PositionGraph,
    Vertex,
    Edge,
};