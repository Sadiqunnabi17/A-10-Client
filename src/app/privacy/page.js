export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-accent py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-6"
          style={{ fontFamily: "Georgia, serif" }}>
          Privacy Policy
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          At Fable, we take your privacy seriously. We collect only the
          information necessary to provide our services and never sell your
          data to third parties.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Your payment information is handled securely through Stripe and is
          never stored on our servers.
        </p>
      </div>
    </div>
  );
}