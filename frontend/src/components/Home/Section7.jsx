import Icon1 from '../../assets/images/section3-icon1.svg'
import Hazel from '../../assets/images/hazel.png'

export const Section7 = () => {
  const teamList = [
    {
      name: 'Hazel | C0021601',
      avatar: Hazel,
      description: ['Team Leader', 'Front-End Developer']
    },
    {
      name: 'Henry | C0012205',
      avatar: Hazel,
      description: ['Smart Contract Developer']
    },
    {
      name: 'Archer | C0021603',
      avatar: Hazel,
      description: ['Smart Contract Developer', 'Tokenomic Research']
    },
    {
      name: 'Osmond | C0012204',
      avatar: Hazel,
      description: ['Whitepaper Writer']
    },
    {
      name: 'DavidW | C0021602',
      avatar: Hazel,
      description: ['Project Manager', 'Tokenomic Research']
    },
    {
      name: 'Avery | C0021604',
      avatar: Hazel,
      description: ['Smart Contract Developer']
    },
  ]

  const divStyle = (src) => ({
    backgroundImage: 'url(' + src + ')'
  })

  return (
    <section className="section7">
      <div className="container">
        <div className="info text-center">
          <div className="title linear-text">團隊成員</div>
          <span>Our Team</span>
        </div>

        <div className="row">
          {teamList.map((item, index) => (
            <div className="col-4 flex-justify" key={index}>
              <div className="box">
                <div
                  className="box-avatar"
                  style={divStyle(item.avatar)}
                />

                <div className="box-content">
                  <h2 className="name title linear-text">{item.name}</h2>

                  {item.description.map((desc, i) => (
                    <span key={i}>{desc}<br /></span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}