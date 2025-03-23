
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="inline-block mb-6">
            <span className="text-xl font-bold text-gradient">LegalLingo</span>
          </Link>
          <p className="text-muted-foreground max-w-md mb-6">
            Simplify legal documents with AI-powered analysis. Get clear explanations, key insights, and quality assessment in seconds.
          </p>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LegalLingo. All rights reserved.
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-foreground mb-4">Product</h4>
          <ul className="space-y-3">
            {['Features', 'How it works', 'Pricing', 'FAQ'].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-foreground mb-4">Company</h4>
          <ul className="space-y-3">
            {['About', 'Blog', 'Careers', 'Contact', 'Legal'].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
