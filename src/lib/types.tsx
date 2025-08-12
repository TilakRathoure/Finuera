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
