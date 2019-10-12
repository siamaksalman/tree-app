// *** api ***
const api = {
  tree: {
    searchDescenders: '/tree/search',
    changeNodeParents: '/tree/update',
    getTree: '/app',
  },
};

// *** Host Base URL ***
const baseURL = 'http://localhost:3000';
const backendBasURL = 'http://localhost:3333';

// *** Locale Config ***
const language = 'en';
const projectTitle = 'Tree APP';

const config = {
  api,
  baseURL,
  backendBasURL,
  language,
  projectTitle,
};

export default config;
