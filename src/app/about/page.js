export default function AboutPage() {
  return (
    <div className="min-h-screen bg-accent py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-6"
          style={{ fontFamily: "Georgia, serif" }}>
          About Fable
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          Fable is a digital platform that connects ebook lovers, readers, and
          collectors with talented writers. Our mission is to democratize access
          to literature and enable emerging writers to reach global audiences.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Whether you're a reader looking for your next great read or a writer
          ready to share your story with the world, Fable is the place for you.
        </p>
      </div>
    </div>
  );
}