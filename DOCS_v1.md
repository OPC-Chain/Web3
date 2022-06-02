## RPC URL
https://wallet-rpc.openchain.info/json-rpc
ALL POST

## Account
### NEW
- body: {"jsonrpc": "2.0", "method": "user.new", "id": 2, "params": {"password": "12345678"}}
- required "params": {"password": "12345678"}
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "UUID": "d8f6021b-3770-4a1e-b4ba-e5d9866aa9ce",
    "token": "xxx"
  },
  "id": 2
}
+ UUID: save in extension to define and login again
+ token: use to add header in request below

### RESTORE
- body: {
  "jsonrpc": "2.0",
  "method": "user.restore",
  "id": 2,
  "params": {
    "password": "12345678",
    "passPhase": "abc def ghk jml ..."
  }
}
- required "params": {"password": "12345678", "passPhase": "abc def ghk jml ..."}
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "UUID": "d8f6021b-3770-4a1e-b4ba-e5d9866aa9ce",
    "token": "xxx"
  },
  "id": 2
}
+ UUID: save in extension to define and login again
+ token: use to add header in request below

### LOGIN
- body: {"jsonrpc": "2.0", "method": "user.verify", "id": 2, "params": {"UUID": "d8f6021b-3770-4a1e-b4ba-e5d9866aa9ce", "password": "12345678"}}
- required "params": {"UUID": "d8f6021b-3770-4a1e-b4ba-e5d9866aa9ce", "password": "12345678"}
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "UUID": "d8f6021b-3770-4a1e-b4ba-e5d9866aa9ce",
    "token": "xxx",
    "numberWallets: 0
  },
  "id": 2
}

## Wallet
- Note: All require token above in header
Authorization: Bearer ${token}

### CREATE
- body: {"jsonrpc": "2.0", "method": "wallet.add", "id": 2, "params": {"name": "Main Wallet"}}
- required "params": {"name": "Main Wallet"}
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "address": "0x6466e16D3784978A8A67de92Fb5a91D0B7022eac",
    "privateKey": "0x12345678",
    "passPhase": "abc def ghk jml ...",
    "name": "Main Wallet"
  },
  "id": 2
}

### RESTORE from phrase
- body: {"jsonrpc": "2.0", "method": "wallet.restore", "id": 2, "params": {"name": "Main Wallet", "passPhase": "abc def ghk jml ..."}}
- required "params": name and passPhase
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "address": "0x6466e16D3784978A8A67de92Fb5a91D0B7022eac",
    "privateKey": "0x12345678",
    "passPhase": "abc def ghk jml ...",
    "name": "Main Wallet"
  },
  "id": 2
}
### RESTORE from privateKey
- body: {"jsonrpc": "2.0", "method": "wallet.restore-private", "id": 2, "params": {"name": "Main Wallet", "privateKey": "0x12345678"}}
- required "params": name and passPhase
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "address": "0x6466e16D3784978A8A67de92Fb5a91D0B7022eac",
    "privateKey": "0x12345678",
    "passPhase": "",
    "name": "Main Wallet"
  },
  "id": 2
}

### EDIT NAME
- body: {
  "jsonrpc": "2.0",
  "method": "wallet.edit",
  "id": 2,
  "params": {
    "address": "0x6466e16D3784978A8A67de92Fb5a91D0B7022eac",
    "name": "New Name Wallet"
  }
}
- required "params": {"address": "0x6466e16D3784978A8A67de92Fb5a91D0B7022eac", "name": "New Name Wallet"}
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "address": "0x6466e16D3784978A8A67de92Fb5a91D0B7022eac",
    "name": "New Name Wallet"
  },
  "id": 2
}

### REMOVE
- body: {
  "jsonrpc": "2.0",
  "method": "wallet.remove",
  "id": 2,
  "params": {
    "address": "0x6466e16D3784978A8A67de92Fb5a91D0B7022eac",
    "name": "New Name Wallet"
  }
}
- required "params": {"address": "0x6466e16D3784978A8A67de92Fb5a91D0B7022eac"}
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "address": "0x6466e16D3784978A8A67de92Fb5a91D0B7022eac",
    "name": "New Name Wallet"
  },
  "id": 2
}

### LIST
- body: {"jsonrpc": "2.0", "method": "wallet.list", "id": 2}
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "data": [
      {
        "_id": "61eb874973834cb50a3bd99f",
        "name": "test-wall",
        "address": "0x19EDe1977c27C202ABE34A162Cb186E1F0Ef2c08"
      },
      {
        "_id": "61eb87a673834cb50a3bd9a1",
        "name": "test-wall1",
        "address": "0x24f4050a8E7d4432DBdBE1E71D18f6e839cC1F3C"
      },
      {
        "_id": "61eb8e291addd8bbbd01c637",
        "name": "test-wall1",
        "address": "0xd39CCC2365BABbD99413E135601203f6C64fb6eC"
      },
      {
        "_id": "61ebbd8a727eb1b4cb0c7c65",
        "name": "Main Wallet",
        "address": "0x6466e16D3784978A8A67de92Fb5a91D0B7022eac"
      }
    ]
  },
  "id": 2
}

