import React, { useEffect, useRef } from 'react'


function App() {
  const container = useRef<HTMLDivElement>(null);

  const touchStartEvent = (e: any) => {
    if (e.touches[0].pageX > 16 && e.touches[0].pageX < window.innerWidth - 16) return;
    e.preventDefault();
  }

  useEffect(() => {
    if (container.current) {
      container.current.addEventListener('touchstart', (e) => touchStartEvent(e));
    }

    return () => {
      if (container.current) {
        container.current.removeEventListener('touchstart', touchStartEvent);
      }
    }
  }, [container.current]);

  return (
    <div>
      <h1 style={{
        fontSize: "20px",
        textAlign: "center"
      }}>スワイプキャンセルテスト</h1>
      <div ref={container} style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "cadetblue",
        color: "#fff",
        padding: "100px 0",
        fontWeight: "bold",
        position: "relative"
      }}>スワイプ不可ブロック</div>
    </div>
  )
}

export default App