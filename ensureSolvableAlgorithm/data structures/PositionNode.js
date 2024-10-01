"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PositionNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
    setNextNode(node) {
        if (!(node instanceof PositionNode)) {
            throw new Error('Next node must be a member of the Node class');
        }
        this.next = node;
    }
    getNextNode() {
        return this.next;
    }
}
exports.default = PositionNode;
