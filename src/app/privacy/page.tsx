import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
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
            <h1 className="text-2xl font-bold text-text-white">Privacy Policy</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="modern-card p-8">
          <p className="text-text-secondary mb-8">Last updated: June 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">1. Introduction</h2>
            <p className="text-text-primary leading-relaxed">
              Welcome to Archie.Money ("Archie," "we," "us," or "our"). Archie helps users model and project their retirement savings and income based on the inputs they provide. This Privacy Policy explains how we collect, use, disclose, and protect information. By using Archie's services or visiting our website, you agree to the practices described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">2. Information We Collect</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-text-white mb-3">2.1. User Inputs (Not Stored)</h3>
              <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
                <li>Archie requires certain user‐provided inputs (e.g., age, retirement age, income, expenses, savings, investment amount, state).</li>
                <li>All calculations are performed locally in your browser; we do not store, track, or transmit any of your personal inputs to our servers.</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-text-white mb-3">2.2. Automatically Collected Technical Data</h3>
              <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
                <li>When you visit our website, we automatically collect minimal technical data for analytics and security (e.g., your IP address, browser type, device type, page load times).</li>
                <li>This data is used solely to monitor site performance, detect and prevent fraud or abuse, and improve service reliability.</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-text-white mb-3">2.3. Cookies & Similar Technologies</h3>
              <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
                <li>Archie uses strictly necessary cookies to enable core functionality (e.g., session management).</li>
                <li>We do not use tracking cookies, third‐party advertising cookies, or persistent identifiers.</li>
                <li>You can disable cookies in your browser settings; disabling required cookies may limit certain features.</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">3. How We Use Information</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li><strong>User Privacy:</strong> Because none of your personal or financial inputs are saved, Archie does not—and cannot—build a profile or retain your information.</li>
              <li><strong>Site Improvement:</strong> Aggregated technical data (browser/OS, page load times, error logs) is used to maintain and improve our service.</li>
              <li><strong>Security & Fraud Prevention:</strong> Technical data helps us detect unusual activity (e.g., repeated invalid requests) and maintain a secure environment.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">4. Sharing & Disclosure</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>We do not share, sell, or rent any personal user inputs to any third party.</li>
              <li>We may disclose aggregated, de‐identified technical data (e.g., "X% of visitors use Chrome on desktop") for internal analytics or public reporting.</li>
              <li>We may share anonymized logs or debugging information with service providers who assist in hosting or maintaining our infrastructure, provided they agree to keep such information confidential.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">5. Third‐Party Links & Embedded Content</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>Our website or app may contain links to third‐party websites (e.g., brokerage platforms, financial resources).</li>
              <li>Clicking these links takes you off Archie's domain; our Privacy Policy no longer applies.</li>
              <li>We encourage you to review each third party's privacy policy before submitting any personal information on their site.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">6. Security & Data Retention</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>Because Archie does not store user‐provided inputs, there is no personal data database to secure.</li>
              <li>Technical logs (IP addresses, browser data) are retained temporarily (up to 30 days) and then purged to protect user privacy.</li>
              <li>We implement industry‐standard security measures (encryption in transit, secure servers) to guard against unauthorized access or disclosure of logged data.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">7. Children's Privacy</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>Archie's service is intended for users aged 18 and older.</li>
              <li>We do not knowingly collect information from children under 18.</li>
              <li>If we discover that a child under 18 has used our service without parental consent, we will take steps to delete any automated logs or data associated with that user.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-white mb-4">8. Changes to This Policy</h2>
            <ul className="text-text-primary leading-relaxed space-y-2 ml-6 list-disc">
              <li>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.</li>
              <li>The "Last updated" date at the top will indicate when the policy was most recently revised.</li>
              <li>Continued use of Archie after changes constitutes acceptance of the updated policy.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
} 