### REVEAL SECRET
- body: {
  "jsonrpc": "2.0",
  "method": "wallet.reveal",
  "id": 2,
  "params": {
    "address": "0x19EDe1977c27C202ABE34A162Cb186E1F0Ef2c08",
    "type": "passPhase",
    "password": "12345678"
  }
}
- required "params": {"address": "0x19EDe1977c27C202ABE34A162Cb186E1F0Ef2c08", "type": "passPhase"}
+ type: passPhase(12 phrase) or privateKey

- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "result": "abc def ghk jml ..."
  },
  "id": 2
}


## Networks
- body: {"jsonrpc": "2.0", "method": "networks.list", "id": 2}
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "data": [
      {
        "key": "opc_mainnet",
        "chainId": "0x309",
        "explorer": "https://openchain.info",
        "name": "OPENCHAIN mainnet",
        "rpcUrl": "http://mainnet.openchain.info:8545",
        "symbol": "OPC"
      },
      {
        "key": "bsc_mainnet",
        "chainId": "0x38",
        "explorer": "https://bscscan.com",
        "name": "Binance Smart Chain mainnet",
        "rpcUrl": "https://bsc-dataseed.binance.org",
        "symbol": "BNB"
      },
      {
        "key": "eth_mainnet",
        "chainId": "0x1",
        "explorer": "https://etherscan.io",
        "name": "Ethereum Mainnet",
        "rpcUrl": "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        "symbol": "ETH"
      }
    ]
  },
  "id": 2
}

## Tokens
- note: get available tokens
- body: {"jsonrpc": "2.0", "method": "networks.tokens", "id": 2}
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "data": [
      {
        "address": "0x55d398326f99059ff775485246999027b3197955",
        "network": "bsc_mainnet",
        "decimals": 18,
        "name": "Tether USD",
        "symbol": "USDT",
        "type": "BEP20"
      },
      {
        "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "network": "eth_mainnet",
        "decimals": 6,
        "name": "Tether USD",
        "symbol": "USDT",
        "type": "ERC20"
      },
      {
        "address": "0xa1bf5cdb183b69a69b39ab1fa14d6b3a13445ab9",
        "network": "opc_mainnet",
        "decimals": 18,
        "name": "Tether USD",
        "symbol": "USDT",
        "type": "OPC202"
      },
    ]
  },
  "id": 2
}

### Get token info
- body: {
  "jsonrpc": "2.0",
  "method": "networks.get-token-info",
  "params": {
    "address": "0x55d398326f99059ff775485246999027b3197955",
    "network": "bsc_mainnet"
  },
  "id": 2
}
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "data": {
      "address": "0x55d398326f99059ff775485246999027b3197955",
      "network": "bsc_mainnet",
      "decimals": 18,
      "name": "Tether USD",
      "symbol": "USDT",
      "type": "OPC202"
    }
  },
  "id": 2
}

### User add token (above or custom) to assets
- body: {
  "jsonrpc": "2.0",
  "method": "networks.add-token",
  "params": {
    "address": "0x55d398326f99059ff775485246999027b3197955",
    "network": "bsc_mainnet",
    "decimals": 18,
    "name": "Tether USD",
    "symbol": "USDT",
    "type": "BEP20"
  },
  "id": 2
}
- required "params" as above
- required "params"

### Get balances
- body: {
  "jsonrpc": "2.0",
  "method": "networks.get-balances",
  "params": {
    "network": "bsc_mainnet",
    "address": "0x3615cb0ff031D23A85709C1dD4CDDD8008d35b67"
  },
  "id": 2
}
- required "params": network and balance
- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "network_balance": "0.008897381759873577",
    "network_symbol": "BNB",
    "data": [
      {
        "address": "0xa1bf5cdb183b69a69B39aB1fA14D6B3A13445aB9",
        "network": "opc_mainnet",
        "decimals": 18,
        "name": "Tether USD",
        "symbol": "USDT",
        "type": "OPC202",
        "balance": 0,
        "price": 1,
        "imgUrl": "https://static.openchain.info/hostweb/chain_token/usdt.png"
      },
      {
        "address": "0x08d149cbdf3d3C216278Ad0e500A5f0B991F1fb5",
        "network": "opc_mainnet",
        "decimals": 18,
        "name": "BUSD Token",
        "symbol": "BUSD",
        "type": "OPC202",
        "balance": 0,
        "price": 1,
        "imgUrl": "https://static.openchain.info/hostweb/chain_token/busd.png"
      },
    ]
  },
  "id": 2
}

