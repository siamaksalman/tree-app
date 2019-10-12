/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  test: {
    id: `${scope}.test`,
    defaultMessage: 'test',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
});
