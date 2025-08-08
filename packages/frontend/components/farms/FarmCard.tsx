'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  LinearProgress,
  Avatar,
  IconButton,
  Tooltip,
  Grid
} from '@mui/material'
import {
  LocationOn,
  Schedule,
  TrendingUp,
  Verified,
  FavoriteBorder,
  Share,
  Agriculture,
  Person
} from '@mui/icons-material'
import { Farm, FarmStatus } from '@/types/farm'

interface FarmCardProps {
  farm: Farm
  onInvestClick: () => void
  onFavorite?: () => void
  isFavorited?: boolean
}

export function FarmCard({ farm, onInvestClick, onFavorite, isFavorited = false }: FarmCardProps) {
  const getStatusColor = (status: FarmStatus) => {
    switch (status) {
      case FarmStatus.Pending: return 'warning'
      case FarmStatus.Approved: return 'info'
      case FarmStatus.Funding: return 'primary'
      case FarmStatus.Growing: return 'success'
      case FarmStatus.Completed: return 'default'
      default: return 'default'
    }
  }

  const getStatusText = (status: FarmStatus) => {
    switch (status) {
      case FarmStatus.Pending: return 'Pending Approval'
      case FarmStatus.Approved: return 'Approved'
      case FarmStatus.Funding: return 'Seeking Funding'
      case FarmStatus.Growing: return 'Growing'
      case FarmStatus.Completed: return 'Harvest Complete'
      default: return 'Unknown'
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'success'
      case 'medium': return 'warning'
      case 'high': return 'error'
      default: return 'default'
    }
  }

  const fundingPercentage = farm.fundingProgress || 0
  const canInvest = farm.status === FarmStatus.Funding || farm.status === FarmStatus.Approved

  return (
    <Card
      className="farm-card"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      {/* Farm Image */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={farm.image || '/images/farms/default.jpg'}
          alt={farm.name}
          sx={{ objectFit: 'cover' }}
        />
        
        {/* Status and Actions Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={getStatusText(farm.status)}
              color={getStatusColor(farm.status)}
              size="small"
              sx={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.9)' }}
            />
            {farm.verified && (
              <Chip
                icon={<Verified sx={{ fontSize: 16 }} />}
                label="Verified"
                color="success"
                size="small"
                sx={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.9)' }}
              />
            )}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={onFavorite}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
              }}
            >
              <FavoriteBorder sx={{ fontSize: 18, color: isFavorited ? 'red' : 'inherit' }} />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
              }}
            >
              <Share sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>

        {/* Risk Level Badge */}
        <Box sx={{ position: 'absolute', bottom: 12, right: 12 }}>
          <Chip
            label={`${farm.riskLevel.toUpperCase()} RISK`}
            color={getRiskColor(farm.riskLevel)}
            size="small"
            sx={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255,255,255,0.9)' }}
          />
        </Box>
      </Box>

      {/* Farm Details */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          {farm.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {farm.description || `${farm.cropType} farming operation in ${farm.location}`}
        </Typography>

        {/* Farm Details Grid */}
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Agriculture sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {farm.cropType}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {farm.location}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUp sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {farm.expectedYield.toFixed(1)}% yield
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {farm.farmer.slice(0, 6)}...{farm.farmer.slice(-4)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Funding Progress */}
        {farm.status === FarmStatus.Funding && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight={500}>
                Funding Progress
              </Typography>
              <Typography variant="body2" color="primary.main" fontWeight={600}>
                {fundingPercentage.toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={fundingPercentage}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': { borderRadius: 3 },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {farm.currentFunding || '0'} HBAR raised
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Goal: {farm.fundingGoal} HBAR
              </Typography>
            </Box>
          </Box>
        )}

        {/* Token Information */}
        {farm.tokenPrice && (
          <Box sx={{ mb: 2, p: 1.5, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" fontWeight={500} gutterBottom>
              Investment Details
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Token Price:
              </Typography>
              <Typography variant="caption" fontWeight={500}>
                {parseFloat(farm.tokenPrice).toFixed(4)} HBAR
              </Typography>
            </Box>
            {farm.maxSupply && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  Available:
                </Typography>
                <Typography variant="caption" fontWeight={500}>
                  {(farm.maxSupply - (farm.currentSupply || 0)).toLocaleString()} tokens
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>

      {/* Action Buttons */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={onInvestClick}
          disabled={!canInvest}
          sx={{ py: 1.5, fontWeight: 600, textTransform: 'none' }}
        >
          {canInvest ? 'Invest Now' : 'Not Available'}
        </Button>
      </CardActions>
    </Card>
  )
}
