/**
 * Enums compartidos para el módulo de Companies
 *
 * Separados de las entidades para evitar dependencias circulares
 * en Swagger cuando los DTOs los importan
 */

/**
 * Tipos de sociedades comerciales en Chile
 */
export enum CompanyType {
  SPA = 'SpA',
  LTDA = 'Ltda',
  SA = 'SA',
  EIRL = 'EIRL',
  INDIVIDUAL = 'Individual',
  OTHER = 'Otra',
}

/**
 * Regiones de Chile según división político-administrativa
 */
export enum ChileanRegion {
  ARICA_PARINACOTA = 'XV',
  TARAPACA = 'I',
  ANTOFAGASTA = 'II',
  ATACAMA = 'III',
  COQUIMBO = 'IV',
  VALPARAISO = 'V',
  METROPOLITANA = 'RM',
  OHIGGINS = 'VI',
  MAULE = 'VII',
  NUBLE = 'XVI',
  BIOBIO = 'VIII',
  ARAUCANIA = 'IX',
  LOS_RIOS = 'XIV',
  LOS_LAGOS = 'X',
  AYSEN = 'XI',
  MAGALLANES = 'XII',
}

/**
 * Sector económico / Industria
 */
export enum IndustryType {
  AGRICULTURE = 'agriculture',
  MINING = 'mining',
  MANUFACTURING = 'manufacturing',
  CONSTRUCTION = 'construction',
  RETAIL = 'retail',
  WHOLESALE = 'wholesale',
  TRANSPORT = 'transport',
  HOSPITALITY = 'hospitality',
  TECHNOLOGY = 'technology',
  FINANCE = 'finance',
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  REAL_ESTATE = 'real_estate',
  PROFESSIONAL_SERVICES = 'professional_services',
  OTHER = 'other',
}

/**
 * Tamaño de empresa según clasificación del SII
 */
export enum CompanySize {
  MICRO = 'micro',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

/**
 * Estado de suscripción en el sistema SaaS
 */
export enum SubscriptionStatus {
  TRIAL = 'trial',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  PAYMENT_FAILED = 'payment_failed',
}

/**
 * Planes de suscripción disponibles
 */
export enum SubscriptionPlan {
  FREE = 'free',
  BASIC = 'basic',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  CUSTOM = 'custom',
}

/**
 * Frecuencia de facturación
 */
export enum BillingFrequency {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUAL = 'annual',
  BIENNIAL = 'biennial',
}
