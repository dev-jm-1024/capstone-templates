// Vue.js 및 GSAP 관련 코드를 여기에 작성하세요.

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  const loginForm = document.getElementById('loginForm');
  const idInput = document.getElementById('authUserId');
  const pwInput = document.getElementById('authPassword');
  const submitButton = loginForm ? loginForm.querySelector('button[type="submit"]') : null;
  const titles = appElement ? appElement.querySelectorAll('h2') : [];

  if (appElement) {
    // 페이지 로드 시 로그인 폼 및 내부 요소 등장 애니메이션
    gsap.set(appElement, { autoAlpha: 1 }); // 초기에는 보이도록 설정 (FOUC 방지)
    gsap.fromTo(appElement, 
      { y: 50, autoAlpha: 0 }, 
      { duration: 0.8, y: 0, autoAlpha: 1, ease: 'power2.out', delay: 0.1 }
    );

    if (titles.length > 0) {
      gsap.from(titles, {
        duration: 0.7,
        y: -30,
        autoAlpha: 0,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.3 // 폼 등장 후 약간 뒤에 시작
      });
    }

    const formElements = loginForm ? loginForm.querySelectorAll('div > label, div > input, div > button') : [];
    if (formElements.length > 0) {
        gsap.from(formElements, {
            duration: 0.5,
            autoAlpha: 0,
            x: -20,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.6 // 타이틀 애니메이션 후 시작
        });
    }
  }

  // 입력 필드 포커스 애니메이션 (기존 코드 유지 및 개선)
  [idInput, pwInput].forEach(input => {
    if (!input) return;
    input.addEventListener('focus', () => {
      gsap.to(input, { scale: 1.02, duration: 0.2, borderColor: '#6366f1' }); // Tailwind indigo-500
    });
    input.addEventListener('blur', () => {
      gsap.to(input, { scale: 1, duration: 0.2, borderColor: '#d1d5db' }); // Tailwind gray-300
    });
  });

  // 버튼 호버 애니메이션
  if (submitButton) {
    submitButton.addEventListener('mouseenter', () => {
      gsap.to(submitButton, { scale: 1.05, duration: 0.2, ease: 'power1.out' });
    });
    submitButton.addEventListener('mouseleave', () => {
      gsap.to(submitButton, { scale: 1, duration: 0.2, ease: 'power1.out' });
    });
  }
  
  // Vue 인스턴스 (로그인 시도 시 버튼 상태 변경 등)
  if (appElement) {
    new Vue({
      el: '#app',
      data: {
        authUserId: '',
        authPassword: '',
        isLoading: false,
        originalButtonText: '로그인'
      },
      mounted() {
        this.originalButtonText = submitButton ? submitButton.textContent : '로그인';
        console.log('Vue.js가 마운트되었습니다.');
        // loginForm submit 이벤트는 html 내 스크립트가 처리하므로, 여기서는 해당 이벤트 리스너를 참조
        if(loginForm) {
            loginForm.addEventListener('submit', () => {
                this.isLoading = true;
                if(submitButton) submitButton.textContent = '로그인 중...';
                // 실제 fetch 이후 성공/실패에 따라 isLoading 및 버튼 텍스트 복원 로직은
                // login.html의 fetch 콜백 내에서 처리하거나, 이벤트를 통해 Vue에 알려줘야 합니다.
                // 여기서는 간단히 로그인 시도 시 상태 변경만 보여줍니다.
            });
        }

        // 예시: 로그인 성공/실패 이벤트 수신 (CustomEvent 사용)
        document.addEventListener('loginAttemptFinished', (event) => {
            this.isLoading = false;
            if(submitButton) submitButton.textContent = this.originalButtonText;
            if (!event.detail.success) {
                // login.html에서 이미 gsap 흔들림 처리함
            }
        });

      },
      watch: {
        isLoading(newValue) {
          if (submitButton) {
            submitButton.disabled = newValue;
            if (newValue) {
              // 로딩 스피너 추가 등의 UI 변경 가능
            } else {
              // 로딩 스피너 제거 등의 UI 변경 가능
            }
          }
        }
      }
    });
  }

  console.log('login-skin.js 로드 완료 및 GSAP 애니메이션 적용');
});
