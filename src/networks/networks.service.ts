import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ROUTER_ABI } from 'src/common/constants';
import { Network, NetworkDocument } from './schemas/networks.schema';
import { Token, TokenDocument } from './schemas/tokens.schema';
import { UserToken, UserTokenDocument } from './schemas/user-tokens.schema';
import { Wallet, WalletDocument } from 'src/wallets/schemas/wallet.schema';
import { paginate } from 'src/common/pagination/paginate';
import {
  UserHistory,
  UserHistoryDocument,
} from './schemas/user-history.schema';
import {
  NetworkList,
  TokenList,
  UserTokenData,
  GetTokenData,
  SendTokenResponse,
  GasInfoResponse,
} from './dto/get_networks.dto';
import { AddTokenDto, QueryUserTokenData } from './dto/user-token.dto';
import { ethers, utils } from 'ethers';
import * as Promise from 'bluebird';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class NetworksService {
  constructor(
    @InjectModel(Network.name)
    private networkModel: Model<NetworkDocument>,
    @InjectModel(Token.name)
    private tokenModel: Model<TokenDocument>,
    @InjectModel(UserToken.name)
    private userTokenModel: Model<UserTokenDocument>,
    @InjectModel(UserHistory.name)
    private usrHisModel: Model<UserHistoryDocument>,
    @InjectModel(Wallet.name)
    private walletModel: Model<WalletDocument>,
    private commonService: CommonService,
  ) {}

  // eslint-disable-next-line prettier/prettier
  TOKEN_ABI = [{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"_decimals","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"_name","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"_symbol","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"burn","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getOwner","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"mint","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"mintTo","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"address","name":"recipient","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"renounceOwnership","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}],"constant":false}];

  tokenType = {
    opc_mainnet: 'OPC202',
    bsc_mainnet: 'BEP20',
    eth_mainnet: 'ERC20',
  };
  async onModuleInit() {
    // await this.initData();
  }

  async list(): Promise<NetworkList> {
    try {
      const networkList = await this.networkModel
        .find()
        .select('-createdAt -_id');
      return {
        statusCode: 200,
        data: networkList,
      };
    } catch (error) {
      Logger.error('NetworksService - getList', error);
      return {
        statusCode: 500,
        message: 'network.list.fail',
        data: [],
      };
    }
  }

  async listToken(): Promise<TokenList> {
    try {
      const networkList = await this.tokenModel
        .find()
        .select('-createdAt -_id');
      return {
        statusCode: 200,
        data: networkList,
      };
    } catch (error) {
      Logger.error('NetworksService - getTokens', error);
      return {
        statusCode: 500,
        message: 'network.list.fail',
        data: [],
      };
    }
  }

  async addToken(
    tokenInput: AddTokenDto,
    userId: string,
  ): Promise<UserTokenData> {
    const existsToken = await this.userTokenModel.findOne({
      userId,
      network: tokenInput.network,
      address: tokenInput.address,
    });
    if (existsToken) {
      return {
        statusCode: 400,
        message: 'add_token.fail.exists_wallet',
        data: [],
      };
    }
    const createdToken = new this.userTokenModel({
      ...tokenInput,
      userId,
    });
    await createdToken.save();
    return {
      statusCode: 200,
      data: [createdToken],
    };
  }

  async getTokenInfo(requestToken: QueryUserTokenData): Promise<GetTokenData> {
    try {
      if (!requestToken.network) {
        return {
          statusCode: 400,
          message: 'network.require_network_key',
          data: [],
        };
      }
      const networkData = await this.networkModel.findOne({
        key: requestToken.network,
      });
      if (!networkData) {
        return {
          statusCode: 404,
          message: 'network.not_found',
          data: [],
        };
      }

      const provider = new ethers.providers.JsonRpcProvider(networkData.rpcUrl);
      const tokenContract = new ethers.Contract(
        requestToken.address,
        this.TOKEN_ABI,
        provider,
      );
      const [decimals, tokenName, symbol] = await Promise.all([
        tokenContract.decimals(),
        tokenContract.name(),
        tokenContract.symbol(),
      ]);
      return {
        statusCode: 200,
        data: {
          address: requestToken.address,
          network: requestToken.network,
          decimals,
          name: tokenName,
          symbol,
          type: this.tokenType[requestToken.network],
        },
      };
    } catch (error) {
      Logger.error('NetworksService - getTokenInfo', error);
      return {
        statusCode: 500,
        message: 'network.get_token_info.fail',
        data: [],
      };
    }
  }

  async listUserToken(
    network: string,
    address: string,
    userId: string,
  ): Promise<TokenList> {
    try {
      if (!network) {
        return {
          statusCode: 400,
          message: 'network.require_network_key',
          data: [],
        };
      }
      const networkData = await this.networkModel.findOne({ key: network });
      if (!networkData) {
        return {
          statusCode: 404,
          message: 'network.not_found',
          data: [],
        };
      }
      if (!address) {
        return {
          statusCode: 400,
          message: 'network.require_address',
          data: [],
        };
      }
      const provider = new ethers.providers.JsonRpcProvider(networkData.rpcUrl);
      const networkTokenList = await this.tokenModel
        .find({ network })
        .select('-createdAt -_id');
      const tokenList = await this.userTokenModel
        .find({ userId, network })
        .select('-createdAt -_id -userId');

      const getBalance = await provider.getBalance(address);

      const amountList = await Promise.all(
        [...networkTokenList, ...tokenList].map(async (item) => {
          return {
            ...item.toJSON(),
            price: item.price
              ? await this.getPriceTokenOPC(item.address, provider)
              : 0,
            balance: await new ethers.Contract(
              item.address,
              this.TOKEN_ABI,
              provider,
            ).balanceOf(address),
          };
        }),
      );
      return {
        statusCode: 200,
        data: [
          {
            name: networkData.symbol,
            symbol: networkData.symbol,
            balance: ethers.utils.formatEther(getBalance),
            price: '0.0279115',
            imgUrl: `https://static.openchain.info/hostweb/chain_token/${networkData.symbol.toLowerCase()}.png`,
          },
        ].concat(
          amountList.map((item) => ({
            ...item,
            balance: ethers.utils.formatUnits(item.balance, item.decimals),
            price: item.price || '0',
            imgUrl: `https://static.openchain.info/hostweb/chain_token/${item.symbol.toLowerCase()}.png`,
          })),
        ),
      };
    } catch (error) {
      Logger.error('NetworksService - listUserToken', error);
      return {
        statusCode: 500,
        message: 'network.list_user_token.fail',
        data: [],
      };
    }
  }

  async calculateTransaction(
    network: string,
    from: string,
    to: string,
    userId: string,
    amount: string,
    token: string,
  ): Promise<GasInfoResponse> {
    let gasLimit = 21000;
    try {
      const getGas = await this.commonService.getMinFee();

      const networkData = await this.networkModel.findOne({ key: network });
      if (!networkData) {
        return {
          statusCode: 404,
          message: 'network.not_found',
          gasLimit,
          gasPrice: 1,
        };
      }

      const findWallet = await this.walletModel.findOne({
        userId,
        address: ethers.utils.getAddress(from),
      });
      if (!findWallet) {
        return {
          statusCode: 404,
          message: 'wallet.data.not_found_wallet',
          gasLimit,
          gasPrice: 1,
        };
      }
      if (!to) {
        return {
          statusCode: 400,
          message: 'wallet.send.require_to_address',
          gasLimit,
          gasPrice: 1,
        };
      }
      if (!ethers.utils.isAddress(to)) {
        return {
          statusCode: 400,
          message: 'wallet.send.to_address_wrong_format',
          gasLimit,
          gasPrice: 1,
        };
      }
      const provider = new ethers.providers.JsonRpcProvider(networkData.rpcUrl);
      const walletWithKey = new ethers.Wallet(findWallet.privateKey, provider);
      if (token) {
        let tokenFind: any = await this.userTokenModel.findOne({
          network,
          address: token,
        });
        if (!tokenFind) {
          tokenFind = await this.tokenModel.findOne({
            network,
            address: token,
          });
        }
        if (!tokenFind) {
          return {
            statusCode: 404,
            message: 'token.not_found',
            gasLimit,
            gasPrice: 1,
          };
        }
        const contract = new ethers.Contract(
          token,
          this.TOKEN_ABI,
          walletWithKey,
        );
        const estimateGas = await contract.estimateGas.transfer(
          to,
          ethers.utils.parseUnits(amount, tokenFind.decimals),
        );
        gasLimit = estimateGas.toNumber();
      } else {
        const txSend = {
          from,
          to,
          value: ethers.utils.parseEther(amount),
        };
        const estimateGas = await provider.estimateGas(txSend);
        gasLimit =
          estimateGas.toNumber() < gasLimit ? gasLimit : estimateGas.toNumber();
      }
      return {
        statusCode: 200,
        gasLimit,
        gasPrice: (Number(getGas) * 10 ** 9) / gasLimit,
      };
    } catch (error) {
      Logger.error('NetworksService - calculateTransaction', error);
      return {
        statusCode: 500,
        message: 'network.calculate_transaction.fail',
        gasLimit,
        gasPrice: 1,
      };
    }
  }

  async sendToken(
    network: string,
    from: string,
    to: string,
    userId: string,
    amount: string,
    token: string,
    gasPrice: number,
    gasLimit: number,
  ): Promise<SendTokenResponse> {
    try {
      const getGas = await this.commonService.getMinFee();
      if (Number(gasPrice) * Number(gasLimit) < Number(getGas) * 10 ** 9) {
        return {
          statusCode: 404,
          message: 'network.under_price',
          txHash: '',
        };
      }
      const networkData = await this.networkModel.findOne({ key: network });
      if (!networkData) {
        return {
          statusCode: 404,
          message: 'network.not_found',
          txHash: '',
        };
      }

      const findWallet = await this.walletModel.findOne({
        userId,
        address: ethers.utils.getAddress(from),
      });
      if (!findWallet) {
        return {
          statusCode: 404,
          message: 'wallet.data.not_found_wallet',
          txHash: '',
        };
      }

      if (!to) {
        return {
          statusCode: 400,
          message: 'wallet.send.require_to_address',
          txHash: '',
        };
      }
      if (!ethers.utils.isAddress(to)) {
        return {
          statusCode: 400,
          message: 'wallet.send.to_address_wrong_format',
          txHash: '',
        };
      }

      const provider = new ethers.providers.JsonRpcProvider(networkData.rpcUrl);
      const getBalance = await provider.getBalance(from);
      const walletWithKey = new ethers.Wallet(findWallet.privateKey, provider);

      if (token) {
        let tokenFind: any = await this.userTokenModel.findOne({
          network,
          address: token,
        });
        if (!tokenFind) {
          tokenFind = await this.tokenModel.findOne({
            network,
            address: token,
          });
        }
        if (!tokenFind) {
          return {
            statusCode: 404,
            message: 'token.not_found',
            txHash: '',
          };
        }
        const contract = new ethers.Contract(
          token,
          this.TOKEN_ABI,
          walletWithKey,
        );
        const balanceToken = await contract.balanceOf(from);
        console.log('balanceToken', balanceToken);
        if (
          balanceToken.gt(ethers.utils.parseUnits(amount, tokenFind.decimals))
        ) {
          const [estimateGasToken, gasPrice] = await Promise.all([
            contract.estimateGas.transfer(
              to,
              ethers.utils.parseUnits(amount, tokenFind.decimals),
            ),
            provider.getGasPrice(),
          ]);
          if (getBalance.gt(estimateGasToken.mul(gasPrice))) {
            const txDat = await contract.transfer(
              to,
              ethers.utils.parseUnits(amount, tokenFind.decimals),
              {
                gasPrice,
                gasLimit,
              },
            );
            await this.usrHisModel.create({
              userId,
              network,
              action: 'send_token',
              from_address: from,
              to_address: to,
              token,
              symbol: tokenFind.symbol,
              amount,
              data: '',
              txHash: txDat.hash,
              network_fee: ethers.utils.formatEther(
                txDat.gasLimit.mul(txDat.gasPrice),
              ),
            });
            return {
              statusCode: 200,
              txHash: txDat.hash,
              network_fee: ethers.utils.formatEther(
                txDat.gasLimit.mul(txDat.gasPrice),
              ),
            };
          } else {
            return {
              statusCode: 400,
              message: 'wallet.send.not_enough_balance_fee',
              result: '',
            };
          }
        } else {
          return {
            statusCode: 400,
            message: 'wallet.send.token_not_enough_balance',
            result: '',
          };
        }
      } else {
        const txSend = {
          from,
          to,
          value: ethers.utils.parseEther(amount),
          gasPrice,
          gasLimit,
        };
        if (getBalance.gt(txSend.value)) {
          const [estimateSend, gasPrice] = await Promise.all([
            provider.estimateGas(txSend),
            provider.getGasPrice(),
          ]);
          if (getBalance.gt(txSend.value.add(estimateSend.mul(gasPrice)))) {
            const tran = await walletWithKey.sendTransaction(txSend);
            await this.usrHisModel.create({
              userId,
              network,
              action: 'send',
              from_address: from,
              to_address: to,
              token,
              symbol: networkData.symbol,
              amount,
              data: '',
              txHash: tran.hash,
              network_fee: ethers.utils.formatEther(
                tran.gasLimit.mul(tran.gasPrice),
              ),
            });
            return {
              statusCode: 200,
              txHash: tran.hash,
              network_fee: ethers.utils.formatEther(
                tran.gasLimit.mul(tran.gasPrice),
              ),
            };
          } else {
            return {
              statusCode: 400,
              message: 'wallet.send.coin_not_enough_balance_with_fee',
              result: '',
            };
          }
        } else {
          return {
            statusCode: 400,
            message: 'wallet.send.coin_not_enough_balance',
            result: '',
          };
        }
      }
    } catch (error) {
      Logger.error('NetworksService - sendToken', error);
      return {
        statusCode: 500,
        message: 'network.send_token.fail',
        data: [],
      };
    }
  }

  async getHistory(
    network: string,
    from_address: string,
    userId: string,
    page: number,
    limit: number,
  ) {
    if (!Number(page)) page = 1;
    const query = { network, from_address, userId };
    const results = await this.usrHisModel
      .find(query)
      .sort('-createdAt')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    const totalDoc = await this.usrHisModel.countDocuments(query);
    return {
      statusCode: 200,
      data: results.map((item) => ({
        ...item.toJSON(),
        imgUrl: `https://static.openchain.info/hostweb/chain_token/${item.symbol.toLowerCase()}.png`,
      })),
      ...paginate(totalDoc, Number(page), Number(limit), results.length),
    };
    // return this.usrHisModel.find({ network, from_address, userId });
  }

  async getPriceTokenOPC(address: string, provider: any) {
    const networkData = await this.networkModel.findOne({ key: 'opc_mainnet' });
    const USDT_ADDRESS = '0xa1bf5cdb183b69a69B39aB1fA14D6B3A13445aB9';
    if (address.toLowerCase() === USDT_ADDRESS.toLowerCase()) {
      return 1;
    }
    if (networkData) {
      try {
        const swapContract = new ethers.Contract(
          '0x71b8887F93fCC3F40B85F9F5Ab50d8CeEAa31964',
          ROUTER_ABI,
          provider,
        );
        const swapAmount = await swapContract.getAmountsOut(String(10 ** 18), [
          address,
          USDT_ADDRESS,
        ]);
        return ethers.utils.formatEther(swapAmount[1]);
      } catch (error) {
        console.log('getAmountsOut error', error);
        return 0;
      }
    } else {
      return 0;
    }
  }

  async initData() {
    await this.networkModel.findOneAndUpdate(
      { key: 'opc_mainnet' },
      {
        name: 'OPENCHAIN mainnet',
        rpcUrl: 'http://mainnet.openchain.info:8545',
        chainId: '0x309',
        symbol: 'OPC',
        explorer: 'https://openchain.info',
      },
      { upsert: true },
    );
    const tokens_opc = [
      // {
      //   address: '0x425e6AF836f6CDa2A7e668cd9cf30C1C6cFedB65',
      //   name: 'OPC',
      //   symbol: 'OPC',
      //   price: '0.0279115',
      //   decimals: 18,
      // },
      {
        address: '0xa1bf5cdb183b69a69B39aB1fA14D6B3A13445aB9',
        name: 'Tether USD',
        symbol: 'USDT',
        price: '1',
        decimals: 18,
      },
      {
        address: '0x08d149cbdf3d3C216278Ad0e500A5f0B991F1fb5',
        name: 'BUSD Token',
        symbol: 'BUSD',
        price: '1',
        decimals: 18,
      },
      {
        address: '0x1CeE095bd080590bF470f6a6dA939f2c06e2911A',
        name: 'Donate To Earn',
        symbol: 'D2E',
        price: '0.00267',
        decimals: 18,
      },
      {
        address: '0xAC5bDd14e51EB7FbC7EE170d9651e7FcFaD89De3',
        name: 'Ethereum Token',
        symbol: 'ETH',
        price: '2953.8',
        decimals: 18,
      },
      {
        address: '0x65A64825c592Da440E5687d9d39CF266218542F4',
        name: 'PoolSwap Token',
        symbol: 'PS',
        price: '0.00338071',
        decimals: 18,
      },
    ];
    await Promise.each(tokens_opc, async (token) => {
      await this.tokenModel.findOneAndUpdate(
        {
          network: 'opc_mainnet',
          address: token.address.toLowerCase(),
        },
        {
          ...token,
          address: token.address.toLowerCase(),
          type: 'OPC202',
        },
        { upsert: true },
      );
    });

    // BSC
    await this.networkModel.findOneAndUpdate(
      { key: 'bsc_mainnet' },
      {
        name: 'Binance Smart Chain mainnet',
        rpcUrl: 'https://bsc-dataseed.binance.org',
        chainId: '0x38',
        symbol: 'BNB',
        explorer: 'https://bscscan.com',
      },
      { upsert: true },
    );
    const tokens_bsc = [
      {
        address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        name: 'Ethereum Token',
        symbol: 'ETH',
        price: '2953.8',
        decimals: 18,
      },
      {
        address: '0x55d398326f99059ff775485246999027b3197955',
        name: 'Tether USD',
        symbol: 'USDT',
        price: '1',
        decimals: 18,
      },
      {
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        name: 'Wrapped BNB',
        symbol: 'WBNB',
        price: '403.14',
        decimals: 18,
      },
      {
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        name: 'BUSD Token',
        symbol: 'BUSD',
        price: '1',
        decimals: 18,
      },
      {
        address: '0x2859e4544c4bb03966803b044a93563bd2d0dd4d',
        name: 'SHIBA INU',
        symbol: 'SHIB',
        price: '0.00002915',
        decimals: 18,
      },
    ];
    await Promise.each(tokens_bsc, async (token) => {
      await this.tokenModel.findOneAndUpdate(
        {
          network: 'bsc_mainnet',
          address: token.address.toLowerCase(),
        },
        {
          ...token,
          address: token.address.toLowerCase(),
          type: 'BEP20',
        },
        { upsert: true },
      );
    });

    // ETH
    await this.networkModel.findOneAndUpdate(
      { key: 'eth_mainnet' },
      {
        name: 'Ethereum Mainnet',
        rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        chainId: '0x1',
        symbol: 'ETH',
        explorer: 'https://etherscan.io',
      },
      { upsert: true },
    );
    const tokens_eth = [
      {
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        name: 'Tether USD',
        symbol: 'USDT',
        price: '1',
        decimals: 6,
      },
      {
        address: '0xb8c77482e45f1f44de1745f52c74426c631bdd52',
        name: 'BNB',
        symbol: 'BNB',
        price: '403.14',
        decimals: 18,
      },
      {
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        price: '2953.8',
        decimals: 18,
      },
      {
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        name: 'USD Coin',
        symbol: 'USDC',
        price: '1',
        decimals: 6,
      },
      {
        address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
        name: 'SHIBA INU',
        symbol: 'SHIB',
        price: '0.00002915',
        decimals: 18,
      },
    ];
    await Promise.each(tokens_eth, async (token) => {
      await this.tokenModel.findOneAndUpdate(
        {
          network: 'eth_mainnet',
          address: token.address.toLowerCase(),
        },
        {
          ...token,
          address: token.address.toLowerCase(),
          type: 'ERC20',
        },
        { upsert: true },
      );
    });
  }
}
