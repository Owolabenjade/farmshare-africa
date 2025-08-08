import { FarmerOnboarding } from '@/components/farmer-onboarding'

export default function FarmersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">List Your Farm</h1>
          <p className="mt-4 text-lg text-gray-600">
            Raise capital for your farming operations by tokenizing your farm
          </p>
        </div>
        
        <FarmerOnboarding />
      </div>
    </div>
  )
}