### Get gas price and gas limit when token
- body: {
  "jsonrpc": "2.0",
  "method": "networks.estimate-fee",
  "params": {
    "network": "opc_mainnet",
    "from_address": "0x3615cb0ff031D23A85709C1dD4CDDD8008d35b67",
    "to_address": "0x3615cb0ff031D23A85709C1dD4CDDD8008d35b67",
    "amount": "2",
    "token": "" // is address of token, if not provide is send coin of network (ETH, BNB, OPC)
  },
  "id": 2
}
- required "params" as above

- response: {
  "jsonrpc": "2.0",
  "result": {
    "status": 200,
    "txHash": "",
    "network_fee": ""
  },
  "id": 2
}

### Send token
- body: {
  "jsonrpc": "2.0",
  "method": "networks.send-token",
  "params": {
    "network": "opc_mainnet",
    "from_address": "0x3615cb0ff031D23A85709C1dD4CDDD8008d35b67",
    "to_address": "0x3615cb0ff031D23A85709C1dD4CDDD8008d35b67",
    "amount": "2",
    "token": "", // is address of token, if not provide is send coin of network (ETH, BNB, OPC)
    "gasPrice": 1,
    "gasLimit": 21000
  },
  "id": 2
}
- required "params" as above

- response: {
  "jsonrpc": "2.0",
  "result": {
    "status": 200,
    "txHash": "",
    "network_fee": ""
  },
  "id": 2
}

### Get history
- body: {
  "jsonrpc": "2.0",
  "method": "networks.get-history",
  "params": {
    "network": "bsc_mainnet",
    "address": "0x3615cb0ff031D23A85709C1dD4CDDD8008d35b67",
    "page": 1,
    "limit": 10
  },
  "id": 2
}
- required "params" as above

- response: {
  "jsonrpc": "2.0",
  "result": {
    "statusCode": 200,
    "data": [
      {
        "_id": "6200e9624f5cd7818027d1d5",
        "createdAt": 1644226887331,
        "network_fee": "0.000159515",
        "txHash": "0x732a68fa97ca1f6d89983071258e71bb68f4506338fb332112bc948ee810036a",
        "data": "",
        "amount": "2",
        "symbol": "USDT",
        "token": "0x55d398326f99059ff775485246999027b3197955",
        "to_address": "0x3615cb0ff031D23A85709C1dD4CDDD8008d35b67",
        "from_address": "0x3615cb0ff031D23A85709C1dD4CDDD8008d35b67",
        "action": "send_token", // send, send_token, call_contract
        "network": "bsc_mainnet",
        "userId": "61ebbce0727eb1b4cb0c7c62"
      }
    ],
    "total": 1,
    "currentPage": 1,
    "count": 1,
    "lastPage": 1,
    "firstItem": 0,
    "lastItem": 0,
    "perPage": 10
  },
  "id": 2
}

### Connect
- body: {
    "jsonrpc": "2.0",
    "method": "connection.connect",
    "id": 2,
    "params": {
        "baseUrl": "https://pancakeswap.finance/farms"
    }
}
- required "params": { "baseUrl": "https://pancakeswap.finance/farms"}

- response: {
    "jsonrpc": "2.0",
    "result": {
        "statusCode": 200,
        "data": {
            "createdAt": 1646114859909,
            "baseUrl": "https://pancakeswap.finance",
            "userId": "61ebbce0727eb1b4cb0c7c62",
            "_id": "621dbd0ba9906734b72e3012"
        }
    },
    "id": 2
}

### Disconnect
- body: {
    "jsonrpc": "2.0",
    "method": "connection.disconnect",
    "id": 2,
    "params": {
        "baseUrl": "https://pancakeswap.finance/farms"
    }
}
- required "params": { "baseUrl": "https://pancakeswap.finance/farms"}

- response: {
    "jsonrpc": "2.0",
    "result": {
        "statusCode": 200,
        "data": {
            "_id": "621dbd0ba9906734b72e3012",
            "createdAt": 1646114859909,
            "baseUrl": "https://pancakeswap.finance",
            "userId": "61ebbce0727eb1b4cb0c7c62"
        }
    },
    "id": 2
}

### Get connection

- body: {
    "jsonrpc": "2.0",
    "method": "connection.get-connection",
    "id": 2,
    "params": {
        "baseUrl": "https://poolswap.ai/nbn/bmbn"
    }
}
- required "params": { "baseUrl": "https://pancakeswap.finance/farms"}

- response: {
    "jsonrpc": "2.0",
    "result": {
        "statusCode": 200,
        "data": {
            "_id": "6200e08359cc8f402ef6c5f6",
            "createdAt": 1643360981742,
            "userId": "61ebbce0727eb1b4cb0c7c62",
            "name": "main_test",
            "address": "0x3615cb0ff031D23A85709C1dD4CDDD8008d35b67"
        }
    },
    "id": 2
}