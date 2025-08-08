'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { ethers } from 'ethers'
import { Client, AccountId, PrivateKey, Hbar } from '@hashgraph/sdk'
import toast from 'react-hot-toast'

export interface WalletState {
  isConnected: boolean
  account: string | null
  balance: string
  chainId: number | null
  isLoading: boolean
  provider: ethers.BrowserProvider | null
  signer: ethers.Signer | null
  hederaClient: Client | null
}

export interface WalletActions {
  connect: () => Promise<void>
  disconnect: () => void
  switchNetwork: () => Promise<void>
  getBalance: () => Promise<string>
  signMessage: (message: string) => Promise<string>
  sendTransaction: (to: string, value: string) => Promise<string>
}

type WalletContextType = WalletState & WalletActions

const WalletContext = createContext<WalletContextType | null>(null)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

declare global {
  interface Window {
    ethereum?: any
  }
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    account: null,
    balance: '0',
    chainId: null,
    isLoading: false,
    provider: null,
    signer: null,
    hederaClient: null,
  })

  const HEDERA_TESTNET_CHAIN_ID = 296
  const HEDERA_MAINNET_CHAIN_ID = 295
  const TARGET_CHAIN_ID = process.env.NEXT_PUBLIC_HEDERA_NETWORK === 'mainnet' 
    ? HEDERA_MAINNET_CHAIN_ID 
    : HEDERA_TESTNET_CHAIN_ID

  // Initialize Hedera client
  const initializeHederaClient = () => {
    try {
      const client = process.env.NEXT_PUBLIC_HEDERA_NETWORK === 'mainnet'
        ? Client.forMainnet()
        : Client.forTestnet()
      
      setState(prev => ({ ...prev, hederaClient: client }))
    } catch (error) {
      console.error('Failed to initialize Hedera client:', error)
    }
  }

  const updateBalance = async (address: string, provider: ethers.BrowserProvider) => {
    try {
      const balance = await provider.getBalance(address)
      const formattedBalance = ethers.formatEther(balance)
      setState(prev => ({ ...prev, balance: formattedBalance }))
      return formattedBalance
    } catch (error) {
      console.error('Error fetching balance:', error)
      return '0'
    }
  }

  const connect = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }))
      
      if (!window.ethereum) {
        throw new Error('Please install MetaMask or HashPack wallet')
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found')
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const network = await provider.getNetwork()
      
      setState(prev => ({
        ...prev,
        isConnected: true,
        account: accounts[0],
        chainId: Number(network.chainId),
        provider,
        signer,
      }))

      // Update balance
      await updateBalance(accounts[0], provider)

      // Check network and switch if needed
      if (Number(network.chainId) !== TARGET_CHAIN_ID) {
        await switchNetwork()
      } else {
        toast.success('Wallet connected successfully!')
      }

    } catch (error: any) {
      console.error('Error connecting wallet:', error)
      toast.error(error.message || 'Failed to connect wallet')
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const disconnect = () => {
    setState({
      isConnected: false,
      account: null,
      balance: '0',
      chainId: null,
      isLoading: false,
      provider: null,
      signer: null,
      hederaClient: state.hederaClient, // Keep Hedera client
    })
    toast.success('Wallet disconnected')
  }

  const switchNetwork = async () => {
    try {
      if (!window.ethereum) return

      const isMainnet = process.env.NEXT_PUBLIC_HEDERA_NETWORK === 'mainnet'
      const chainId = isMainnet ? HEDERA_MAINNET_CHAIN_ID : HEDERA_TESTNET_CHAIN_ID
      const networkName = isMainnet ? 'Hedera Mainnet' : 'Hedera Testnet'
      const rpcUrl = isMainnet 
        ? 'https://mainnet.hashio.io/api' 
        : 'https://testnet.hashio.io/api'
      const explorerUrl = isMainnet 
        ? 'https://hashscan.io/mainnet' 
        : 'https://hashscan.io/testnet'

      try {
        // Try to switch to the network
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        })
        
        toast.success(`Switched to ${networkName}`)
      } catch (switchError: any) {
        // Network doesn't exist, add it
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: `0x${chainId.toString(16)}`,
                chainName: networkName,
                nativeCurrency: {
                  name: 'HBAR',
                  symbol: 'HBAR',
                  decimals: 18,
                },
                rpcUrls: [rpcUrl],
                blockExplorerUrls: [explorerUrl],
              }],
            })
            
            toast.success(`Added and switched to ${networkName}`)
          } catch (addError) {
            console.error('Error adding network:', addError)
            throw new Error('Failed to add Hedera network')
          }
        } else {
          throw switchError
        }
      }
    } catch (error: any) {
      console.error('Error switching network:', error)
      toast.error(error.message || 'Failed to switch network')
      throw error
    }
  }

  const getBalance = async (): Promise<string> => {
    if (!state.provider || !state.account) {
      return '0'
    }
    return updateBalance(state.account, state.provider)
  }

  const signMessage = async (message: string): Promise<string> => {
    if (!state.signer) {
      throw new Error('Wallet not connected')
    }
    
    try {
      const signature = await state.signer.signMessage(message)
      return signature
    } catch (error: any) {
      console.error('Error signing message:', error)
      throw new Error(error.message || 'Failed to sign message')
    }
  }

  const sendTransaction = async (to: string, value: string): Promise<string> => {
    if (!state.signer) {
      throw new Error('Wallet not connected')
    }
    
    try {
      const tx = await state.signer.sendTransaction({
        to,
        value: ethers.parseEther(value)
      })
      
      toast.loading('Transaction pending...', { id: tx.hash })
      const receipt = await tx.wait()
      
      if (receipt?.status === 1) {
        toast.success('Transaction confirmed!', { id: tx.hash })
      } else {
        toast.error('Transaction failed!', { id: tx.hash })
      }
      
      return tx.hash
    } catch (error: any) {
      console.error('Error sending transaction:', error)
      toast.error(error.message || 'Transaction failed')
      throw error
    }
  }

  // Listen for account and network changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect()
        } else if (accounts[0] !== state.account) {
          setState(prev => ({ ...prev, account: accounts[0] }))
          if (state.provider) {
            updateBalance(accounts[0], state.provider)
          }
        }
      }

      const handleChainChanged = (chainId: string) => {
        const newChainId = parseInt(chainId, 16)
        setState(prev => ({ ...prev, chainId: newChainId }))
        
        // Reload page when network changes for consistency
        window.location.reload()
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            const provider = new ethers.BrowserProvider(window.ethereum!)
            provider.getSigner().then(signer => {
              provider.getNetwork().then(network => {
                setState(prev => ({
                  ...prev,
                  isConnected: true,
                  account: accounts[0],
                  chainId: Number(network.chainId),
                  provider,
                  signer,
                }))
                updateBalance(accounts[0], provider)
              })
            })
          }
        })
        .catch(console.error)

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
          window.ethereum.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
  }, [])

  // Initialize Hedera client on mount
  useEffect(() => {
    initializeHederaClient()
  }, [])

  const contextValue: WalletContextType = {
    ...state,
    connect,
    disconnect,
    switchNetwork,
    getBalance,
    signMessage,
    sendTransaction,
  }

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}
