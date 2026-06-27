export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div><h4 className="font-bold text-white mb-4">AstroSpace</h4><p>Galactic Infrastructure</p></div>
        <div><h4 className="font-bold text-white mb-4">Links</h4><p>Docs</p><p>API</p></div>
        <div><h4 className="font-bold text-white mb-4">Legal</h4><p>Terms</p><p>Privacy</p></div>
        <div><h4 className="font-bold text-white mb-4">Connect</h4><p>@AstroSpaceHub</p></div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center">
        © 2026 AstroSpace Hub. All rights reserved.
      </div>
    </footer>
  );
};
