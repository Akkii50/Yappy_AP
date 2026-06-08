import { Link } from "react-router-dom";
import { LogOut, MessageCircleHeart, Settings, Sparkles, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 z-40 w-full border-b border-base-300/60 bg-base-100/75 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto h-16 px-4">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 transition-all hover:opacity-85">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
                <MessageCircleHeart className="size-5 text-primary-content" />
              </div>
              <div className="leading-tight">
                <h1 className="text-xl font-black tracking-tight yappy-gradient-text">Yappy</h1>
                <p className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-base-content/45 sm:block">
                  Talk bright
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary md:flex">
              <Sparkles className="size-3.5" />
              Live chat
            </div>
            <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex items-center gap-2" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
