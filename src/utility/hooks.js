import { useState, useEffect } from "react";
import { globalHistory } from "@reach/router";

// Sourced from reach/router/issues/203
// Repository is licensed under MIT
// https://github.com/reach/router/issues/203

// Gets current location from global history as a hook
export function useLocation() {
  const initialState = {
    location: globalHistory.location,
    navigate: globalHistory.navigate
  };

  const [state, setState] = useState(initialState);
  useEffectOnce(() => {
    const removeListener = globalHistory.listen(params => {
      const { location } = params;
      const newState = Object.assign({}, initialState, { location });
      setState(newState);
    });
    return () => {
      removeListener();
    };
  });

  return state;
}

// Runs an effect hook once, simulating componentDidMount/componentWillUnmount
export function useEffectOnce(effectFunc) {
  useEffect(effectFunc, []);
}

// Returns true only if the current render
// (useful for ensuring SSR/client hydration symmetry)
export function useInitialRender() {
  const [isInitial, setIsInitial] = useState(true);
  useEffectOnce(() => setIsInitial(false));
  return isInitial;
}
