"use client"

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyYkY7x24jnBh06WwDaI9_q6Dr8OYqmd_sMeRdNGSPdBiJGAU7sPnkOdnGkFY-WW5Cr/exec";

  const toggleVideo = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      setIsSubmitted(true);
      setEmail("");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] selection:bg-blue-100 overflow-x-hidden">
      
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="font-bold tracking-tighter text-xl"> 
            <Image src="/thinkblack.png" alt="Logo" width={100} height={100}/>
          </span>
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            V1.0 Coming Soon
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-2xl mx-auto px-4 pt-16 pb-32">
        
        <div className="mb-12 px-2">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-[-0.04em] mb-6 leading-[0.95]"
          >
            Think through. <br/>
            <span className="text-zinc-300 tracking-tighter">Then do.</span>
          </motion.h1>
          <p className="text-xl text-zinc-500 leading-relaxed max-w-md">
            The decision engine that visualizes outcomes through recursive reasoning. 
            Built for startups and businesses who prioritize their plans and privacy.
          </p>
        </div>

        <motion.div 
          className="relative bg-zinc-50 border border-zinc-200 p-8 md:p-14 rounded-[30px] md:rounded-[40px] text-center"
        >
          <div className="flex justify-center mb-10">
             <button 
              type="button"
              onClick={() => setIsLocked(!isLocked)}
              className={`flex items-center gap-3 px-5 py-2 rounded-full border transition-all duration-300 ${isLocked ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-400'}`}
             >
               <span className="text-[10px] font-black uppercase tracking-widest">{isLocked ? "Privacy Locked" : "System Open"}</span>
               <span className="text-xs">{isLocked ? "🔒" : "🔓"}</span>
             </button>
          </div>

          <h2 className="text-3xl font-bold mb-3 tracking-tight">Join the Waitlist</h2>
          <p className="text-zinc-400 text-sm mb-10">Secure your spot in the V1.0 private beta.</p>
          
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-w-sm mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-6 py-4 rounded-2xl bg-white border border-zinc-200 focus:border-black outline-none transition-all text-black placeholder:text-zinc-300 disabled:opacity-50"
              required
              disabled={isLoading || isSubmitted}
            />
            <button 
              type="submit"
              disabled={isLoading || isSubmitted}
              className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:bg-zinc-400"
            >
              {isLoading ? "Joining..." : isSubmitted ? "Added" : "Join"}
            </button>
          </form>

          <AnimatePresence>
            {isSubmitted && (
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-sm font-bold text-blue-600"
              >
                You've been added to the wait list.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

      </main>

      <footer className="max-w-2xl mx-auto pb-16 px-6 flex flex-col gap-10 items-center border-t border-zinc-100 pt-16">
        <div className="w-full text-center overflow-hidden">
          {/* RESPONSIVE EMAIL: Small on mobile, 100px on large screens */}
          <h6 className=" text-zinc-400 text-[10vw] md:text-[80px] lg:text-[100px] font-black tracking-tighter leading-none break-all">
            aithink572@gmail.com
          </h6>
        </div>
        <div className="text-zinc-400 text-[10px] font-bold text-center uppercase tracking-widest">
          © 2026 THINK AI — WE THINK THROUGH SO YOU CAN MAKE A DECISION
        </div>
      </footer>
    </div>
  );
}