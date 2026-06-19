import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import { FileText, PenTool, Mail, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-900
      via-blue-900
      to-slate-950
    "
    >
      <Navbar />
    

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          <h1
            className="
            text-6xl
            md:text-7xl
            font-bold
            text-white
            leading-tight
          "
          >
            Secure Digital
            <br />
            Document Signing
          </h1>

          <p
            className="
            text-xl
            text-gray-300
            max-w-3xl
            mx-auto
            mt-8
          "
          >
            Upload PDFs, send secure signature requests, collect digital
            signatures, and track every activity with a complete audit trail.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-4
                rounded-xl
                font-semibold
                transition
              "
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="
                border
                border-white/30
                text-white
                px-8
                py-4
                rounded-xl
                hover:bg-white/10
                transition
              "
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2
          className="
          text-4xl
          font-bold
          text-center
          text-white
          mb-12
        "
        >
          Platform Features
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FileText size={40} />}
            title="PDF Upload"
            text="Upload and manage PDF documents securely."
          />

          <FeatureCard
            icon={<PenTool size={40} />}
            title="Digital Signature"
            text="Collect legally valid digital signatures."
          />

          <FeatureCard
            icon={<Mail size={40} />}
            title="Email Requests"
            text="Send signing requests instantly."
          />

          <FeatureCard
            icon={<ShieldCheck size={40} />}
            title="Audit Trail"
            text="Track every action securely."
          />
        </div>
      </section>

      {/* Workflow */}

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2
          className="
          text-4xl
          font-bold
          text-center
          text-white
          mb-12
        "
        >
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <Step number="1" title="Upload" />

          <Step number="2" title="Generate Link" />

          <Step number="3" title="Send Email" />

          <Step number="4" title="Sign & Track" />
        </div>
      </section>

      {/* Footer */}

      <footer
        className="
        border-t
        border-white/10
        py-8
        text-center
        text-gray-400
      "
      >
        © 2026 Document Signature Platform
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div
      className="
      bg-white/10
      backdrop-blur-lg
      border
      border-white/20
      rounded-2xl
      p-6
      text-center
    "
    >
      <div className="text-blue-400 flex justify-center mb-4">{icon}</div>

      <h3 className="text-white font-bold text-xl">{title}</h3>

      <p className="text-gray-300 mt-2">{text}</p>
    </div>
  );
}

function Step({ number, title }) {
  return (
    <div
      className="
      bg-white/10
      backdrop-blur-lg
      border
      border-white/20
      rounded-2xl
      p-6
      text-center
    "
    >
      <div
        className="
        w-12
        h-12
        mx-auto
        rounded-full
        bg-blue-600
        flex
        items-center
        justify-center
        text-white
        font-bold
        mb-4
      "
      >
        {number}
      </div>

      <h3
        className="
        text-white
        font-semibold
      "
      >
        {title}
      </h3>
    </div>
  );
}
