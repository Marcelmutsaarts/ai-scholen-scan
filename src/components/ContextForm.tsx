import { contextFields } from '../data/questions'

interface ContextFormProps {
  data: Record<string, string | string[]>
  onChange: (id: string, value: string | string[]) => void
  onNext: () => void
}

export default function ContextForm({ data, onChange, onNext }: ContextFormProps) {
  const isValid = contextFields
    .filter(f => f.required)
    .every(f => {
      const val = data[f.id]
      return val && (typeof val === 'string' ? val.trim() !== '' : val.length > 0)
    })

  return (
    <div className="animate-fade-in max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-black">Over jullie school</h2>
        <p className="text-body">
          Deze gegevens helpen ons de resultaten in context te plaatsen. Ze worden niet gescoord.
        </p>
      </div>

      <div className="space-y-5">
        {contextFields.map(field => (
          <div key={field.id} className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {field.label}
              {field.required && <span className="text-purple-400 ml-1">*</span>}
            </label>

            {field.type === 'text' && (
              <input
                type="text"
                value={(data[field.id] as string) || ''}
                onChange={e => onChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              />
            )}

            {field.type === 'number' && (
              <input
                type="number"
                value={(data[field.id] as string) || ''}
                onChange={e => onChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              />
            )}

            {field.type === 'select' && (
              <select
                value={(data[field.id] as string) || ''}
                onChange={e => onChange(field.id, e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition bg-white"
              >
                <option value="">Selecteer...</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {field.type === 'radio' && (
              <div className="flex gap-4">
                {field.options?.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={field.id}
                      value={opt}
                      checked={data[field.id] === opt}
                      onChange={() => onChange(field.id, opt)}
                      className="accent-purple-400"
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {field.type === 'multiselect' && (
              <div className="flex flex-wrap gap-2">
                {field.options?.map(opt => {
                  const selected = ((data[field.id] as string[]) || []).includes(opt)
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        const current = (data[field.id] as string[]) || []
                        if (selected) {
                          onChange(field.id, current.filter(v => v !== opt))
                        } else {
                          onChange(field.id, [...current, opt])
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm border transition cursor-pointer ${
                        selected
                          ? 'bg-purple-400 text-white border-purple-400'
                          : 'bg-white text-body border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`gradient-btn text-white font-medium px-6 py-2.5 rounded-lg transition-all cursor-pointer ${
            !isValid ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
          }`}
        >
          Volgende
        </button>
      </div>
    </div>
  )
}
