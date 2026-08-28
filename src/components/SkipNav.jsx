import React from "react";

/**
 * SkipNav — 키보드·스크린리더 사용자를 위한 건너뛰기 링크
 * 평소에는 화면 밖에 숨어 있다가, Tab 키로 포커스가 오면 상단에 나타납니다.
 */
const SkipNav = ({ t }) => {
  const a11y = t?.a11y || {};

  return (
    <div role="navigation" aria-label="건너뛰기 링크">
      <a href="#main-content" className="skip-nav-link">
        {a11y.skipToMain || "본문 바로가기"}
      </a>
      <a href="#main-nav" className="skip-nav-link" style={{ left: "12rem" }}>
        {a11y.skipToNav || "메인 메뉴 바로가기"}
      </a>
    </div>
  );
};

export default SkipNav;
