import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Button from '../components/ui/Button';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  description: string;
  features: {
    name: string;
    included: boolean;
  }[];
  popular?: boolean;
}

const SubscriptionPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: billingPeriod === 'month' ? 9.99 : 99,
      period: billingPeriod,
      description: 'Perfect for getting started',
      features: [
        { name: 'Access to basic games', included: true },
        { name: 'Progress tracking', included: true },
        { name: 'Email support', included: true },
        { name: 'Premium games', included: false },
        { name: 'Personalized learning path', included: false },
        { name: 'Priority support', included: false },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingPeriod === 'month' ? 19.99 : 199,
      period: billingPeriod,
      description: 'Most popular for families',
      features: [
        { name: 'Access to basic games', included: true },
        { name: 'Progress tracking', included: true },
        { name: 'Email support', included: true },
        { name: 'Premium games', included: true },
        { name: 'Personalized learning path', included: true },
        { name: 'Priority support', included: false },
      ],
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingPeriod === 'month' ? 29.99 : 299,
      period: billingPeriod,
      description: 'For the ultimate experience',
      features: [
        { name: 'Access to basic games', included: true },
        { name: 'Progress tracking', included: true },
        { name: 'Email support', included: true },
        { name: 'Premium games', included: true },
        { name: 'Personalized learning path', included: true },
        { name: 'Priority support', included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Learning Adventure
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Select the perfect plan for your child's educational journey
          </motion.p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-sm inline-flex">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'month'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setBillingPeriod('month')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'year'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setBillingPeriod('year')}
            >
              Yearly
              <span className="ml-1 text-xs text-primary-600">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-sm ${
                plan.popular ? 'border-2 border-primary-500' : 'border border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <div className="bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-500 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-end mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">
                      /{plan.period}
                    </span>
                  </div>
                  {billingPeriod === 'year' && (
                    <p className="text-sm text-primary-600">
                      Save ${(plan.price * 0.2).toFixed(2)} per year
                    </p>
                  )}
                </div>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  fullWidth
                  size="lg"
                  className={plan.popular ? 'bg-primary-500 hover:bg-primary-600' : ''}
                >
                  Get Started
                </Button>

                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    What's included:
                  </h4>
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mt-0.5 mr-3" />
                        )}
                        <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes, all plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                What's your refund policy?
              </h3>
              <p className="text-gray-600">
                If you're not satisfied, we offer a 30-day money-back guarantee for all plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;