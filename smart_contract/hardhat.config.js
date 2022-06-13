require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/dR2gdInSmHM4bz5xCI4U8kRFHHhc-rk0',
      accounts: ['a6d990ec6956da2525984f8fba2fe24d788cccc46ec97ac5bde73ca5a7628b81'],
    },
  },
};