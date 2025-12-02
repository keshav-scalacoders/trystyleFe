import { Shirt } from "lucide-react";
import { Link } from "wouter";

const Logo: React.FC = () => (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground tracking-tight cursor-pointer">
        <div className="bg-primary text-white p-1.5 rounded-lg">
            <Shirt size={20} />
        </div>
        <span className="text-primary">TryStyle<span className="text-muted-foreground">.app</span></span>
    </Link>
);

export default Logo;
