import React, { useEffect, useState } from 'react';
import { findDescenders, getTree } from 'api/treeServices';
import { SimpleSnackBar } from 'components/Snackbar/';
import SingleSelector from 'components/SingleSelector/';
import './SearchWrapper.css';

function SearchTable(props) {
  return <table className='user-request-table'>
    <thead className='th' >
      <tr>
        <th scope="col">
          {'#'}
        </th>
        <th scope="col">
          {'name'}
        </th>
        <th scope="col">
          {'height'}
        </th>
      </tr>
    </thead>
    <tbody>
      {!!props.tNodes.length &&
        props.tNodes.map((node, i) => (
          <tr key={node._id}>
            <td scope="row">{i}</td>
            <td>{node.name}</td>
            <td>{node.height}</td>
          </tr>
        ))}
    </tbody>
  </table>;
};

function SearchWrapper() {

  useEffect(() => {
    getNodeInfo();
  }, []);

  const [leaf, setLeaf]                 = useState(false);
  const [nodeOptions, setNodeOptions]   = useState([]);
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [tNodes, setTNodes]             = useState([]);

  const getNodeInfo = async () => {
    const { status, res } = await getTree();
    const nodeList = res.map(node => ({ key: node._id, label: node.name }))
    setNodeOptions(nodeList)
  }

  const search = async id => {
    const { status , res } = await findDescenders(id);
    if ( status === 200 && res.length > 0){
      setTNodes(res);
      setLeaf(false);
    }
    else if(status === 200 && res.length === 0){
      setTNodes([]);
      setLeaf(true);
    }
    else {
      setShowSnackBar(true);
      setTNodes([]);
      setLeaf(false);
    }
  };

  return (
    <div className="search-container">
      <SingleSelector onSearch={search} options={nodeOptions} />
      {tNodes.length > 0 && <SearchTable tNodes={tNodes} />}
      {leaf && <h3>{'is leaf :)'}</h3>}
      {showSnackBar && <SimpleSnackBar
        variant="error"
        message="The requested node is not valid!"
        onClose={() => setShowSnackBar(false)}
      />}
    </div>
  );
}

export default SearchWrapper;
