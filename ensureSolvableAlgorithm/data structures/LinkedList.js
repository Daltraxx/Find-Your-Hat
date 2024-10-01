"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionNode_js_1 = require("./PositionNode.js");
class LinkedList {
    constructor() {
        this.head = null;
    }
    addToHead(data) {
        const newHead = new PositionNode_js_1.default(data);
        const currentHead = this.head;
        this.head = newHead;
        if (currentHead) {
            this.head.setNextNode(currentHead);
        }
    }
    addToTail(data) {
        let tail = this.head;
        if (!tail) {
            this.head = new PositionNode_js_1.default(data);
        }
        else {
            //! used to assert value will not be null to get around ts complaint for now
            while (tail.getNextNode() !== null) {
                tail = tail.getNextNode();
            }
            tail.setNextNode(new PositionNode_js_1.default(data));
        }
    }
    removeHead() {
        const removedHead = this.head;
        if (!removedHead) {
            return;
        }
        this.head = removedHead.getNextNode();
        return removedHead.data;
    }
    printList() {
        let currentNode = this.head;
        let output = '<head> ';
        while (currentNode !== null) {
            output += currentNode.data + ' ';
            currentNode = currentNode.next;
        }
        output += `<tail>`;
        console.log(output);
    }
    findNodeIteratively(data) {
        let currentNode = this.head;
        while (currentNode !== null) {
            if (currentNode.data === data) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }
}
exports.default = LinkedList;
