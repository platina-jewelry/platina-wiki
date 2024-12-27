import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import {HelmetProvider} from 'react-helmet-async';
import {theme} from './constants';
import Editor from "./Editor";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
          <Editor />
      </ChakraProvider>
    </HelmetProvider>
  );
};

export default App;
