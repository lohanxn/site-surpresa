function abrirSite(){
  document.getElementById("entrada").style.display="none";
  document.getElementById("conteudo").style.display="block";
  escreverMensagem();
  iniciarCoracoes();
}

const texto="Cada momento ao seu lado se torna especial 🤍";
let i=0;

function escreverMensagem(){
  if(i<texto.length){
    document.getElementById("mensagem").innerHTML+=texto.charAt(i);
    i++;
    setTimeout(escreverMensagem,45);
  }
}

/* Carta */
function abrirCarta(){
  document.getElementById("carta-modal").style.display="flex";
}
function fecharCarta(){
  document.getElementById("carta-modal").style.display="none";
}

/* Modal imagem */
const imagens=document.querySelectorAll(".galeria img");
const modal=document.getElementById("modal");
const imgModal=document.getElementById("imgModal");

imagens.forEach((img,idx)=>{
  img.addEventListener("click",()=>{
    modal.style.display="flex";
    imgModal.src=img.src;

    musica.src=img.dataset.musica;
    musica.volume=0;
    musica.play();

    let fade=setInterval(()=>{
      if(musica.volume<0.9){
        musica.volume+=0.05;
      }else{
        clearInterval(fade);
      }
    },100);

    capa.src=img.src;
    nomeMusica.textContent=`Música ${idx+1} 🤍`;
    playBtn.textContent="⏸";
  });
});

function fecharModal(){
  modal.style.display="none";
}

/* Player */
const musica=document.getElementById("musica");
const playBtn=document.getElementById("play");
const barra=document.getElementById("barra");
const tempoAtual=document.getElementById("tempo-atual");
const tempoTotal=document.getElementById("tempo-total");
const capa=document.querySelector(".capa");
const nomeMusica=document.getElementById("nome-musica");

playBtn.addEventListener("click",()=>{
  if(!musica.src)return;
  if(musica.paused){
    musica.play();
    playBtn.textContent="⏸";
  }else{
    musica.pause();
    playBtn.textContent="▶";
  }
});

musica.addEventListener("loadedmetadata",()=>{
  tempoTotal.textContent=formatarTempo(musica.duration);
  barra.max=musica.duration;
});

musica.addEventListener("timeupdate",()=>{
  barra.value=musica.currentTime;
  tempoAtual.textContent=formatarTempo(musica.currentTime);
});

barra.addEventListener("input",()=>{
  musica.currentTime=barra.value;
});

function formatarTempo(segundos){
  const min=Math.floor(segundos/60);
  const sec=Math.floor(segundos%60);
  return min+":"+(sec<10?"0"+sec:sec);
}

/* Corações */
function criarCoracao(){
  const c=document.createElement("div");
  c.className="coracao";
  c.textContent="🤍";
  c.style.left=Math.random()*100+"vw";
  c.style.fontSize=(Math.random()*10+14)+"px";
  c.style.animationDuration=(Math.random()*3+5)+"s";
  document.body.appendChild(c);
  setTimeout(()=>c.remove(),9000);
}

function iniciarCoracoes(){
  setInterval(criarCoracao,650);
}