'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// Mock data for charts
const budgetPerformanceData = [
  { month: 'Jan', planned: 200000, actual: 185000, variance: -15000 },
  { month: 'Feb', planned: 400000, actual: 420000, variance: 20000 },
  { month: 'Mar', planned: 600000, actual: 580000, variance: -20000 },
  { month: 'Apr', planned: 800000, actual: 850000, variance: 50000 },
  { month: 'May', planned: 1000000, actual: 980000, variance: -20000 },
  { month: 'Jun', planned: 1200000, actual: 1150000, variance: -50000 },
]

const projectHealthData = [
  { name: 'On Track', value: 65, color: '#22c55e' },
  { name: 'At Risk', value: 25, color: '#f59e0b' },
  { name: 'Critical', value: 10, color: '#ef4444' },
]

const resourceUtilizationData = [
  { department: 'Engineering', allocated: 85, available: 15 },
  { department: 'Design', allocated: 70, available: 30 },
  { department: 'QA', allocated: 90, available: 10 },
  { department: 'DevOps', allocated: 75, available: 25 },
  { department: 'Product', allocated: 60, available: 40 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.dataKey}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function PerformanceCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Budget Performance Chart */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Budget Performance Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={budgetPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(value) => `$${(value / 1000)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="planned" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="Planned"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project Health Distribution */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Project Health Distribution
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectHealthData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {projectHealthData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Projects']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          {projectHealthData.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm text-gray-600">
                {entry.name} ({entry.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Utilization */}
      <div className="card p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Resource Utilization by Department
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={resourceUtilizationData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                type="category"
                dataKey="department" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                width={80}
              />
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name === 'allocated' ? 'Allocated' : 'Available']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="allocated" 
                stackId="utilization"
                fill="#3b82f6" 
                radius={[0, 4, 4, 0]}
                name="Allocated"
              />
              <Bar 
                dataKey="available" 
                stackId="utilization"
                fill="#e5e7eb" 
                radius={[0, 4, 4, 0]}
                name="Available"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
} 