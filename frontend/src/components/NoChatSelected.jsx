import { MessageCircleHeart, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center bg-gradient-to-br from-base-100/70 via-base-100/40 to-primary/10 p-16">
      <div className="max-w-md space-y-6 text-center">
        <div className="mb-4 flex justify-center gap-4">
          <div className="relative">
            <div className="flex size-20 animate-bounce items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-primary to-secondary shadow-2xl shadow-primary/25">
              <MessageCircleHeart className="size-10 text-primary-content" />
            </div>
            <Sparkles className="absolute -right-3 -top-2 size-6 text-accent" />
          </div>
        </div>

        <h2 className="text-3xl font-black tracking-tight">
          Welcome to <span className="yappy-gradient-text">Yappy</span>
        </h2>
        <p className="text-base-content/60">
          Pick a conversation and let the tiny internet confetti begin.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
