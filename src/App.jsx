import React, { useEffect, useState } from 'react'

const AZKAR = [
  "سبحان الله",
  "الحمد لله",
  "الله أكبر",
  "لا إله إلا الله",
  "استغفر الله",
  "سبحان الله وبحمده",
  "سبحان الله العظيم",
  "لا حول ولا قوة إلا بالله",
  "اللهم صل وسلم على نبينا محمد",
  "لا إله إلا أنت سبحانك إني كنت من الظالمين",
  "أستغفر الله العظيم وأتوب إليه",
  "اللهم اغفر لي",
  "اللهم ارزقني الجنة",
  "اللهم اجرني من النار",
  "سبحان الله عدد خلقه",
  "سبحان الله رضا نفسه",
  "سبحان الله زنة عرشه",
  "سبحان الله مداد كلماته",
  "اللهم صل على محمد وعلى آل محمد كما صليت على ابراهيم وعلى آل ابراهيم انك حميد مجيد اللهم بارك على محمد وعلى آل محمد كما باركت على ابراهيم وعلى آل ابراهيم انك حميد مجيد"
]

const STORAGE_KEY = 'noor-tasbeeh-v1'

export default function App(){
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [clicked, setClicked] = useState(false)
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw){
        const parsed = JSON.parse(raw)
        if(typeof parsed.index === 'number') setIndex(parsed.index)
        if(typeof parsed.count === 'number') setCount(parsed.count)
      }
    }catch(e){ }
  }, [])

  useEffect(() => {
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ index, count }))
    }catch(e){}
  }, [index, count])

  const increment = (e) => {
    if(e && e.currentTarget){
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now() + Math.random()
      setRipples(r => [...r, { id, x, y }])
      setTimeout(() => setRipples(r => r.filter(p => p.id !== id)), 700)
    }
    setCount(c => c + 1)
    setClicked(true)
    setTimeout(() => setClicked(false), 220)
  }

  const reset = () => setCount(0)
  const next = () => { setIndex(i => (i + 1) % AZKAR.length); setCount(0) }

  return (
    <div className="app-root violet">
      <div className="card" role="application" aria-label="Noor Tasbeeh">
        <div className="header-decor">
          <h1 className="title">نور التسبيح</h1>
        </div>

        <div className="zekr" aria-live="polite">{AZKAR[index]}</div>

        <div className="count" aria-hidden>{count}</div>

        <button
          className={`main-button ${clicked ? 'pulse' : ''}`}
          onClick={increment}
          aria-label="تسبيح"
          style={{ '--progress': `${Math.round(((count % 33) / 33) * 100)}%` }}
        >
          <span className="btn-text">تسبيح</span>
          {ripples.map(r => (
            <span key={r.id} className="ripple" style={{ left: r.x + 'px', top: r.y + 'px' }} />
          ))}
        </button>

        <div className="controls">
          <button className="ghost" onClick={reset}>إعادة</button>
          <button className="ghost" onClick={next}>التالي</button>
        </div>

        <div className="footer">حفظ تلقائي • تخزين محلي</div>
      </div>
    </div>
  )
}
