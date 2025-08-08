export function Stats() {
  const stats = [
    { label: 'Farms Listed', value: '150+' },
    { label: 'Total Investment', value: '$2.5M' },
    { label: 'Active Investors', value: '1,200+' },
    { label: 'Countries', value: '8' }
  ]

  return (
    <section className="py-16 bg-green-600">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-green-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
