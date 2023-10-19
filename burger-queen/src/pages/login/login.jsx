import LoginForm from "../../components/loginForm/loginForm";

export default function Login() {
    return (
      <>
        <section className="bg-bgqueen-primary grid gap-2 lg:grid-cols-2 md:grid-cols-1 h-full content-center">
          <img src="https://i.postimg.cc/nr3kxbKN/BQ-logo.png" alt="Logo de Burger Queen" className="lg:justify-self-end md:justify-self-center"/>
          <div className="self-center w-full">
            <LoginForm />
          </div>
        </section>
      </>
    );
  }