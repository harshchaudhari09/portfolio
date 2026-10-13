import { useEffect, Component } from "react";
import Lenis from "lenis";
import "@/App.css";
import Home from "@/pages/Home";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#090A0F] text-slate-300 p-8 text-center">
          <div>
            <p className="mono text-xs uppercase tracking-[0.25em] text-[#00F5A0]">runtime error</p>
            <p className="mt-4 text-lg">Something crashed on this page — reload to try again.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="grain">
        <Home />
      </div>
    </ErrorBoundary>
  );
}