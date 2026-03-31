import type { ActionPlanItem } from '../utils/scoring'

interface ActionPlanProps {
  actions: ActionPlanItem[]
}

export default function ActionPlan({ actions }: ActionPlanProps) {
  if (actions.length === 0) return null

  return (
    <div className="mb-8">
      <h3 className="font-semibold text-lg text-black mb-2">Actieplan</h3>
      <p className="text-sm text-body mb-4">
        Op basis van de analyse adviseren wij om met de volgende stappen te beginnen, in volgorde van prioriteit.
      </p>

      <div className="space-y-3">
        {actions.map(item => (
          <div key={item.priority} className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-btn flex items-center justify-center text-white font-bold text-sm">
              {item.priority}
            </div>
            <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                  {item.dimensionLabel}
                </span>
                {item.productLink && (
                  <span className="text-xs text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                    {item.productLink.name}
                  </span>
                )}
              </div>
              <p className="text-sm text-body leading-relaxed">{item.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
