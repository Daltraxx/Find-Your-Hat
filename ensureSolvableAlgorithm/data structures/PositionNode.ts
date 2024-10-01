class PositionNode {
    data : string;
    next : PositionNode | null;
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  
    setNextNode(node : PositionNode) {
      if (!(node instanceof PositionNode)) {
        throw new Error('Next node must be a member of the Node class');
      }
      this.next = node;
    }
  
    getNextNode() {
      return this.next;
    }
  }
  
export default PositionNode;