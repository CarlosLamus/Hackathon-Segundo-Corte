export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container d-flex justify-content-between">
        <span>© {new Date().getFullYear()} Portal Ingeniería</span>
        <span>HTML5 · CSS3 · ES8 · React+TS · Node+Express</span>
      </div>
    </footer>
  );
}
