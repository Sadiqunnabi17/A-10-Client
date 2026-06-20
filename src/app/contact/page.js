export default function ContactPage() {
  return (
    <div className="min-h-screen bg-accent py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-6"
          style={{ fontFamily: "Georgia, serif" }}>
          Contact Us
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          Have questions or feedback? We'd love to hear from you.
        </p>
        <p className="text-gray-600">Email: support@fable.com</p>
      </div>
    </div>
  );
}