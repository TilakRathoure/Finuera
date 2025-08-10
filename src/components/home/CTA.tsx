import React from 'react'
import { Button } from '../ui/button';
import { CTAButton } from '@/lib/types';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface CTAButtonComponentProps {
  button: CTAButton;
}

const ctaButtons: CTAButton[] = [
  {
    text: 'Start Your Free Trial',
    icon: ArrowRight,
    variant: 'default',
    iconPosition: 'right'
  },
  {
    text: 'Chat with VedAI',
    icon: MessageSquare,
    variant: 'outline',
    iconPosition: 'left'
  }
];

const CTAButtonComponent: React.FC<CTAButtonComponentProps> = ({ button } : CTAButtonComponentProps) => {
  const Icon = button.icon;
  
  return (
    <Button variant={button.variant} size="lg" className="group">
      {button.iconPosition === 'left' && Icon && <Icon className="w-5 h-5 mr-2" />}
      {button.text}
      {button.iconPosition === 'right' && Icon && (
        <Icon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      )}
    </Button>
  );
};

const CTA = () => {
  return (
    <div>        <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your <span className="text-primary">Financial Journey</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who trust FinueraAI for intelligent financial insights and personalized guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {ctaButtons.map((button, index) => (
                <CTAButtonComponent key={index} button={button} />
              ))}
            </div>
          </div>
        </section></div>
  )
}

export default CTA