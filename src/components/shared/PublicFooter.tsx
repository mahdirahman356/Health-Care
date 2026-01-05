import { CircleFadingPlus } from 'lucide-react';
import Link from 'next/link';

function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group mb-3">
              <div className="w-10 h-10 hidden bg-linear-to-br from-primary to-cyan-500 rounded-xl md:flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                <CircleFadingPlus className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-800">
                Health<span className="text-primary">Care</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">Your health is our priority. We are here to provide the best medical services.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Services</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              123 Medical Lane<br />
              Health City, HC 12345<br />
              contact@phdoc.com
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PH Doc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
export default PublicFooter;