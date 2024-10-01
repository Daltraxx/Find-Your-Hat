import PositionNode from "./PositionNode.js";

class LinkedList {
    head : PositionNode | null;

    constructor() {
      this.head = null;
    }
  
    addToHead(data : PositionNode): void {
      const newHead = new PositionNode(data);
      const currentHead = this.head;
      this.head = newHead;
      if (currentHead) {
        this.head.setNextNode(currentHead);
      }
    }
  
    addToTail(data : PositionNode): void {
      let tail = this.head;
      if (!tail) {
        this.head = new PositionNode(data);
      } else {
        //! used to assert value will not be null to get around ts complaint for now
        while (tail!.getNextNode() !== null) {
          tail = tail!.getNextNode();
        }
        tail!.setNextNode(new PositionNode(data));
      }
    }
  
    removeHead(): string | undefined {
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
  
    findNodeIteratively(data : string): PositionNode | null {
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

  export default LinkedList;