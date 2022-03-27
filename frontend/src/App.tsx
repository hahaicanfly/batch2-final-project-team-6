import { Section1, Section2, Section3 } from './components'

import './assets/style/reset.css'
import './assets/style/helper.scss'
import './assets/style/home.scss'
import './assets/style/function.scss'

export const App = () => {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
    </>
  )
}