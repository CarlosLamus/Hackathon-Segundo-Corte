export default function Curriculum(){
  return (
    <div className="container py-4">
      <h2 className="mb-3">Ruta de aprendizaje sugerida</h2>
      <ol className="list-group list-group-numbered">
        <li className="list-group-item">Fundamentos Web (HTML5, CSS3, ES8)</li>
        <li className="list-group-item">Git/GitHub (flujo básico, PRs, ramas)</li>
        <li className="list-group-item">Backend con Node + Express (REST, validación, seguridad básica)</li>
        <li className="list-group-item">Frontend con React + TS (estado, router, fetch)</li>
        <li className="list-group-item">Profundización elegida (Ciberseguridad / IA / Redes / BI ...)</li>
        <li className="list-group-item">Proyecto integrador (deploy y documentación)</li>
      </ol>
      <p className="mt-3 text-muted">Cada paso incluye prácticas y evaluación. Ajusta el orden según tu objetivo.</p>
    </div>
  );
}
