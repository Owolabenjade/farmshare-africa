'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  Avatar
} from '@mui/material'
import {
  Close,
  Agriculture,
  TrendingUp,
  Security,
  AccountBalance
} from '@mui/icons-material'
import { Farm } from '@/types/farm'
import { formatCurrency } from '@/lib/utils'

interface InvestmentModalProps {
  open: boolean
  onClose: () => void
  farm: Farm | null
  onInvest: (amount: number, tokenAmount: number) => Promise<void>
  loading: boolean
}

export function InvestmentModal({ open, onClose, farm, onInvest, loading }: InvestmentModalProps) {
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')
  const [error, setError] = useState('')

  if (!farm) return null

  const tokenPrice = parseFloat(farm.tokenPrice || '0')
  const calculatedTokens = investmentAmount ? Math.floor(parseFloat(investmentAmount) / tokenPrice) : 0
  const calculatedAmount = tokenAmount ? parseFloat(tokenAmount) * tokenPrice : 0

  const handleInvestmentAmountChange = (value: string) => {
    setInvestmentAmount(value)
    if (value && tokenPrice > 0) {
      setTokenAmount(Math.floor(parseFloat(value) / tokenPrice).toString())
    }
    setError('')
  }

  const handleTokenAmountChange = (value: string) => {
    setTokenAmount(value)
    if (value && tokenPrice > 0) {
      setInvestmentAmount((parseFloat(value) * tokenPrice).toFixed(4))
    }
    setError('')
  }

  const handleInvest = async () => {
    try {
      if (!investmentAmount || !tokenAmount) {
        setError('Please enter both investment amount and token amount')
        return
      }

      const investment = parseFloat(investmentAmount)
      const tokens = parseInt(tokenAmount)

      if (investment <= 0 || tokens <= 0) {
        setError('Investment amount and token amount must be greater than 0')
        return
      }

      await onInvest(investment, tokens)
      onClose()
      setInvestmentAmount('')
      setTokenAmount('')
    } catch (err: any) {
      setError(err.message || 'Investment failed')
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
      setInvestmentAmount('')
      setTokenAmount('')
      setError('')
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={600}>
          Invest in {farm.name}
        </Typography>
        <Button onClick={handleClose} disabled={loading}>
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent>
        {/* Farm Overview */}
        <Box sx={{ mb: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                src={farm.image}
                sx={{ width: 60, height: 60 }}
              >
                <Agriculture />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" fontWeight={600}>
                {farm.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {farm.cropType} • {farm.location}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label={`${farm.expectedYield.toFixed(1)}% Expected Yield`} size="small" />
                <Chip label={farm.riskLevel.toUpperCase() + ' Risk'} size="small" color={
                  farm.riskLevel === 'low' ? 'success' : farm.riskLevel === 'medium' ? 'warning' : 'error'
                } />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Investment Form */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Investment Amount (HBAR)"
              value={investmentAmount}
              onChange={(e) => handleInvestmentAmountChange(e.target.value)}
              type="number"
              inputProps={{ min: 0, step: 0.0001 }}
              helperText="Minimum investment: 0.001 HBAR"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Token Amount"
              value={tokenAmount}
              onChange={(e) => handleTokenAmountChange(e.target.value)}
              type="number"
              inputProps={{ min: 0, step: 1 }}
              helperText={`Token price: ${tokenPrice.toFixed(4)} HBAR`}
            />
          </Grid>
        </Grid>

        {/* Calculation Summary */}
        {(investmentAmount || tokenAmount) && (
          <Box sx={{ mt: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Investment Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Investment Amount:
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {calculatedAmount.toFixed(4)} HBAR
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Tokens to Receive:
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {calculatedTokens.toLocaleString()} tokens
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Ownership Percentage:
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {farm.maxSupply ? ((calculatedTokens / farm.maxSupply) * 100).toFixed(4) : 0}%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Expected Annual Return:
                </Typography>
                <Typography variant="body1" fontWeight={500} color="success.main">
                  {(calculatedAmount * farm.expectedYield / 100).toFixed(4)} HBAR
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Investment Benefits */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Investment Benefits
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="body2" fontWeight={600}>
                  High Returns
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {farm.expectedYield.toFixed(1)}% expected yield
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Security sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="body2" fontWeight={600}>
                  Blockchain Security
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Smart contract protected
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <AccountBalance sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="body2" fontWeight={600}>
                  Direct Impact
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Support African farmers
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Terms Notice */}
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2">
            By investing, you agree to our terms and conditions. Investments in agricultural projects 
            carry inherent risks including weather, market conditions, and crop failures. Past performance 
            does not guarantee future results.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleInvest}
          disabled={loading || !investmentAmount || !tokenAmount}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          sx={{ minWidth: 120 }}
        >
          {loading ? 'Processing...' : 'Invest Now'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
