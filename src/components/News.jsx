import { useEffect, React } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment/moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { Link } from 'react-router-dom';



const { Text, Title } = Typography;
const { Option } = Select;

function News({ simplified }) {
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 6 : 12 })

  let value = 12

  if (!cryptoNews?.articles) return 'Loading...'

  const data = cryptoNews.articles.slice(0, value)



  return (
    <>
      {/* <span className='show' onClick={cryptoNews.articles.slice(0,30)}><Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title></span> */}
      <Row gutter={[24, 24]}>
        {data.map((news, i) => (
          <Col xs={24} sm={24} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel="noreferrer">
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>{news.source.name}</Title>
                  <img src={news.urlToImage} className='news-image' />
                </div>
                <p>
                  {news.description > 100 ? `${news.description.subString(0, 100)}...` : news.description}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar src={news.urlToImage} alt="news" />
                    <Text>{moment(news.publishedAt).startOf('ss').fromNow()}</Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>)
}

export default News
