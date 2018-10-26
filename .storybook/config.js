import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.jsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

function stories() {
  require('../stories/Translate.stories');
}

configure(stories, module);
