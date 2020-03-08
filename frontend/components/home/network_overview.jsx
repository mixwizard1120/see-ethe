import React from 'react';
import { Container, Card, Row, Col, Media } from 'reactstrap';
import Big from 'big.js';

import { timeDiff } from '../../util/general_util';
import { networkHashRate, web3 } from '../../util/web3_util'


// TODO move to utilities
const displayDifficulty = (difficulty) => {
  const bigDifficulty = new Big(difficulty, 10)
  const big100Bil = new Big('1000000000000', 10)
  const bigDifficultyTh = bigDifficulty.div(big100Bil);
  const str = bigDifficultyTh.toString()
  return `${str[0]},${str.slice(1, 7)}`
}

const displayHashRate = (hashRate) => {
  if (hashRate === '') return hashRate;
  const bigHashRate = new Big(hashRate, 10);
  const big100Thousand = new Big('100000000');
  const bigHR100Thousand = bigHashRate.div(big100Thousand)
  const str = bigHR100Thousand.toString()
  return `${str.slice(0, 3)},${str.slice(3, 10)}`
}

export default class NetworkOverview extends React.Component {

  componentDidMount() {
    this.props.fetchPrices();
    this.props.fetchTotalSupply();
  }

  calculateMarketCap() {
    const { totalSupply, ethusd } = this.props;
    if (!(totalSupply && ethusd)) return '...loading';
    const totalEthe = web3.utils.fromWei(totalSupply.toString(), 'ether');
    const bigTotalSupplyEth = new Big(totalEthe, 10);
    const bigMarketCap = bigTotalSupplyEth.mul(new Big(ethusd));
    return bigMarketCap.toString();
  }

  render() {
    const { latestBlock,
      nextLatestBlock,
      latestBlocks,
      ethbtc,
      ethusd,
    } = this.props;
    const dispHashRate = displayHashRate(networkHashRate(latestBlocks));
    const lBNumber = latestBlock ? latestBlock.number : '...loading';
    const lBDificulty = latestBlock ? displayDifficulty(latestBlock.difficulty)
      : '...loading';
    const mineTime = latestBlock && nextLatestBlock ?
      (timeDiff(latestBlock, nextLatestBlock)) : '...';

    return (
      <Container fluid='lg' className='md-4'>
        <Card className='md-4'>
          <Row className='mx-gutters-md-1'>

            <Col lg='4' md='6'>
              <div className='media align-items-center'>

                <Media>
                  <Media left href="#">
                    <figure className='u-sm-avatar mr-2'>
                      <img className='price-av' src={window.imgs.ethePrice} />
                      
                    </figure>

                  </Media>
                  <Media body className='width-100pe'>
                    <Media heading className='net-overview-secondary-txt'>
                      ETHER Price
                    </Media>
                    <a className='net-overview-primary-link-txt'>${ethusd}</a>
                    <span className='secondary-size-1'> @ {ethbtc} BTC </span>
                  </Media>
                </Media>

                <div></div>
              </div>
              <hr className='hr-space-lg'></hr>

              <div className='media align-items-center'>
                <Media>
                  <Media left href="#">
                    <figure className='u-sm-avatar mr-2'>
                      <img className='' src={window.imgs.worldMarked} />
                      
                    </figure>
                  </Media>
                  <Media body className='width-100pe'>
                    <Media heading className='net-overview-secondary-txt'>
                      Market Cap
                    </Media>
                    <a className='net-overview-primary-link-txt'>
                      ${this.calculateMarketCap()}
                    </a>

                  </Media>
                </Media>

              </div>
              <hr className='d-none d-md-none hr-space-lg' />
    
            </Col>

            <Col lg='4' md='6'>
              <div className='media align-items-center'>
                <Media>
                  <Media left href="#">
                    <figure className='u-sm-avatar mr-2'>
                      <img className='' src={window.imgs.latestBlock} />
                      
                    </figure>
                  </Media>

                  <Media body className='width-latest-block '>
                    <Media heading className='net-overview-secondary-txt'>
                      Latest Block
                    </Media>
                    <a className='net-overview-primary-link-txt'>{lBNumber}</a>
                    <span className='secondary-small'>({mineTime}.0 s)</span>
                  </Media>

                  <div className='text-right'>
                    <Media heading className='net-overview-secondary-txt'>
                      Transaction
                  </Media>
                    <a className='net-overview-primary-link-txt'>651.178</a>
                    <span className='secondary-small'> (8.8 TPS)</span>
                  </div>

                </Media>


              </div>
              <hr className='hr-space-lg'></hr>
              <div className='media align-items-center'>

                <Media>
                  <Media left href="#">
                    <figure className='u-sm-avatar mr-2'>
                      <img className='' src={window.imgs.mineIcon} />
                      
                    </figure>
                  </Media>

                  <Media body className='width-difficulty'>
                    <Media heading className='net-overview-secondary-txt'>
                      Difficulty
                    </Media>
                    <a className='net-overview-primary-link-txt'>{lBDificulty} TH</a>
                  </Media>

                  <div className='text-right hash-rate'>
                    <Media heading className='net-overview-secondary-txt'>
                      Hash Rate
                    </Media>
                    <a className='net-overview-primary-link-txt'>{dispHashRate} GH/s</a>
                  </div>


                </Media>
              </div>

            </Col >
            <Col lg='4' md='12'>
              Graph
            </Col>
          </Row>
        </Card>
      </Container>
    )
  }
}


