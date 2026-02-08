"use client";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl px-5 mx-auto py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: February 1, 2025
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to SkillBridge. We respect your privacy and are
                committed to protecting your personal data. This privacy policy
                explains how we collect, use, and safeguard your information
                when you use our platform.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                2. Information We Collect
              </h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Account information (name, email, password)</li>
                <li>Profile information (bio, expertise, education)</li>
                <li>
                  Payment information (processed securely through our payment
                  providers)
                </li>
                <li>
                  Communication data (messages, session recordings with consent)
                </li>
                <li>Usage data (how you interact with our platform)</li>
              </ul>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Match students with suitable tutors</li>
                <li>Process payments and prevent fraud</li>
                <li>
                  Send you updates, marketing communications (with your consent)
                </li>
                <li>Respond to your questions and provide support</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                4. Information Sharing
              </h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information. We may share your
                information with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  Other users as necessary (e.g., tutors see student profiles
                  for bookings)
                </li>
                <li>Service providers who assist our operations</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. This includes encryption, secure
                servers, and regular security audits.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Export your data in a portable format</li>
              </ul>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">7. Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to track
                activity on our platform and hold certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                8. Children's Privacy
              </h2>
              <p className="text-muted-foreground">
                Our platform is not intended for children under 13. We do not
                knowingly collect personal information from children under 13.
                If you are a parent and believe your child has provided us with
                personal information, please contact us.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last updated" date.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this privacy policy, please
                contact us at:
              </p>
              <p className="text-primary mt-2">privacy@skillbridge.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
