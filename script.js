// 모달 제어
function startJoinProcess() {
    document.getElementById('auth-modal').style.display = 'flex';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
}

// 텔레그램 인증 성공 콜백
function onTelegramAuth(user) {
    console.log('Telegram Auth Success:', user);
    
    // 1단계 정보를 숨겨진 필드에 저장
    document.getElementById('tg-id').value = user.id;
    document.getElementById('tg-name').value = user.username || user.first_name;
    
    // 모달 전환
    document.getElementById('auth-modal').style.display = 'none';
    document.getElementById('form-modal').style.display = 'flex';
}

// 구글 폼/시트로 데이터 전송 (Google Apps Script 연동)
document.getElementById('node-apply-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button');
    submitBtn.innerText = "전송 중...";
    submitBtn.disabled = true;

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // [중요] 생성하신 Google Apps Script의 Web App URL을 여기에 넣으세요
    const GAS_URL = "https://script.google.com/macros/s/AKfycbzb7akFnMvDufE_38tD06u-mwexPYqiSbfwMMR75qa_RuYrBZD6PctpCGwGmbaOqkQqFw/exec";

    try {
        await fetch(GAS_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        alert("🎉 신청이 완료되었습니다! 마지막 단계인 지갑 연동을 진행합니다.");
        closeAllModals();
        triggerWalletConnection(); // 실제 지갑 연동 함수 호출
        
    } catch (error) {
        console.error('Error!', error.message);
        alert("전송 중 오류가 발생했습니다. 다시 시도해 주세요.");
        submitBtn.innerText = "신청 완료";
        submitBtn.disabled = false;
    }
});

function triggerWalletConnection() {
    alert("🔗 TON 지갑 연동 팝업을 호출합니다...");
    // 실제 TonConnect 로직 추가 가능
}