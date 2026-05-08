import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center" style={{ background: "#f6f6f6", minHeight: "100vh" }}>
      <LoginForm />
    </div>
  );
}
