import React from 'react';
import Home from './Home';

function action() {
  return {
    title: 'Log Test',
    description: '',
    component: <Home />,
  };
}

export default action;
