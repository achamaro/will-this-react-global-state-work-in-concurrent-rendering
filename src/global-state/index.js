/* eslint-disable arrow-body-style */

import React, { useEffect, useState } from 'react';

import {
  initialState,
  createApp,
} from '../common';

class GlobalState {
  constructor(state) {
    this.setters = new Set();
    this.state = state;
  }

  setState(state) {
    if (typeof state === 'function') {
      this.state = state(this.state);
    } else {
      this.state = state;
    }

    this.setters.forEach((setState) => setState(this.state));
  }

  useState() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState(this.state);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      this.setters.add(setState);
      return () => {
        this.setters.delete(setState);
      };
    }, []);

    return state;
  }
}

const globalState = new GlobalState(initialState);

const useCount = () => globalState.useState().count;

const useIncrement = () => () => globalState.setState(({ count }) => ({ count: count + 1 }));

const useDouble = () => () => globalState.setState(({ count }) => ({ count: count * 2 }));

const Root = ({ children }) => <div>{children}</div>;

export default createApp(useCount, useIncrement, useDouble, Root);
