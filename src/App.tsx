import { ThemeProvider } from 'styled-components'

import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { CyclesContextProvider } from './CyclesContext'

export function App() {

  return (
      <ThemeProvider theme={defaultTheme}>
        <CyclesContextProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>

            <GlobalStyle />
          </CyclesContextProvider>
      </ThemeProvider>
  )
}