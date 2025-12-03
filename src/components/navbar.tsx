import React, { useState, useEffect, useCallback, type JSX, Suspense } from 'react';
import { X, Menu } from 'lucide-react';
import { Button } from './ui/button';
import Logo from './Logo';
const LoginModal = React.lazy(() => import('@/components/login-modal'));
import AuthAPI from '@/api/auth.api';
import { useAuthStore } from '@/lib/stores/auth-store';
import { MyAccDropdown } from '@/pages/home/components/MyAccDropdown';

// interface User {
//     id: string;
//     email: string;
//     name: string;
// }


// interface AuthState {
//     isLoggedIn: boolean;
//     token: string | null;
//     user: User | null;
//     login: (token: string, user: User) => void;
//     logout: () => void;
// }

// const useAuthStore = create<AuthState>()(
//     persist(
//         (set) => ({
//             isLoggedIn: false,
//             token: null,
//             user: null,
//             login: (token: string, user: User) => set({ isLoggedIn: true, token, user }),
//             logout: () => set({ isLoggedIn: false, token: null, user: null }),
//         }),
//         { name: 'fitroom-auth-storage' }
//     )
// );

// // 4. Mock Auth API
// const apiLogout = async (): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, 300));
// const apiLogin = async (email: string, password: string): Promise<{ token: string; user: User }> => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         if (email === 'test@user.com' && password === 'password') {
//             resolve({ token: "mock-jwt", user: { id: "u1", email: email, name: "Test User" } });
//         } else {
//             reject(new Error("Invalid credentials"));
//         }
//     }, 1000);
// });


// 5. Mock Login Modal Component
// interface LoginModalProps {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     onLoginSuccess: () => void;
// }

// const LoginModal: React.FC<LoginModalProps> = ({ open, onOpenChange, onLoginSuccess }) => {
//     const [email, setEmail] = useState<string>('test@user.com');
//     const [password, setPassword] = useState<string>('password');
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const { login } = useAuthStore();

//     if (!open) return null;

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError(null);

//         try {
//             const { token, user } = await apiLogin(email, password);
//             login(token, user);
//             onLoginSuccess();
//             onOpenChange(false);
//         } catch (err) {
//             setError('Invalid email or password (Hint: test@user.com / password)');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
//             <div 
//                 className="relative text-gray-400 w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <button 
//                     onClick={() => onOpenChange(false)}
//                     className="absolute right-4 top-4 hover:text-gray-600 transition-colors"
//                 >
//                     <X size={20} />
//                 </button>

//                 <div className="space-y-6">
//                     <div className="text-center space-y-2">
//                         <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black"
//                             required
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black"
//                             required
//                         />

//                         {error && (
//                             <div className="text-sm text-red-500 font-medium p-2 bg-red-50 rounded-lg">
//                                 {error}
//                             </div>
//                         )}

//                         <Button 
//                             type="submit" 
//                             className="w-full" 
//                             disabled={isLoading}
//                         >
//                             {isLoading ? (
//                                 <>
//                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                     Signing in...
//                                 </>
//                             ) : ('Sign In')}
//                         </Button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// --- END: Dependency Mocks ---


// --- START: Enhanced Navbar Component ---

const Navbar: React.FC = () => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { isLoggedIn, logout, user } = useAuthStore();

    // Sticky state implementation

    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 10);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleLogout = async () => {
        try {
            await AuthAPI.logout(); // clear server session and token storage
        } catch (error) {
            // ignore server errors
        }
        logout(); // clear client state
        setIsMenuOpen(false);
    };

    const navClasses = `
        w-full flex items-center justify-between z-50 transition-all duration-300
        sticky top-0
        ${isScrolled ? 'py-3 shadow-lg bg-background/80 backdrop-blur-sm border-b border-border' : 'py-5 bg-transparent'}
        px-4 sm:px-8 lg:px-20
    `;

    // Content for both desktop and mobile menu
    const AuthContent: JSX.Element = (
        isLoggedIn ? (
            <MyAccDropdown logout={handleLogout} user={user?.name} />
        ) : (
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 text-muted-foreground">
                <Button variant="ghost" className="justify-start lg:justify-center text-primary" onClick={() => { setShowLoginModal(true); setIsMenuOpen(false); }}>
                    Log In
                </Button>
                <Button variant="default" className="w-full lg:w-auto">
                    Sign Up
                </Button>
            </div>
        )
    );

    return (
        <>
            {/* Desktop and Tablet Navbar */}
            <nav className={navClasses}>
                <Logo />

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    {AuthContent}
                    {/* <a href="/theme" className="text-sm text-muted-foreground hover:underline ml-4">Theme</a> */}
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-lg text-foreground hover:bg-accent/8 transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className={`
                    fixed top-[68px] left-0 w-full bg-white shadow-xl z-40 
                    p-4 border-t border-gray-100 lg:hidden
                    animate-in slide-in-from-top-4 duration-300
                `}>
                    <div className="flex flex-col gap-2">
                        {AuthContent}
                    </div>
                </div>
            )}
            <Suspense fallback={null}>

                <LoginModal
                    open={showLoginModal}
                    onOpenChange={setShowLoginModal}
                    onLoginSuccess={() => { }}
                />
            </Suspense>

        </>
    )
}

export default Navbar;