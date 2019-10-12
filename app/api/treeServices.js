import config from 'config';
import request from 'utils/request';

export function findDescenders(nodeId) {
  const url = `${config.backendBasURL.concat(config.api.tree.searchDescenders)}${nodeId}`;
  return request({
    method: 'GET',
    url: url,
  });
}

export function changeParents(srcNode, tarNode) {
  const url = config.backendBasURL.concat(config.api.tree.changeNodeParents);
  return request({
    method: 'POST',
    url: url,
    data: {
      srcNode,
      tarNode
    },
  });
}

export function getTree() {
  const url = config.backendBasURL.concat(config.api.tree.getTree);
  return request({
    method: 'GET',
    url,
  });
}
