"use client";

import PublicHeader from "@/components/PublicHeader";

export default function PublicApiDocs() {
  return (
    <>
    <PublicHeader />
    <div className="min-h-screen mt-9 bg-gray-100">
      
      {/* Header */}
      

      {/* Content */}
      <div className="flex justify-center px-4 py-10">
        <div className="w-full max-w-4xl">

          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">
            Chatbot Integration Guide
          </h1>

          {/* Intro */}
          <p className="text-gray-600 text-sm mb-8">
            Add our chatbot to your website using a simple script.
            Just include your API key and you&#39;re ready to go.
          </p>

          {/* Step 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <h2 className="text-lg text-gray-600 font-medium mb-3">
              1. Get Your API Key
            </h2>

            <p className="text-sm text-gray-600">
              Generate your API key from the dashboard. You will use this key to authenticate requests.
            </p>

            <div className="mt-4 bg-gray-50 border text-gray-500 rounded-lg p-3 text-sm">
              Example:
              <code className="block mt-1 text-black">
                sk_live_xxxxxxxxxxxxxx
              </code>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <h2 className="text-lg text-gray-600 font-medium mb-3">
              2. Add Script to Your Website
            </h2>

            <p className="text-sm text-gray-600 mb-3">
              Paste the following code before the closing {"</body>"} tag:
            </p>

            <div className="bg-gray-900 text-green-400 text-sm rounded-lg p-4 overflow-auto">
{`<script>
  window.ChatBotConfig = {
    apiKey: "YOUR_API_KEY",
  };
</script>

<script src="https://vuno-backend.vercel.app/embed/chatbot.min.js"></script>`}
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <h2 className="text-lg text-gray-600 font-medium mb-3">
              3. That&#39;s It 🚀
            </h2>

            <p className="text-sm text-gray-600">
              Once added, the chatbot will automatically load on your website.
              No additional setup required.
            </p>
          </div>

          {/* Optional Config */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <h2 className="text-lg text-gray-600 font-medium mb-3">
              Optional Configuration
            </h2>

            <div className="bg-gray-900 text-green-400 text-sm rounded-lg p-4 overflow-auto">
{`window.ChatBotConfig = {
  apiKey: "YOUR_API_KEY",
  position: "right",
  themeColor: "#000000",
  welcomeMessage: "Hi! How can I help you?",
};`}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg text-gray-600 font-medium mb-3">
              Security Notes
            </h2>

            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>Do not expose private keys</li>
              <li>Use domain restrictions if available</li>
              <li>Rotate keys regularly</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}