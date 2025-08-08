'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

// Add these imports at the top
import { useContract } from '@/hooks/use-contract'
import { useWallet } from '@/hooks/use-wallet'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function FarmerOnboarding() {
  const [step, setStep] = useState(1)

  // Add state for form data and submission
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    cropType: '',
    farmSize: '',
    description: '',
    fundingGoal: '',
    tokenPrice: '',
    expectedReturn: '',
    harvestDate: '',
    businessPlan: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean
    transactionId?: string
    error?: string
  } | null>(null)

  const { createFarmToken, isLoading } = useContract()
  const { isConnected } = useWallet()

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  // Add form submission handler
  const handleSubmit = async () => {
    if (!isConnected) {
      setSubmissionResult({
        success: false,
        error: 'Please connect your wallet to submit'
      })
      return
    }

    setIsSubmitting(true)
    setSubmissionResult(null)

    try {
      const totalSupply = Math.floor(parseFloat(formData.fundingGoal) / parseFloat(formData.tokenPrice))
      
      const result = await createFarmToken({
        name: formData.farmName,
        totalSupply,
        tokenPrice: parseFloat(formData.tokenPrice),
        expectedReturn: parseFloat(formData.expectedReturn),
        harvestDate: new Date(formData.harvestDate)
      })

      setSubmissionResult({
        success: true,
        transactionId: result.transactionId
      })
    } catch (error) {
      setSubmissionResult({
        success: false,
        error: error instanceof Error ? error.message : 'Submission failed'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Farm Registration - Step {step} of 3</CardTitle>
        <CardDescription>
          {step === 1 && "Tell us about your farm"}
          {step === 2 && "Financial details and projections"}
          {step === 3 && "Review and submit"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmName">Farm Name</Label>
                <Input id="farmName" placeholder="Enter farm name" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kenya">Kenya</SelectItem>
                    <SelectItem value="nigeria">Nigeria</SelectItem>
                    <SelectItem value="ghana">Ghana</SelectItem>
                    <SelectItem value="uganda">Uganda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cropType">Primary Crop</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="cassava">Cassava</SelectItem>
                    <SelectItem value="cocoa">Cocoa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="farmSize">Farm Size (acres)</Label>
                <Input id="farmSize" type="number" placeholder="Enter size" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Farm Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your farming operations, experience, and goals"
                rows={4}
              />
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fundingGoal">Funding Goal ($)</Label>
                <Input id="fundingGoal" type="number" placeholder="50000" />
              </div>
              <div>
                <Label htmlFor="tokenPrice">Token Price ($)</Label>
                <Input id="tokenPrice" type="number" placeholder="20" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectedReturn">Expected Return (%)</Label>
                <Input id="expectedReturn" type="number" placeholder="12" />
              </div>
              <div>
                <Label htmlFor="harvestDate">Expected Harvest</Label>
                <Input id="harvestDate" type="date" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="businessPlan">Business Plan</Label>
              <Textarea 
                id="businessPlan" 
                placeholder="Describe your farming plan, expected yields, market strategy, and risk management"
                rows={4}
              />
            </div>
          </div>
        )}
        
        {step === 3 && !submissionResult && (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-4">Farm Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Farm Name:</p>
                  <p className="font-medium">Sunrise Maize Farm</p>
                </div>
                <div>
                  <p className="text-gray-600">Location:</p>
                  <p className="font-medium">Kenya</p>
                </div>
                <div>
                  <p className="text-gray-600">Funding Goal:</p>
                  <p className="font-medium">$50,000</p>
                </div>
                <div>
                  <p className="text-gray-600">Expected Return:</p>
                  <p className="font-medium">12%</p>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="mb-2">By submitting this application, you agree to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Provide accurate and truthful information</li>
                <li>Regular updates on farm progress</li>
                <li>Transparent reporting of harvest proceeds</li>
                <li>Platform terms and conditions</li>
              </ul>
            </div>
          </div>
        )}

        {step === 3 && submissionResult && (
          <div className="space-y-6">
            {submissionResult.success ? (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <div className="space-y-2">
                    <p className="font-semibold">Farm successfully listed!</p>
                    <p>Your farm token has been created on the blockchain.</p>
                    {submissionResult.transactionId && (
                      <p className="text-xs font-mono">
                        Transaction ID: {submissionResult.transactionId}
                      </p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {submissionResult.error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
        
        <div className="flex justify-between pt-6">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          
          {step < 3 ? (
            <Button onClick={nextStep} className="ml-auto bg-green-600 hover:bg-green-700">
              Next
            </Button>
          ) : !submissionResult ? (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !isConnected}
              className="ml-auto bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Farm Token...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          ) : submissionResult.success ? (
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              className="ml-auto bg-green-600 hover:bg-green-700"
            >
              View Dashboard
            </Button>
          ) : (
            <Button 
              onClick={() => setSubmissionResult(null)}
              className="ml-auto"
              variant="outline"
            >
              Try Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
