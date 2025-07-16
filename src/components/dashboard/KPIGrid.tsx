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
}

function KPICard({ title, value, change, changeType, icon: Icon }: KPICardProps) {
  const getTrendIcon = () => {
    if (changeType === 'increase') {
      return <ArrowTrendingUpIcon className="h-4 w-4 text-status-green" />
    } else if (changeType === 'decrease') {
      return <ArrowTrendingDownIcon className="h-4 w-4 text-status-red" />
    }
    return null
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-status-green'
      case 'decrease':
        return 'text-status-red'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="card p-6 card-hover">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        <div className={`flex items-center text-sm ${getChangeColor()}`}>
          {getTrendIcon()}
          <span className="ml-1">{change}</span>
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
    },
    {
      title: 'Avg Project Duration',
      value: '4.2 months',
      change: '-8%',
      changeType: 'decrease' as const,
      icon: ClockIcon,
    },
    {
      title: 'Team Utilization',
      value: '87%',
      change: '+5%',
      changeType: 'increase' as const,
      icon: UsersIcon,
    },
    {
      title: 'Performance Index',
      value: '0.94',
      change: '+2%',
      changeType: 'increase' as const,
      icon: ChartBarIcon,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <KPICard
          key={index}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          changeType={kpi.changeType}
          icon={kpi.icon}
        />
      ))}
    </div>
  )
} 