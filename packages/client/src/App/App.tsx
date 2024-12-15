import {FC} from 'react'
import './App.css'
import {HelmetProvider} from 'react-helmet-async'
import {ChakraProvider} from '@chakra-ui/react'
import {theme} from './constants'

const App: FC = () => {

  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <div contentEditable="true">Это редактируемый текст. Попробуй изменить его!</div>
      </ChakraProvider>
    </HelmetProvider>
  )
}

export default App
