import {
  Client,
  AccountId,
  PrivateKey,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  Hbar,
  TokenAssociateTransaction,
  TransferTransaction,
} from '@hashgraph/sdk'

// Hedera client configuration
const client = Client.forTestnet()

// Set operator account (you'll need to replace with your testnet account)
const operatorId = AccountId.fromString(process.env.NEXT_PUBLIC_HEDERA_OPERATOR_ID || '0.0.1234')
const operatorKey = PrivateKey.fromString(process.env.HEDERA_OPERATOR_KEY || '')

client.setOperator(operatorId, operatorKey)

export class HederaService {
  static async createFarmToken(
    farmName: string,
    symbol: string,
    totalSupply: number,
    treasuryAccountId: string
  ) {
    try {
      const transaction = new TokenCreateTransaction()
        .setTokenName(`${farmName} Investment Token`)
        .setTokenSymbol(symbol)
        .setTokenType(TokenType.FungibleCommon)
        .setDecimals(2)
        .setInitialSupply(totalSupply)
        .setTreasuryAccountId(treasuryAccountId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(totalSupply)
        .setMaxTransactionFee(new Hbar(100))

      const txResponse = await transaction.execute(client)
      const receipt = await txResponse.getReceipt(client)
      const tokenId = receipt.tokenId

      return {
        success: true,
        tokenId: tokenId?.toString(),
        transactionId: txResponse.transactionId.toString(),
      }
    } catch (error) {
      console.error('Error creating farm token:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  static async associateToken(accountId: string, tokenId: string, accountKey: PrivateKey) {
    try {
      const transaction = new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([tokenId])
        .freezeWith(client)

      const signTx = await transaction.sign(accountKey)
      const txResponse = await signTx.execute(client)
      const receipt = await txResponse.getReceipt(client)

      return {
        success: true,
        status: receipt.status.toString(),
        transactionId: txResponse.transactionId.toString(),
      }
    } catch (error) {
      console.error('Error associating token:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  static async transferTokens(
    tokenId: string,
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    fromAccountKey: PrivateKey
  ) {
    try {
      const transaction = new TransferTransaction()
        .addTokenTransfer(tokenId, fromAccountId, -amount)
        .addTokenTransfer(tokenId, toAccountId, amount)
        .freezeWith(client)

      const signTx = await transaction.sign(fromAccountKey)
      const txResponse = await signTx.execute(client)
      const receipt = await txResponse.getReceipt(client)

      return {
        success: true,
        status: receipt.status.toString(),
        transactionId: txResponse.transactionId.toString(),
      }
    } catch (error) {
      console.error('Error transferring tokens:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

export { client }
