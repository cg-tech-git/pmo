// Core Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  PROJECT_MANAGER = 'project_manager',
  TEAM_LEAD = 'team_lead',
  PMO_ADMIN = 'pmo_admin',
  EXECUTIVE = 'executive',
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: Date;
  endDate: Date;
  budget: number;
  actualCost: number;
  projectManager: User;
  team: User[];
  healthScore: HealthScore;
  phase: ProjectPhase;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ProjectPhase {
  INITIATION = 'initiation',
  PLANNING = 'planning',
  EXECUTION = 'execution',
  MONITORING = 'monitoring',
  CLOSURE = 'closure',
}

export enum HealthScore {
  GREEN = 'green',
  AMBER = 'amber',
  RED = 'red',
}

// EVM (Earned Value Management) Types
export interface EVMMetrics {
  id: string;
  projectId: string;
  reportingDate: Date;
  plannedValue: number; // PV - Budgeted Cost of Work Scheduled
  earnedValue: number; // EV - Budgeted Cost of Work Performed
  actualCost: number; // AC - Actual Cost of Work Performed
  scheduleVariance: number; // SV = EV - PV
  costVariance: number; // CV = EV - AC
  schedulePerformanceIndex: number; // SPI = EV / PV
  costPerformanceIndex: number; // CPI = EV / AC
  budgetAtCompletion: number; // BAC
  estimateAtCompletion: number; // EAC
  estimateToComplete: number; // ETC
  varianceAtCompletion: number; // VAC
}

// Resource Types
export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  category: string;
  cost: number;
  unit: string;
  availability: number;
  projectId: string;
  allocatedDate: Date;
  plannedEndDate: Date;
  actualEndDate?: Date;
}

export enum ResourceType {
  MANPOWER = 'manpower',
  EQUIPMENT = 'equipment',
  MATERIAL = 'material',
}

export interface Manpower extends Resource {
  type: ResourceType.MANPOWER;
  skillLevel: SkillLevel;
  accreditations: Accreditation[];
  hourlyRate: number;
  hoursAllocated: number;
  hoursActual: number;
}

export enum SkillLevel {
  JUNIOR = 'junior',
  INTERMEDIATE = 'intermediate',
  SENIOR = 'senior',
  EXPERT = 'expert',
}

export interface Accreditation {
  id: string;
  name: string;
  issuer: string;
  issuedDate: Date;
  expiryDate: Date;
  status: AccreditationStatus;
  documentUrl?: string;
}

export enum AccreditationStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  EXPIRING_SOON = 'expiring_soon',
  PENDING = 'pending',
}

// Dashboard Types
export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  size: WidgetSize;
  position: { x: number; y: number };
  data: any;
  config: WidgetConfig;
}

export enum WidgetType {
  KPI_CARD = 'kpi_card',
  CHART = 'chart',
  TABLE = 'table',
  PROGRESS_BAR = 'progress_bar',
  STATUS_LIST = 'status_list',
}

export enum WidgetSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra_large',
}

export interface WidgetConfig {
  refreshInterval?: number;
  showHeader?: boolean;
  exportable?: boolean;
  [key: string]: any;
}

// Report Types
export interface Report {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  parameters: ReportParameter[];
  template: string;
  createdBy: string;
  createdAt: Date;
  lastGenerated?: Date;
}

export enum ReportType {
  PROJECT_STATUS = 'project_status',
  RESOURCE_UTILIZATION = 'resource_utilization',
  FINANCIAL_SUMMARY = 'financial_summary',
  CUSTOM = 'custom',
}

export interface ReportParameter {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'select';
  required: boolean;
  defaultValue?: any;
  options?: string[];
}

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  current?: boolean;
  children?: NavigationItem[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: any;
}

// Notification Types
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
} 