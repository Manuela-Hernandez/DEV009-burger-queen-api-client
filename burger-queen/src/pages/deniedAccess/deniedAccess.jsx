import { useNavigate } from "react-router-dom";

export default function Root() {

  const navigateTo = useNavigate();
  function goToBack() {
    navigateTo(`/${localStorage.role}`);
  }

  return (
    <>
      <section className="grid row-4 justify-items-center items-center w-full h-full">
        <i className="fa-solid fa-lock text-8xl self-end mb-6"></i>
        <div className="grid row-3 justify-items-center self-start">
          <h1 className="text-3xl mb-3">Access to this page is restricted</h1>
          <p className="text-lg">Please check with the site admin if you believe this is a mistake.</p>
          <button className="rounded-lg text-xl border border-1 border-black mt-2 p-2 w-40" 
          onClick={goToBack}>
          Go back
        </button>
        </div>
      </section>
    </>
  );
}