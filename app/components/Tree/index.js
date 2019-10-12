import 'assets/index.css';
import React from 'react';
import Tree, { TreeNode } from 'rc-tree';
import './tree.css';
import { getTree, changeParents } from 'api/treeServices';

class Demo extends React.Component {

  componentDidMount() {
    this.getTreeNodes();
  }

  constructor(props) {
    super(props);
    this.state = {
      tree: [],
      autoExpandParent: true,
      expandedKeys: [] 
    };
  }

  onDragStart = (info) => {
  }

  getTreeNodes = async () => {
    try {
      const tNodes = await getTree();
      if (tNodes.length > 0) {
        const uiNode = [];
        uiNode.push(this.makeTreeStructure(tNodes, tNodes[0])); //root
        this.setState({ tree: uiNode });
      }
      else {
        console.log("setState for empty tree!")
      }
    } catch (error) {
      console.log('in error ', error);
    }
  };

  makeTreeStructure = (tNodes, node) => {
    const nodeInfo = {
      key: node._id,
      title: node.name
    };
    const children = this.findImmediateChildren(tNodes, node._id);
    if (children.length > 0) {
      this.setState({ expandedKeys: this.state.expandedKeys.concat(node._id) })
      return {
        ...nodeInfo,
        children: children.map(child => this.makeTreeStructure(tNodes, child))
      };
    }
    return nodeInfo;
  }

  findImmediateChildren = (nodes, parentId) => {
    return nodes.filter(node => node.parentId === parentId)
  }



  onDragEnter = (info) => {
    this.setState({
      expandedKeys: info.expandedKeys,
    });
  }

  onDrop = (info) => {
    console.log('drop', info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    changeParents(dragKey, dropKey);


    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.tree];


    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&  // Has children
      info.node.props.expanded &&                     // Is expanded
      dropPosition === 1                              // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      // Drop on the gap
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      tree: data,
    });
  }


  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  renderTitle = () => (
    <>
      <h2>draggable</h2>
      <p>drag a node into another node</p>
    </>
  )

  render() {
    const loop = data => {
      return data.map((item) => {
        if (item.children && item.children.length) {
          return <TreeNode key={item.key} title={item.title}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode key={item.key} title={item.title} />;
      });
    };
    return (
    <div className="draggable-demo">
      {this.renderTitle()}
      <div className="draggable-container">
        <Tree
          expandedKeys={this.state.expandedKeys}
          onExpand={this.onExpand} autoExpandParent={this.state.autoExpandParent}
          draggable
          onDragStart={this.onDragStart}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
        >
          {loop(this.state.tree)}
        </Tree>
      </div>
    </div>);
  }
}

export default Demo;