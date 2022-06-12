require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/rTG_-N1kUyx-4gwLfxoyOW1gIb05MPY2',
      accounts: ['d043a96c6bb5802e3e17fdf68f1fa3024c912fbeed73c05052371ad87976808d'],
    },
  },
};