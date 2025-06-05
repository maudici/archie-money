import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="px-4 py-6 border-b border-border-color relative">
        <Link
          href="/"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:bg-input-bg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-text-secondary hover:text-text-white" />
        </Link>
        
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <Image 
              src="/ArchieLogo.png" 
              alt="Archie.Money Logo" 
              width={32} 
              height={32}
              className="rounded-lg"
            />
            <h1 className="text-2xl font-bold text-text-white">Disclaimer</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="modern-card p-8">
          <p className="text-text-secondary mb-8">Last updated: June 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">1. No Financial Advice</h2>
            <p className="text-text-primary leading-relaxed">
              All content, projections, charts, and analysis provided by Archie.Money ("Archie") are for educational and informational purposes only. Nothing on our website, in our app, or in any communications from Archie constitutes (or should be construed as) investment advice, tax advice, financial planning, legal advice, or any other kind of professional advice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">2. Projections Are Estimates Only</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>Archie's retirement projections (e.g., "Projected Nest-Egg," "Retirement Income," and related calculations) are based solely on user‐provided inputs and assumptions (interest rates, inflation rates, withdrawal rates).</li>
              <li>These projections are not guaranteed. Actual investment performance, inflation, taxes, fees, or life events may yield materially different results.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">3. No Liability for User Decisions</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li><strong>Use at Your Own Risk:</strong> You acknowledge and agree that any financial decision you make after using Archie is your sole responsibility.</li>
              <li><strong>Archie Not Liable:</strong> Under no circumstances shall Archie.Money, its owners, affiliates, officers, employees, or agents be liable for any direct or indirect losses, damages, or costs you incur as a result of using or relying on any information, projection, or "what-if" scenario provided by Archie.</li>
              <li><strong>No Guarantees:</strong> Past performance or hypothetical projections do not guarantee future results. Archie does not warrant that any particular investment strategy or outcome will be achieved.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">4. Informational Links & Referrals</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>Archie may provide links or referrals to third‐party websites, platforms, or services (e.g., bank or brokerage sign‐up pages, informational articles).</li>
              <li>Such references are provided only for convenience and educational purposes. Archie does not endorse or guarantee any products, services, content, or recommendations offered by third parties.</li>
              <li><strong>No Liability:</strong> Archie.Money is not responsible for the content, accuracy, or policies of any external site, nor is Archie liable for any transaction, loss, or damage resulting from your interactions with third‐party sites.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">5. No Fiduciary Relationship</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>Use of Archie does not create a fiduciary relationship between you and Archie.Money.</li>
              <li>You should not interpret Archie's projections as personalized advice. Consider consulting a qualified financial advisor, accountant, tax professional, or attorney to address your specific financial circumstances.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">6. "Just a Projection" Emphasis</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>The calculations in Archie are descriptive, not prescriptive.</li>
              <li>Just because Archie's output suggests that saving X amount per month might produce Y retirement income, that does not mean Archie "recommends" you invest exactly X.</li>
              <li>These outputs are provided to help you understand potential scenarios. Actual decisions (e.g., which investment products to use, how much to save, when to retire) are yours alone, and Archie claims no responsibility for them.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">7. No Warranty & Use "As‐Is"</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li><strong>"AS‐IS" Basis:</strong> Archie.Money provides its service on an "as‐is" and "as‐available" basis, without warranties of any kind, express or implied.</li>
              <li><strong>No Guarantee of Uptime:</strong> While we strive for high availability, we do not guarantee the Service will be uninterrupted or error‐free.</li>
              <li><strong>No Guarantee of Accuracy:</strong> We make reasonable efforts to ensure calculations are correct, but errors can occur. You accept that all information is used at your own discretion.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">8. Indemnification</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              By using Archie, you agree to indemnify, defend, and hold harmless Archie.Money, its affiliates, and their representatives from and against any and all claims, liabilities, losses, damages, costs, or expenses (including reasonable attorneys' fees) arising out of or in connection with:
            </p>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>Your use or misuse of the Service;</li>
              <li>Any violation of this Disclaimer;</li>
              <li>Any reliance on information or projections from Archie.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">9. Updates & Modifications</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>Archie.Money reserves the right to update or change this Disclaimer at any time.</li>
              <li>We will post the revised version on our website with an updated "Last updated" date.</li>
              <li>Your continued use of Archie after any such changes indicates your acceptance of the new terms.</li>
            </ul>
          </section>

          <div className="mt-12 p-6 bg-input-bg rounded-lg border-l-4 border-primary-blue">
            <p className="text-text-white font-semibold text-center">
              By using Archie.Money, you fully acknowledge and agree that Archie is a projection tool only, is not financial advice, and shall not be held responsible for any decisions you make or losses you incur.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 