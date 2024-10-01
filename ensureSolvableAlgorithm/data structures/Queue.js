"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LinkedList_js_1 = require("./LinkedList.js");
class Queue {
    constructor() {
        this.queue = new LinkedList_js_1.default();
        this.size = 0;
    }
    isEmpty() {
        return this.size === 0;
    }
    enqueue(data) {
        this.queue.addToTail(data);
        this.size++;
    }
    dequeue() {
        if (!this.isEmpty()) {
            const data = this.queue.removeHead();
            this.size--;
            return data;
        }
        else {
            throw new Error('Queue is empty!');
        }
    }
}
exports.default = Queue;
