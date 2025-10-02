import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import LineImageSlider from '../components/LineImageSlider';
import { Linea } from '../data/types';

type QuizState = Record<string, string>; // questionId -> optionId

export default function LineDetail() {
  const IMG_MAP: Record<string,string[]> = {
    'ciberseguridad': [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop'
    ],
    'ia-ciencia-datos': [
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop'
    ],
    'redes': [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop'
    ],
    'arquitectura-software': [
      'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1600&auto=format&fit=crop'
    ],
    'bi-analitica': [
      'https://images.unsplash.com/photo-1551281044-8f87459d7f5b?q=80&w=1600&auto=format&fit=crop'
    ],
    'desarrollo-web': [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop'
    ]
  };

  const IMG_CONTENT_MAP: Record<string, Record<string, string[]>> = {
    'ciberseguridad': {
      'OWASP Top 10': ['https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1600&auto=format&fit=crop'],
      'Pentesting': ['https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop'],
      'Seguridad en Redes': ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop'],
      'IAM & Cloud Security': ['https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop'],
      'Respuesta a Incidentes': ['https://images.unsplash.com/photo-1518085250887-2f903c200fee?q=80&w=1600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop'],
      'Forense básica': ['https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1600&auto=format&fit=crop', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop']
    },
    'ia-ciencia-datos': {
      'Regresión/Clasificación': ['https://images.unsplash.com/photo-1551281044-8f87459d7f5b?q=80&w=1600&auto=format&fit=crop'],
      'Redes neuronales': ['https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop'],
      'MLOps': ['https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1600&auto=format&fit=crop']
    },
    'redes': {
      'VLSM': ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop'],
      'OSPF': ['https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1600&auto=format&fit=crop']
    },
    'arquitectura-software': {
      'DDD': ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1600&auto=format&fit=crop'],
      'Microservicios': ['https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop']
    },
    'bi-analitica': {
      'Star Schema': ['https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop']
    },
    'desarrollo-web': {
      'HTML5/CSS3/ESNext': ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop'],
      'React': ['https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop'],
      'Accesibilidad': ['https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1600&auto=format&fit=crop']
    }
  };
  const { slug } = useParams();
  const [l, setL] = useState<any | null>(null);
  const [tab, setTab] = useState<'contenidos'|'habilidades'|'recursos'|'modulos'|'quiz'>('contenidos');
  const [answers, setAnswers] = useState<QuizState>({});
  const [score, setScore] = useState<number|null>(null);

  useEffect(() => {
    (async () => {
      const res = await api.getPublic(`/lineas/${slug}`);
      setL(res.data);
    })();
  }, [slug]);

  function select(qid:string, oid:string){
    setAnswers(prev => ({...prev, [qid]: oid}));
  }
  function submitQuiz(){
    if (!l?.quiz) return;
    let s=0;
    l.quiz.forEach((q:any)=>{
      const chosen = answers[q.id];
      const opt = q.options.find((o:any)=>o.id===chosen);
      if (opt?.correct) s++;
    });
    setScore(s);
    localStorage.setItem(`quiz-${slug}`, JSON.stringify({answers, score:s}));
  }

  if (!l) return <div className="container py-4">Cargando...</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">{l.nombre}</h2>
        <div className="d-flex gap-2">
          <span className="badge bg-secondary">{l.area}</span>
          <span className="badge bg-info text-dark">{l.nivel}</span>
        </div>
      </div>
      <p className="lead">{l.descripcion}</p>

      <LineImageSlider images={IMG_MAP[slug as string] || []} id={`slider-${slug}`} />

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item"><button className={`nav-link ${tab==='contenidos'?'active':''}`} onClick={()=>setTab('contenidos')}>Contenidos</button></li>
        <li className="nav-item"><button className={`nav-link ${tab==='habilidades'?'active':''}`} onClick={()=>setTab('habilidades')}>Habilidades</button></li>
        <li className="nav-item"><button className={`nav-link ${tab==='recursos'?'active':''}`} onClick={()=>setTab('recursos')}>Recursos</button></li>
        <li className="nav-item"><button className={`nav-link ${tab==='modulos'?'active':''}`} onClick={()=>setTab('modulos')}>Módulos</button></li>
        <li className="nav-item"><button className={`nav-link ${tab==='quiz'?'active':''}`} onClick={()=>setTab('quiz')}>Quiz</button></li>
      </ul>

      {tab === 'contenidos' && (
        <div className="accordion" id="accContenidos">
          {l.contenidos.map((c: string, idx: number) => (
            <div className="accordion-item" key={idx}>
              <h2 className="accordion-header" id={`h${idx}`}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#c${idx}`} aria-expanded="false">
                  {c}
                </button>
              </h2>
              <div id={`c${idx}`} className="accordion-collapse collapse" data-bs-parent="#accContenidos">
                <div className="accordion-body">
                  {(() => { const d = l.contentDetails?.find((x:any)=>x.title===c); return <><p>{d? d.desc : <>Descripción del tema <strong>{c}</strong> con ejemplos prácticos, laboratorios y evaluación recomendada.</>}</p><LineImageSlider images={(IMG_CONTENT_MAP[slug as string]&&IMG_CONTENT_MAP[slug as string][c])||[]} id={`mini-${slug}-${idx}`} /></>; })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'habilidades' && (
        <ul className="list-group">
          {l.habilidades.map((h: string, idx: number) => <li className="list-group-item" key={idx}>{h}</li>)}
        </ul>
      )}

      {tab === 'recursos' && (
        <div className="list-group">
          {l.recursos.map((r: any, idx: number) => (
            <a key={idx} href={r.url} target="_blank" rel="noreferrer" className="list-group-item list-group-item-action">{r.titulo}</a>
          ))}
        </div>
      )}

      {tab === 'modulos' && (
        <div className="row g-3">
          {l.modules?.map((m:any, i:number)=>(
            <div className="col-md-6" key={i}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{m.titulo}</h5>
                  <p><strong>Objetivos:</strong></p>
                  <ul>{m.objetivos.map((o:string,idx:number)=><li key={idx}>{o}</li>)}</ul>
                  <p><strong>Lección:</strong> {m.leccion}</p>
                  {m.ejemplosCodigo?.length>0 && <>
                    <p className="mb-1"><strong>Ejemplos de código:</strong></p>
                    {m.ejemplosCodigo.map((e:any,idx:number)=>(
                      <pre className="bg-light p-2 border rounded" key={idx}><code>{e.codigo}</code></pre>
                    ))}
                  </>}
                  <p className="mb-1"><strong>Prácticas sugeridas:</strong></p>
                  <ul>{m.practicas.map((p:string,idx:number)=><li key={idx}>{p}</li>)}</ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'quiz' && (
        <div className="card p-3 shadow-sm">
          {!l.quiz || l.quiz.length===0 ? <p className="text-muted">No hay preguntas aún.</p> : (
            <form onSubmit={(e)=>{e.preventDefault(); submitQuiz();}}>
              {l.quiz.map((q:any, qi:number)=>(
                <div className="mb-3" key={qi}>
                  <p className="mb-1"><strong>{qi+1}. {q.prompt}</strong></p>
                  {q.options.map((o:any)=> (
                    <div className="form-check" key={o.id}>
                      <input className="form-check-input" type="radio" name={q.id} id={`${q.id}-${o.id}`} checked={answers[q.id]===o.id} onChange={()=>select(q.id,o.id)} />
                      <label className="form-check-label" htmlFor={`${q.id}-${o.id}`}>{o.text}</label>
                    </div>
                  ))}
                  {answers[q.id] && (
                    <div className="small text-muted mt-1">
                      Explicación: {q.explanation}
                    </div>
                  )}
                </div>
              ))}
              <button className="btn btn-primary">Calificar</button>
              {score!==null && <div className="alert alert-info mt-3">Puntaje: {score} / {l.quiz.length}</div>}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
