export default function LineImageSlider({ images, id='lineSlider' }:{ images:string[]; id?:string; }){
  if (!images || images.length===0) return null;
  return (
    <div id={id} className="carousel slide mb-3" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {images.map((_,i)=>(
          <button key={i} type="button" data-bs-target={`#${id}`} data-bs-slide-to={i} className={i===0?'active':''} aria-label={`Slide ${i+1}`} aria-current={i===0?'true':undefined}></button>
        ))}
      </div>
      <div className="carousel-inner">
        {images.map((src,i)=>(
          <div key={i} className={`carousel-item ${i===0?'active':''}`}>
            <img src={src} className="d-block w-100" alt={`slide-${i}`} />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
