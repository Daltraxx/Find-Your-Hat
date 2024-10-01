import LinkedList from "./LinkedList.js";

class Queue {
    queue: LinkedList;
    size: number;

    constructor() {
      this.queue = new LinkedList();
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
        } else {
            throw new Error('Queue is empty!');
        }
    }
}

export default Queue;