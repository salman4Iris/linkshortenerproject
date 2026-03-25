import { auth } from "@clerk/nextjs/server";
import { AuthSignUpButton } from "@/components/ui/auth-buttons";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
            Shorten Links,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Amplify Impact
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
            Create short, memorable links that drive engagement. Track performance with real-time analytics.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {userId ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <AuthSignUpButton />
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 px-4 py-20 dark:bg-gray-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl font-bold text-black dark:text-white">
            Powerful Features
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600 dark:text-gray-400">
            Everything you need to manage, track, and optimize your links
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1: Fast Shortening */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Lightning Fast
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Shorten your links instantly. Create custom short URLs in seconds.
              </p>
            </div>

            {/* Feature 2: Analytics */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Real-time Analytics
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Track clicks, geographic data, and referrers with detailed insights.
              </p>
            </div>

            {/* Feature 3: QR Codes */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                QR Code Support
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Auto-generate QR codes for each shortened link for easy scanning.
              </p>
            </div>

            {/* Feature 4: Custom URLs */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Custom Aliases
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Create branded, memorable short links that reflect your brand.
              </p>
            </div>

            {/* Feature 5: Organization */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900">
                <span className="text-2xl">📁</span>
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Organize Links
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Tag and organize your links for better management and tracking.
              </p>
            </div>

            {/* Feature 6: Easy Sharing */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Easy Sharing
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Copy to clipboard, share via email or social media instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-black dark:text-white">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Join thousands of users shortening links and tracking performance.
          </p>
          <div className="mt-8">
            {userId ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <AuthSignUpButton />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-12 dark:border-gray-800 dark:bg-gray-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 LinkHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
