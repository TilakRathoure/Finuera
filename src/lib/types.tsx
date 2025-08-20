import { LucideIcon } from "lucide-react";

export interface Homeinfo{
  title:string,
  description:string,
  icon:LucideIcon
  color:string,
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureCard {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
  iconBg: string;
  iconColor: string;
}

export interface TechFeature {
  icon: LucideIcon;
  text: string;
}

export interface TechSection {
  title: string;
  description: string;
  features: TechFeature[];
}

export interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  bgGradient: string;
  iconBg: string;
  iconColor: string;
}

export interface VedAIFeature {
  text: string;
}

export interface CTAButton {
  text: string;
  icon?: LucideIcon;
  variant: 'default' | 'outline';
  iconPosition?: 'left' | 'right';
}

export interface FooterLink {
  label: string;
  href: string;
};

export interface ErrResponse{
  error:string,
  message:string;
}

interface charinfo{
  label:string,
  color:string,
}

export interface chartconfig{housing?:charinfo, transportation?:charinfo, groceries?:charinfo, utilities?:charinfo, entertainment?:charinfo, food?:charinfo, shopping?:charinfo, healthcare?:charinfo, education?:charinfo, personal?:charinfo, travel?:charinfo, insurance?:charinfo, gifts?:charinfo, bills?:charinfo, "other-expense"?:charinfo}

export interface Dashboard{
  error: boolean,
  totalAmount:number,
  monthlySpending:{month:string, spent:number}[],
  categories:{category:string, amount:number}[],
  tip:string,
  chartconfig:chartconfig,
}

export interface AIResponse {
  totalAmount?: number;
  monthlySpending?: { month: string; spent: number }[];
  categories?: { category: string; amount: number }[];
  tip?: string;
  chartconfig?: [{ label: string; color: string }];
  error: string;
}

