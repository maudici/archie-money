import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfService() {
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
            <h1 className="text-2xl font-bold text-text-white">Terms of Service</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="modern-card p-8">
          <p className="text-text-secondary mb-8">Last updated: June 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-primary leading-relaxed">
              By accessing or using Archie ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, you must not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">2. Service Overview</h2>
            <p className="text-text-primary leading-relaxed">
              Archie.Money provides an interactive calculator and analysis tool ("Archie") to help users project retirement savings and income based on information entered. Archie does not store your inputs; all computations occur locally in your browser or device.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">3. User Responsibilities</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li><strong>Accuracy of Inputs:</strong> You are solely responsible for ensuring that all data you enter into Archie (age, income, expenses, investments, etc.) is accurate and up to date.</li>
              <li><strong>No Account Creation Required:</strong> Archie does not require you to create an account or submit personal data. By using our service, you confirm that any inputs do not violate any third‐party rights.</li>
              <li><strong>Compliance with Laws:</strong> You agree to use Archie only for lawful purposes and in a manner consistent with these Terms, all applicable laws, and regulations.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">4. Intellectual Property</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>All content, design, logos, trademarks, and software code related to Archie ("Content") are the exclusive property of Archie.Money or its licensors.</li>
              <li>You may not modify, reproduce, distribute, create derivative works of, or publicly display any portion of the Content without prior written permission from Archie.Money.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">5. Projections Are Informational Only</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>The projections, calculations, charts, and analysis presented by Archie are for informational purposes only.</li>
              <li><strong>Not Financial Advice:</strong> Archie is not a financial advisor, and nothing on or delivered through our Service constitutes financial, legal, accounting, or tax advice.</li>
              <li><strong>No Liability:</strong> You acknowledge that any financial decisions you make based on information provided by Archie are your sole responsibility. Archie.Money disclaims all liability for direct, indirect, incidental, or consequential damages arising from your use of or reliance on our Service.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">6. Disclaimers & No Warranties</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li><strong>As‐Is Basis:</strong> Archie and all related Content are provided "as‐is" and "as‐available," without any warranties of any kind, express or implied.</li>
              <li><strong>No Warranty of Accuracy:</strong> While we strive for accuracy, Archie does not guarantee that any projection, calculation, or piece of information is completely accurate or error‐free.</li>
              <li><strong>Third‐Party Links:</strong> Our Service may contain links or referrals to third‐party websites or resources. We do not endorse, control, or guarantee their content. Accessing those links is at your own risk. Archie.Money is not responsible for any loss or damage caused by your use of any third‐party website.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">7. Limitation of Liability</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>To the fullest extent permitted by applicable law, Archie.Money, its affiliates, officers, employees, or agents shall not be liable for any damages (including, without limitation, direct, indirect, incidental, special, punitive, or consequential damages) arising out of or related to your use of or inability to use the Service, even if we have been advised of the possibility of such damages.</li>
              <li>This includes, but is not limited to, any loss of data, profit, goodwill, or other intangible losses. Your sole and exclusive remedy is to stop using the Service.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">8. Indemnification</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              You agree to defend, indemnify, and hold harmless Archie.Money and its officers, directors, employees, and agents from any claims, demands, losses, liabilities, costs, or expenses (including reasonable attorneys' fees) arising out of:
            </p>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>Your use or misuse of the Service;</li>
              <li>Any violation of these Terms;</li>
              <li>Any inaccuracy or misstatement in the information you provide to Archie.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">9. Modifications & Termination</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li><strong>Changes to Terms:</strong> We reserve the right to modify these Terms at any time. If we do, we'll post the updated Terms here with a new "Last updated" date. Continued use of Archie following changes constitutes acceptance of those changes.</li>
              <li><strong>Termination of Access:</strong> We may, at our sole discretion, suspend or terminate your access to the Service at any time, for any reason, without notice or liability to you.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">10. Governing Law & Dispute Resolution</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>These Terms and any disputes related to them or the Service shall be governed by the laws of the State of California, without regard to its conflict of laws principles.</li>
              <li>Any claim or controversy arising out of or relating to these Terms or the Service shall be resolved exclusively in the state or federal courts located in San Francisco County, California. You consent to personal jurisdiction and venue in those courts.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">11. Severability</h2>
            <p className="text-text-primary leading-relaxed">
              If any provision of these Terms is found invalid or unenforceable by a court of competent jurisdiction, that provision will be enforced to the maximum extent permissible and the remaining provisions will remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">12. Entire Agreement</h2>
            <p className="text-text-primary leading-relaxed">
              These Terms, together with our Privacy Policy and Disclaimer, constitute the entire agreement between you and Archie.Money regarding the Service and supersede all prior or contemporaneous communications, whether electronic, oral, or written.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 