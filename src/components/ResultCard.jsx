import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";

export default function ResultCard() {
  const cardRef = useRef(null);
  const scoreRef = useRef(null);

  useEffect(() => {
    // 卡片淡入上浮
    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      easing: "easeOutBack",
    });

    // 情感分数从 0 滚动到 0.86
    const scoreObj = { value: 0 };
    anime({
      targets: scoreObj,
      value: 0.86,
      duration: 1500,
      easing: "easeOutQuad",
      delay: 200,
      update: () => {
        if (scoreRef.current) {
          scoreRef.current.textContent = scoreObj.value.toFixed(2);
        }
      },
    });
  }, []);

  return (
    <article ref={cardRef} className="panel panel-half lab-panel result-panel card">
      <div className="panel-heading">
        <p className="section-kicker">结果区</p>
        <h3>分析结果</h3>
      </div>
      <div className="result-stack">
        <div className="result-item">
          <span>原文</span>
          <p>今天的风很轻，适合把脑海里的想法慢慢写下来。</p>
        </div>
        <div className="result-item">
          <span>拼音</span>
          <p>jīn tiān de fēng hěn qīng …</p>
        </div>
        <div className="result-grid">
          <div className="result-badge">
            <span>情感分数</span>
            <strong data-score ref={scoreRef}>0.00</strong>
          </div>
          <div className="result-badge">
            <span>情感判断</span>
            <strong>偏积极</strong>
          </div>
        </div>
      </div>
    </article>
  );
}
