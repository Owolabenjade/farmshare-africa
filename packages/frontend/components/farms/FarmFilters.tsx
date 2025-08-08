'use client'

import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Box,
  Chip,
  FormControlLabel,
  Switch,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { ExpandMore, FilterList } from '@mui/icons-material'
import { FarmFilters as FarmFiltersType } from '@/types/farm'

interface FarmFiltersProps {
  filters: FarmFiltersType
  onFiltersChange: (filters: FarmFiltersType) => void
  onReset: () => void
}

export function FarmFilters({ filters, onFiltersChange, onReset }: FarmFiltersProps) {
  const handleFilterChange = (key: keyof FarmFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const yieldRange = [filters.minYield || 0, filters.maxYield || 50]

  const handleYieldRangeChange = (newValue: number | number[]) => {
    const [min, max] = newValue as number[]
    onFiltersChange({
      ...filters,
      minYield: min,
      maxYield: max
    })
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterList />
            Filters
          </Typography>
          <Button onClick={onReset} size="small">
            Reset All
          </Button>
        </Box>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">Location & Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Region</InputLabel>
                  <Select
                    value={filters.region || 'all'}
                    onChange={(e) => handleFilterChange('region', e.target.value)}
                    label="Region"
                  >
                    <MenuItem value="all">All Regions</MenuItem>
                    <MenuItem value="west-africa">West Africa</MenuItem>
                    <MenuItem value="east-africa">East Africa</MenuItem>
                    <MenuItem value="southern-africa">Southern Africa</MenuItem>
                    <MenuItem value="north-africa">North Africa</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Crop Type</InputLabel>
                  <Select
                    value={filters.cropType || 'all'}
                    onChange={(e) => handleFilterChange('cropType', e.target.value)}
                    label="Crop Type"
                  >
                    <MenuItem value="all">All Crops</MenuItem>
                    <MenuItem value="maize">Maize</MenuItem>
                    <MenuItem value="rice">Rice</MenuItem>
                    <MenuItem value="coffee">Coffee</MenuItem>
                    <MenuItem value="cocoa">Cocoa</MenuItem>
                    <MenuItem value="cassava">Cassava</MenuItem>
                    <MenuItem value="yam">Yam</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">Risk & Returns</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" gutterBottom>
                Expected Yield Range: {yieldRange[0]}% - {yieldRange[1]}%
              </Typography>
              <Slider
                value={yieldRange}
                onChange={(_, newValue) => handleYieldRangeChange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={50}
                step={1}
                marks={[
                  { value: 0, label: '0%' },
                  { value: 25, label: '25%' },
                  { value: 50, label: '50%' }
                ]}
              />
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel>Risk Level</InputLabel>
              <Select
                value={filters.riskLevel || 'all'}
                onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                label="Risk Level"
              >
                <MenuItem value="all">All Risk Levels</MenuItem>
                <MenuItem value="low">Low Risk</MenuItem>
                <MenuItem value="medium">Medium Risk</MenuItem>
                <MenuItem value="high">High Risk</MenuItem>
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">Verification</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={
                <Switch
                  checked={filters.verified || false}
                  onChange={(e) => handleFilterChange('verified', e.target.checked)}
                />
              }
              label="Verified farms only"
            />
          </AccordionDetails>
        </Accordion>

        {/* Active Filters */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Active Filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {filters.region && filters.region !== 'all' && (
              <Chip
                label={`Region: ${filters.region}`}
                onDelete={() => handleFilterChange('region', 'all')}
                size="small"
              />
            )}
            {filters.cropType && filters.cropType !== 'all' && (
              <Chip
                label={`Crop: ${filters.cropType}`}
                onDelete={() => handleFilterChange('cropType', 'all')}
                size="small"
              />
            )}
            {filters.riskLevel && filters.riskLevel !== 'all' && (
              <Chip
                label={`Risk: ${filters.riskLevel}`}
                onDelete={() => handleFilterChange('riskLevel', 'all')}
                size="small"
              />
            )}
            {filters.verified && (
              <Chip
                label="Verified only"
                onDelete={() => handleFilterChange('verified', false)}
                size="small"
              />
            )}
            {(filters.minYield !== undefined || filters.maxYield !== undefined) && (
              <Chip
                label={`Yield: ${filters.minYield || 0}%-${filters.maxYield || 50}%`}
                onDelete={() => {
                  handleFilterChange('minYield', undefined)
                  handleFilterChange('maxYield', undefined)
                }}
                size="small"
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
