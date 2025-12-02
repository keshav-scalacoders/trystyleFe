import { Shirt } from "lucide-react";

const Logo: React.FC = () => (
    <div className="flex items-center gap-2 font-bold text-xl text-gray-800 tracking-tight cursor-pointer">
        <div className="bg-black text-white p-1.5 rounded-lg">
            <Shirt size={20} />
        </div>
        <span>TryStyle<span className="text-gray-500">.app</span></span>
    </div>
);

export default Logo;
