'use client'

import {
  CurrencyDollarIcon,
  ClockIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline'

interface KPICardProps {
  title: string
  value: string
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  color?: 'primary' | 'success' | 'warning' | 'error'
}

function KPICard({ title, value, change, changeType, icon: Icon, color = 'primary' }: KPICardProps) {
  const getTrendIcon = () => {
    if (changeType === 'increase') {
      return <ArrowTrendingUpIcon className="h-4 w-4 text-success-600" />
    } else if (changeType === 'decrease') {
      return <ArrowTrendingDownIcon className="h-4 w-4 text-error-600" />
    }
    return null
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-success-600'
      case 'decrease':
        return 'text-error-600'
      default:
        return 'text-gray-500'
    }
  }

  const getIconBackground = () => {
    switch (color) {
      case 'success':
        return 'bg-success-50'
      case 'warning':
        return 'bg-warning-50'
      case 'error':
        return 'bg-error-50'
      default:
        return 'bg-primary-50'
    }
  }

  const getIconColor = () => {
    switch (color) {
      case 'success':
        return 'text-success-600'
      case 'warning':
        return 'text-warning-600'
      case 'error':
        return 'text-error-600'
      default:
        return 'text-primary-600'
    }
  }

  return (
    <div className="card card-elevated p-6 group hover:scale-105 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl ${getIconBackground()}`}>
              <Icon className={`h-6 w-6 ${getIconColor()}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {title}
              </p>
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {value}
            </p>
            <div className={`flex items-center text-sm font-medium ${getChangeColor()}`}>
              {getTrendIcon()}
              <span className="ml-1">{change}</span>
            </div>
          </div>
          
          <div className="mt-2">
            <span className="text-xs text-gray-500">vs previous period</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function KPIGrid() {
  const kpis = [
    {
      title: 'Total Budget',
      value: '$2.4M',
      change: '+12%',
      changeType: 'increase' as const,
      icon: CurrencyDollarIcon,
      color: 'success' as const,
    },
    {
      title: 'Avg Project Duration',
      value: '4.2 months',
      change: '-8%',
      changeType: 'decrease' as const,
      icon: ClockIcon,
      color: 'warning' as const,
    },
    {
      title: 'Team Utilization',
      value: '87%',
      change: '+5%',
      changeType: 'increase' as const,
      icon: UsersIcon,
      color: 'primary' as const,
    },
    {
      title: 'Performance Index',
      value: '0.94',
      change: '+2%',
      changeType: 'increase' as const,
      icon: ChartBarIcon,
      color: 'success' as const,
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Key Performance Indicators</h2>
        <p className="text-gray-600">Real-time overview of your project portfolio performance</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <KPICard
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              changeType={kpi.changeType}
              icon={kpi.icon}
              color={kpi.color}
            />
          </div>
        ))}
      </div>
    </div>
  )
} 