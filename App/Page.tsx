// app/page.tsx
import { NextResponse } from 'next/server'

export default function Home() {
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const url = e.target.url.value
    if (!url) return alert('URL daal bhai!')

    const res = await fetch(`https://advanceytdownloader.ytansh038.workers.dev/?url=${encodeURIComponent(url)}`)
    const data = await res.json()

    // Show results
    const resultDiv = document.getElementById('result')!
    resultDiv.innerHTML = `
      <h2>${data.title}</h2>
      <img src="${data.thumbnail}" style="width:100%; max-width:400px; border-radius:12px; margin:10px 0"/>
      <p><b>Duration:</b> ${data.duration}</p>
      <div style="display:grid; gap:10px; margin-top:15px;">
        ${data.medias.map((m: any) => `
          <button onclick="window.open('${m.url}')" 
            style="padding:12px; background:#28a745; color:white; border:none; border-radius:8px; font-weight:bold;">
            Download ${m.quality} (${m.extension})
          </button>
        `).join('')}
      </div>
      <p style="margin-top:20px; font-size:0.9rem; color:#aaa;">
        Made by <b>Unit Bahi</b> | 
        <a href="https://whatsapp.com/channel/0029VafzmV3KLaHtGZL2C81A" target="_blank" style="color:#25D366; font-weight:bold;">
          ⚠️ Join Channel (Lazmi!)
        </a>
      </p>
    `
  }

  return (
    <div style={{padding:'1.5rem', fontFamily:'Arial', background:'#111', color:'#fff', minHeight:'100vh'}}>
      <h1 style={{textAlign:'center', fontSize:'2rem', color:'#ff0000'}}>
        YT Downloader by Unit Bahi
      </h1>

      <form onSubmit={handleSubmit} style={{maxWidth:'600px', margin:'2rem auto'}}>
        <input 
          name="url" 
          type="text" 
          placeholder="YouTube URL paste kar..." 
          style={{width:'100%', padding:'15px', fontSize:'1rem', borderRadius:'12px', border:'none', marginBottom:'12px'}}
          required 
        />
        <button 
          type="submit"
          style={{width:'100%', padding:'15px', background:'#ff0000', color:'#fff', border:'none', borderRadius:'12px', fontWeight:'bold', fontSize:'1.1rem'}}
        >
          Get Download Links
        </button>
      </form>

      <div id="result" style={{textAlign:'center', marginTop:'2rem'}}></div>

      <p style={{textAlign:'center', marginTop:'2rem', color:'#666', fontSize:'0.9rem'}}>
        <a href="https://whatsapp.com/channel/0029VafzmV3KLaHtGZL2C81A" target="_blank" style="color:#25D366; font-weight:bold;">
          Join Channel First (Must!)
        </a>
      </p>
    </div>
  )
}

// API Route (same file mein!)
export async function GET(req: any) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({error: 'URL chahiye'})

  const res = await fetch(`https://advanceytdownloader.ytansh038.workers.dev/?url=${url}`)
  const data = await res.json()
  return NextResponse.json(data)
}
