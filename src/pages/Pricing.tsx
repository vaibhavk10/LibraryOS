import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

const PLANS = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for small libraries and reading clubs.',
    features: [
      'Up to 500 books',
      '50 active members',
      'Basic catalog search',
      'Email notifications',
      'Standard support',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$79',
    period: '/month',
    description: 'For growing libraries that need more power.',
    features: [
      'Unlimited books',
      '500 active members',
      'Advanced search & filters',
      'Analytics dashboard',
      'Automated reminders',
      'Priority support',
      'API access',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large institutions with custom requirements.',
    features: [
      'Unlimited everything',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'On-premise option',
      'Custom branding',
      'SSO / SAML',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[hsl(220,20%,7%)] text-white">
      <Header />

      <main className="pt-24">
        <section className="py-20 bg-[hsl(220,20%,6%)] border-b border-[hsl(220,15%,13%)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(45,90%,55%)]/10 border border-[hsl(45,90%,55%)]/20 rounded-full mb-6">
                <Zap className="w-3.5 h-3.5 text-[hsl(45,90%,55%)]" />
                <span className="text-xs font-medium text-[hsl(45,90%,65%)]">Simple, transparent pricing</span>
              </div>
              <h1 className="font-serif text-5xl font-bold text-white mb-4">
                Plans for every library
              </h1>
              <p className="text-[hsl(220,10%,55%)] text-lg">
                Start free for 30 days. No credit card required.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PLANS.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-[hsl(220,18%,11%)] border-[hsl(45,90%,55%)]/40 shadow-xl shadow-[hsl(45,90%,55%)]/5'
                      : 'bg-[hsl(220,18%,9%)] border-[hsl(220,15%,16%)] hover:border-[hsl(220,15%,25%)]'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 text-xs font-semibold bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] rounded-full">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h2 className="font-serif text-xl font-bold text-white mb-1">{plan.name}</h2>
                    <p className="text-sm text-[hsl(220,10%,50%)] mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-bold text-white">{plan.price}</span>
                      {plan.period && <span className="text-[hsl(220,10%,50%)] text-sm">{plan.period}</span>}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[hsl(142,70%,50%)] flex-shrink-0" />
                        <span className="text-sm text-[hsl(220,10%,65%)]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => toast.info('To enable payment functionality, please continue with the Stripe setup in follow-up steps.')}
                    className={`w-full py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                      plan.highlighted
                        ? 'bg-[hsl(45,90%,55%)] text-[hsl(220,20%,8%)] hover:bg-[hsl(45,90%,62%)]'
                        : 'border border-[hsl(220,15%,25%)] text-[hsl(220,10%,70%)] hover:border-[hsl(220,15%,40%)] hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center text-sm text-[hsl(220,10%,45%)] mt-10"
            >
              All plans include a 30-day free trial. No credit card required.
            </motion.p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}