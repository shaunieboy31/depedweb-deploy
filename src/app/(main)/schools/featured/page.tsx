export default function FeaturedSchools() {
  const featuredSchools = [
    {
      name: 'Imus National High School (INHS)',
      achievement: 'Best Brigada Eskwela Implementer (Mega School Category)',
      description: 'Named by the Region as Best Brigada Eskwela Implementer in two consecutive years and awarded as a National Implementer in Puerto Princesa, Palawan (2017) and Dipolog, Zamboanga del Norte (2018).',
      highlights: ['Two-time Regional Awardee', 'National Implementer', 'Excellence in Community Service']
    },
    {
      name: 'Imus Central Elementary School',
      achievement: 'Outstanding Learning Outcomes',
      description: 'Consistently achieves high performance in national achievement tests and produces well-rounded learners.',
      highlights: ['High NAT Scores', 'Character Development', 'Community Engagement']
    },
    {
      name: 'Imus East National High School',
      achievement: 'Innovation in Education',
      description: 'Pioneer in integrating technology and innovative teaching methodologies in the division.',
      highlights: ['Tech-Enhanced Classrooms', 'STEM Programs', 'Digital Learning']
    },
  ];

  return (
    <div className="w-full">
      <section className="px-4 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Featured Schools</h1>
          <p className="text-lg text-gray-700 mb-12">
            Celebrating schools with outstanding achievements and contributions
          </p>

          <div className="space-y-8">
            {featuredSchools.map((school, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
                  <h3 className="text-2xl font-bold">{school.name}</h3>
                  <p className="text-blue-100 mt-2">🏆 {school.achievement}</p>
                </div>
                <div className="p-8">
                  <p className="text-gray-700 mb-6">{school.description}</p>
                  
                  <div>
                    <p className="font-bold text-gray-900 mb-3">Key Highlights:</p>
                    <div className="flex flex-wrap gap-3">
                      {school.highlights.map((highlight, hIndex) => (
                        <span key={hIndex} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Share Your School's Story</h2>
            <p className="text-gray-700">
              If your school has outstanding achievements or programs you'd like to share, please contact us at sgod.imus@deped.gov.ph
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
