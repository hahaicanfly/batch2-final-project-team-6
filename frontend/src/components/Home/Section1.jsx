import { Header } from '../../components'
import { Link } from "react-router-dom";
import ArrowImg from '../../assets/images/arrow.svg'

export const Section1 = () => {
  return (
    <section className="section1">
      <Header />

      <div className="flex-justify flex-column">
        <h1 className="title linear-text">Trust News</h1>
        <span>The Best SocialFi Info Platform
          <br />
          便捷、去中心化，為信任的資訊提供平台
        </span>
        <div className="btn-list">
          <Link className="nav-left" to="/posts">
            <button className="btn btn-border">Let’s go</button>
          </Link>
        </div>
        <div className="arrow">
          <img src={ArrowImg} alt="Arrow" />
        </div>
      </div>
    </section>
  )
}