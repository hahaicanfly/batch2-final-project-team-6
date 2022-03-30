import {
  Section1,
  Section2,
  Section3, Section4,
  Section5, Section6,
  Section7, Section8,
  GetToken
} from './components/index'

import './assets/style/reset.css'
import 'antd/dist/antd.css';
import './assets/style/_mixins.scss'
import './assets/style/helper.scss'
import './assets/style/home.scss'
import './assets/style/post.scss'

export const App = () => {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <GetToken />
    </>
  )
}