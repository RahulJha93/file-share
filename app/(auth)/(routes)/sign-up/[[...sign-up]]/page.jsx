import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <SignUp />
      </div>
    </section>
  );
}