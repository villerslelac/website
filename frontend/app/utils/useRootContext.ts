import { createContext, useContext } from 'react';

export const RootContext = createContext({
  directusUrl: '',
  hCaptchaSiteKey: '',
});

export const useRootContext = () => useContext(RootContext);
