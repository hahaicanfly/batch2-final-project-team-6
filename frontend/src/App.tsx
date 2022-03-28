import { Section1, Section2, Section3, Section4, Section5 } from './components'

import './assets/style/reset.css'
// import './assets/style/_mixins.scss'
import './assets/style/helper.scss'
import './assets/style/home.scss'

export const App = () => {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </>
  )
}