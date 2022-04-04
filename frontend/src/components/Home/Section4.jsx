import Tokenomics from '../../assets/images/tokenomatic.png'

export const Section4 = () => {
  const gitBook = 'https://hiippo.gitbook.io/trustnews-dao/'

  return (
    <section className="section4">
      <div className="container">
        <div className="info text-center">
          <span>Let’s introduce with</span>
          <div className="title linear-text">貨幣經濟</div>
          <div className="btn-list">
            <a
              href={gitBook}
              target="_blank" rel="noreferrer"
            >
              <button className="btn btn-border">
                白皮書連結
              </button>
            </a>
          </div>
        </div>
        <div className="section4-content">
          <img className="img-fluid" src={Tokenomics} alt="TOKENOMICS" />
        </div>
      </div>
    </section>
  )
}